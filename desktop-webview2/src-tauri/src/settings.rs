use std::fs;
use std::path::PathBuf;
use std::sync::LazyLock;

use serde::{Deserialize, Serialize};
use tauri::{AppHandle, Manager, PhysicalSize, WebviewWindow};

pub const MIN_WIDTH: f64 = 1280.0;
pub const MIN_HEIGHT: f64 = 720.0;

pub const WINDOW_SIZES: [&str; 5] = ["1280x720", "1366x768", "1600x900", "1920x1080", "maximized"];

#[derive(Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase", default)]
pub struct Settings {
    pub window_size: String,
    pub default_page: String,
}

pub static DEFAULT_SETTINGS: LazyLock<Settings> = LazyLock::new(|| Settings {
    window_size: "1280x720".into(),
    default_page: "home".into(),
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
        assert_eq!(json, r#"{"windowSize":"1280x720","defaultPage":"home"}"#);
        assert_eq!(pair(&parse(&json)), ("1280x720", "home"));
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
