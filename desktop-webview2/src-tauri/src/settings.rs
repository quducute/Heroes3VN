use std::fs;
use std::path::PathBuf;
use std::sync::LazyLock;

use serde::{Deserialize, Serialize};
use tauri::{AppHandle, Manager, PhysicalSize, WebviewWindow};

pub const MIN_WIDTH: f64 = 1280.0;
pub const MIN_HEIGHT: f64 = 720.0;

pub const WINDOW_SIZES: [&str; 5] = ["1280x720", "1366x768", "1600x900", "1920x1080", "maximized"];

pub const FONT_SIZES: [&str; 3] = ["small", "medium", "large"];

pub const MAX_PINS: usize = 200;
const MAX_PIN_LENGTH: usize = 300;

#[derive(Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase", default)]
pub struct Settings {
    pub window_size: String,
    pub default_page: String,
    pub font_size: String,
    pub pins: Vec<String>,
}

pub static DEFAULT_SETTINGS: LazyLock<Settings> = LazyLock::new(|| Settings {
    window_size: "1280x720".into(),
    default_page: "home".into(),
    font_size: "medium".into(),
    pins: Vec::new(),
});

impl Default for Settings {
    fn default() -> Self {
        DEFAULT_SETTINGS.clone()
    }
}

#[derive(Serialize)]
pub struct WorkArea {
    pub width: f64,
    pub height: f64,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct SettingsResponse {
    pub settings: Settings,
    pub work_area: WorkArea,
}

pub fn is_page_id(s: &str) -> bool {
    !s.is_empty() && s.bytes().all(|b| b.is_ascii_lowercase())
}

fn is_pin(s: &str) -> bool {
    !s.is_empty() && s.chars().count() <= MAX_PIN_LENGTH
}

pub fn is_pin_list(pins: &[String]) -> bool {
    let mut seen = std::collections::HashSet::new();
    pins.len() <= MAX_PINS && pins.iter().all(|p| is_pin(p) && seen.insert(p))
}

fn clean_pins(value: Option<&serde_json::Value>) -> Vec<String> {
    let Some(list) = value.and_then(serde_json::Value::as_array) else {
        return Vec::new();
    };
    let mut seen = std::collections::HashSet::new();
    let pins: Vec<String> = list
        .iter()
        .filter_map(serde_json::Value::as_str)
        .filter(|p| is_pin(p) && seen.insert(*p))
        .map(String::from)
        .collect();
    let skip = pins.len().saturating_sub(MAX_PINS);
    pins.into_iter().skip(skip).collect()
}

fn settings_path(app: &AppHandle) -> Option<PathBuf> {
    app.path()
        .app_local_data_dir()
        .ok()
        .map(|d| d.join("settings.json"))
}

pub fn parse(json: &str) -> Settings {
    let data: serde_json::Value = serde_json::from_str(json).unwrap_or_default();
    let field = |key: &str| data.get(key).and_then(serde_json::Value::as_str);
    let mut settings = Settings::default();
    if let Some(size) = field("windowSize").filter(|s| WINDOW_SIZES.contains(s)) {
        settings.window_size = size.into();
    }
    if let Some(page) = field("defaultPage").filter(|s| is_page_id(s)) {
        settings.default_page = page.into();
    }
    if let Some(size) = field("fontSize").filter(|s| FONT_SIZES.contains(s)) {
        settings.font_size = size.into();
    }
    settings.pins = clean_pins(data.get("pins"));
    settings
}

pub fn load(app: &AppHandle) -> Settings {
    settings_path(app)
        .and_then(|p| fs::read_to_string(p).ok())
        .map(|s| parse(&s))
        .unwrap_or_default()
}

pub fn save(app: &AppHandle, settings: &Settings) -> Result<(), String> {
    let path = settings_path(app).ok_or("Không tìm thấy thư mục dữ liệu")?;
    if let Some(dir) = path.parent() {
        fs::create_dir_all(dir).map_err(|e| e.to_string())?;
    }
    let json = serde_json::to_string_pretty(settings).map_err(|e| e.to_string())?;
    fs::write(path, json).map_err(|e| e.to_string())
}

pub fn work_area(app: &AppHandle) -> WorkArea {
    app.primary_monitor()
        .ok()
        .flatten()
        .map(|m| {
            let size = m.work_area().size.to_logical::<f64>(m.scale_factor());
            WorkArea {
                width: size.width,
                height: size.height,
            }
        })
        .unwrap_or(WorkArea {
            width: MIN_WIDTH,
            height: MIN_HEIGHT,
        })
}

pub fn window_size(app: &AppHandle, window_size: &str) -> (f64, f64) {
    fit_window_size(window_size, &work_area(app))
}

pub fn fit_window_size(window_size: &str, area: &WorkArea) -> (f64, f64) {
    let (width, height) = window_size
        .split_once('x')
        .and_then(|(w, h)| Some((w.parse().ok()?, h.parse().ok()?)))
        .unwrap_or((MIN_WIDTH, MIN_HEIGHT));
    (
        MIN_WIDTH.max(area.width.min(width)),
        MIN_HEIGHT.max(area.height.min(height)),
    )
}

pub fn apply_window_size(win: &WebviewWindow, window_size: &str) {
    if window_size == "maximized" {
        let _ = win.maximize();
        return;
    }
    if win.is_maximized().unwrap_or(false) {
        let _ = win.unmaximize();
    }
    let (width, height) = self::window_size(win.app_handle(), window_size);
    set_outer_size(win, width, height);
    let _ = win.center();
}

fn outer_to_inner(win: &WebviewWindow, width: f64, height: f64) -> Option<PhysicalSize<u32>> {
    let outer = win.outer_size().ok()?;
    let inner = win.inner_size().ok()?;
    let scale = win.scale_factor().ok()?;
    let frame_w = f64::from(outer.width.saturating_sub(inner.width));
    let frame_h = f64::from(outer.height.saturating_sub(inner.height));
    Some(PhysicalSize::new(
        (width * scale - frame_w).round() as u32,
        (height * scale - frame_h).round() as u32,
    ))
}

pub fn set_outer_size(win: &WebviewWindow, width: f64, height: f64) {
    if let Some(min) = outer_to_inner(win, MIN_WIDTH, MIN_HEIGHT) {
        let _ = win.set_min_size(Some(min));
    }
    if let Some(size) = outer_to_inner(win, width, height) {
        let _ = win.set_size(size);
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    const FULL_HD: WorkArea = WorkArea {
        width: 1920.0,
        height: 1040.0,
    };

    fn pair(s: &Settings) -> (&str, &str) {
        (s.window_size.as_str(), s.default_page.as_str())
    }

    #[test]
    fn page_id_only_lowercase_letters() {
        for id in ["home", "hota", "boardgame"] {
            assert!(is_page_id(id), "{id}");
        }
        for id in ["", "HotA", "hota1", "ho-ta", "../x", "trang chủ"] {
            assert!(!is_page_id(id), "{id}");
        }
    }

    #[test]
    fn parse_keeps_valid_values() {
        for size in WINDOW_SIZES {
            let json = format!(r#"{{"windowSize":"{size}","defaultPage":"faq"}}"#);
            assert_eq!(pair(&parse(&json)), (size, "faq"));
        }
    }

    #[test]
    fn parse_replaces_only_invalid_fields() {
        let s = parse(r#"{"windowSize":"800x600","defaultPage":"era"}"#);
        assert_eq!(pair(&s), ("1280x720", "era"));
        let s = parse(r#"{"windowSize":"1600x900","defaultPage":1}"#);
        assert_eq!(pair(&s), ("1600x900", "home"));
        let s = parse(r#"{"windowSize":1920,"defaultPage":"vcmi","evil":true}"#);
        assert_eq!(pair(&s), ("1280x720", "vcmi"));
    }

    #[test]
    fn parse_broken_json_falls_back_to_default() {
        for json in ["", "{", "null", "5", r#""home""#, "[1,2]", "{}"] {
            assert_eq!(pair(&parse(json)), ("1280x720", "home"), "{json}");
        }
    }

    #[test]
    fn default_settings_round_trip() {
        let json = serde_json::to_string(&*DEFAULT_SETTINGS).unwrap();
        assert_eq!(
            json,
            r#"{"windowSize":"1280x720","defaultPage":"home","fontSize":"medium","pins":[]}"#
        );
        let s = parse(&json);
        assert_eq!(pair(&s), ("1280x720", "home"));
        assert_eq!(s.font_size, "medium");
        assert!(s.pins.is_empty());
    }

    #[test]
    fn parse_font_size() {
        for size in FONT_SIZES {
            let json = format!(r#"{{"fontSize":"{size}"}}"#);
            assert_eq!(parse(&json).font_size, size);
        }
        for json in [r#"{"fontSize":"huge"}"#, r#"{"fontSize":1}"#, "{}"] {
            assert_eq!(parse(json).font_size, "medium", "{json}");
        }
    }

    #[test]
    fn parse_cleans_pins() {
        let s = parse(r#"{"pins":["cheat:A","cheat:A",1,"",null,"key:B|C"]}"#);
        assert_eq!(s.pins, ["cheat:A", "key:B|C"]);
        let many: Vec<String> = (0..MAX_PINS + 5).map(|i| format!("p{i}")).collect();
        let json = serde_json::json!({ "pins": many }).to_string();
        let kept = parse(&json).pins;
        assert_eq!(kept.len(), MAX_PINS);
        assert_eq!(kept.last().unwrap(), &format!("p{}", MAX_PINS + 4));
        for json in [
            r#"{"pins":"cheat:A"}"#,
            r#"{"pins":5}"#,
            r#"{"pins":{"a":1}}"#,
        ] {
            assert!(parse(json).pins.is_empty(), "{json}");
        }
    }

    #[test]
    fn pin_list_rules() {
        let list = |v: &[&str]| v.iter().map(|s| (*s).to_string()).collect::<Vec<_>>();
        assert!(is_pin_list(&[]));
        assert!(is_pin_list(&list(&["cheat:A", "key:B|C"])));
        assert!(!is_pin_list(&list(&["a", "a"])));
        assert!(!is_pin_list(&list(&[""])));
        assert!(!is_pin_list(&["x".repeat(301)]));
        let many: Vec<String> = (0..=MAX_PINS).map(|i| format!("p{i}")).collect();
        assert!(!is_pin_list(&many));
    }

    #[test]
    fn window_size_fits_work_area() {
        assert_eq!(fit_window_size("1600x900", &FULL_HD), (1600.0, 900.0));
        assert_eq!(fit_window_size("1920x1080", &FULL_HD), (1920.0, 1040.0));
        let small = WorkArea {
            width: 1024.0,
            height: 600.0,
        };
        assert_eq!(fit_window_size("1366x768", &small), (MIN_WIDTH, MIN_HEIGHT));
        for size in ["maximized", "abc", "", "1600x"] {
            assert_eq!(
                fit_window_size(size, &FULL_HD),
                (MIN_WIDTH, MIN_HEIGHT),
                "{size}"
            );
        }
    }
}
