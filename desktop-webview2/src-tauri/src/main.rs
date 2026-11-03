#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod settings;
mod webview2;

use std::sync::LazyLock;
use std::time::Duration;

use tauri::webview::NewWindowResponse;
use tauri::window::Color;
use tauri::{AppHandle, Manager, Url, WebviewUrl, WebviewWindow, WebviewWindowBuilder};
use tauri_plugin_opener::OpenerExt;

use settings::{DEFAULT_SETTINGS, Settings, SettingsResponse};

const TITLE: &str = "Heroes 3 VN by Gogetto";
const BRIDGE: &str = include_str!("bridge.js");

const FETCH_ALLOWED_HOSTS: [&str; 5] = [
    "api.gog.com",
    "download.h3hota.com",
    "drive.google.com",
    "drive.usercontent.google.com",
    "rss.moddb.com",
];

const MAX_REDIRECTS: usize = 5;

static HTTP: LazyLock<reqwest::Client> = LazyLock::new(|| {
    reqwest::Client::builder()
        .timeout(Duration::from_secs(10))
        .redirect(reqwest::redirect::Policy::custom(|attempt| {
            if attempt.previous().len() > MAX_REDIRECTS {
                attempt.error("Chuyển hướng quá nhiều lần")
            } else if is_fetch_allowed(attempt.url()) {
                attempt.follow()
            } else {
                let host = attempt.url().host_str().unwrap_or_default().to_owned();
                attempt.error(format!("Host không được phép: {host}"))
            }
        }))
        .build()
        .expect("reqwest client")
});

fn is_fetch_allowed(url: &Url) -> bool {
    url.scheme() == "https"
        && url
            .host_str()
            .is_some_and(|host| FETCH_ALLOWED_HOSTS.contains(&host))
}

#[tauri::command]
async fn fetch_text(url: String) -> Result<String, String> {
    let u = Url::parse(&url).map_err(|e| e.to_string())?;
    if !is_fetch_allowed(&u) {
        let host = u.host_str().unwrap_or_default();
        return Err(format!("Host không được phép: {host}"));
    }
    let res = HTTP.get(u).send().await.map_err(|e| e.to_string())?;
    if !res.status().is_success() {
        return Err(format!("HTTP {}", res.status().as_u16()));
    }
    res.text().await.map_err(|e| e.to_string())
}

#[tauri::command]
fn get_settings(app: AppHandle) -> SettingsResponse {
    SettingsResponse {
        settings: settings::load(&app),
        work_area: settings::work_area(&app),
    }
}

#[tauri::command]
fn set_window_size(window: WebviewWindow, size: String) -> Result<Settings, String> {
    if !settings::WINDOW_SIZES.contains(&size.as_str()) {
        return Err(format!("Kích thước không hợp lệ: {size}"));
    }
    let app = window.app_handle();
    let next = Settings {
        window_size: size,
        ..settings::load(app)
    };
    settings::save(app, &next)?;
    settings::apply_window_size(&window, &next.window_size);
    Ok(next)
}

#[tauri::command]
fn set_default_page(app: AppHandle, page: String) -> Result<Settings, String> {
    if !settings::is_page_id(&page) {
        return Err(format!("Tab không hợp lệ: {page}"));
    }
    let next = Settings {
        default_page: page,
        ..settings::load(&app)
    };
    settings::save(&app, &next)?;
    Ok(next)
}

#[tauri::command]
fn set_font_size(app: AppHandle, size: String) -> Result<Settings, String> {
    if !settings::FONT_SIZES.contains(&size.as_str()) {
        return Err(format!("Cỡ chữ không hợp lệ: {size}"));
    }
    let next = Settings {
        font_size: size,
        ..settings::load(&app)
    };
    settings::save(&app, &next)?;
    Ok(next)
}

#[tauri::command]
fn set_pins(app: AppHandle, pins: Vec<String>) -> Result<Settings, String> {
    if !settings::is_pin_list(&pins) {
        return Err("Danh sách ghim không hợp lệ".into());
    }
    let next = Settings {
        pins,
        ..settings::load(&app)
    };
    settings::save(&app, &next)?;
    Ok(next)
}

#[tauri::command]
fn reset_settings(window: WebviewWindow) -> Result<Settings, String> {
    let app = window.app_handle();
    let next = Settings {
        pins: settings::load(app).pins,
        ..DEFAULT_SETTINGS.clone()
    };
    settings::save(app, &next)?;
    settings::apply_window_size(&window, &next.window_size);
    Ok(next)
}

#[tauri::command]
fn get_cache_size(app: AppHandle) -> u64 {
    webview2::cache_size(&app)
}

#[tauri::command]
fn clear_cache(window: WebviewWindow) -> Result<u64, String> {
    let freed = webview2::cache_size(window.app_handle());
    window
        .clear_all_browsing_data()
        .map_err(|e| e.to_string())?;
    Ok(freed)
}

fn is_app_url(url: &Url) -> bool {
    let host = url.host_str();
    host == Some("tauri.localhost") || (cfg!(debug_assertions) && host == Some("localhost"))
}

fn is_external_url(url: &Url) -> bool {
    matches!(url.scheme(), "http" | "https")
}

fn open_external(app: &AppHandle, url: &Url) {
    if is_external_url(url) {
        let _ = app.opener().open_url(url.as_str(), None::<&str>);
    }
}

fn create_window(app: &AppHandle) -> tauri::Result<WebviewWindow> {
    let Settings {
        window_size,
        default_page,
        font_size,
        ..
    } = settings::load(app);
    let (width, height) = settings::window_size(app, &window_size);
    let nav_app = app.clone();
    let popup_app = app.clone();
    let win = WebviewWindowBuilder::new(
        app,
        "main",
        WebviewUrl::App(format!("index.html?page={default_page}&font={font_size}").into()),
    )
    .title(TITLE)
    .inner_size(width, height)
    .visible(false)
    .background_color(Color(0, 0, 0, 255))
    .initialization_script(BRIDGE)
    .on_navigation(move |url| {
        if is_app_url(url) {
            return true;
        }
        open_external(&nav_app, url);
        false
    })
    .on_new_window(move |url, _| {
        open_external(&popup_app, &url);
        NewWindowResponse::Deny
    })
    .build()?;
    win.show()?;
    settings::set_outer_size(&win, width, height);
    win.center()?;
    if window_size == "maximized" {
        win.maximize()?;
    }
    Ok(win)
}

fn main() {
    if !webview2::is_installed() {
        webview2::show_missing_dialog();
        return;
    }
    tauri::Builder::default()
        .plugin(tauri_plugin_single_instance::init(|app, _, _| {
            if let Some(win) = app.get_webview_window("main") {
                let _ = win.unminimize();
                let _ = win.show();
                let _ = win.set_focus();
            }
        }))
        .plugin(
            tauri_plugin_opener::Builder::new()
                .open_js_links_on_click(false)
                .build(),
        )
        .invoke_handler(tauri::generate_handler![
            fetch_text,
            get_settings,
            set_window_size,
            set_default_page,
            set_font_size,
            set_pins,
            reset_settings,
            get_cache_size,
            clear_cache,
        ])
        .setup(|app| {
            create_window(app.handle())?;
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running Heroes 3 VN");
}

#[cfg(test)]
mod tests {
    use super::*;

    fn url(s: &str) -> Url {
        Url::parse(s).unwrap()
    }

    #[test]
    fn app_urls_stay_in_window() {
        assert!(is_app_url(&url(
            "http://tauri.localhost/index.html?page=home"
        )));
        assert!(is_app_url(&url("https://tauri.localhost/")));
        assert!(!is_app_url(&url("https://github.com/quducute/Heroes3VN")));
        assert!(!is_app_url(&url("https://tauri.localhost.evil.com/")));
    }

    #[test]
    fn localhost_only_allowed_in_debug() {
        assert_eq!(
            is_app_url(&url("http://localhost:5173/")),
            cfg!(debug_assertions)
        );
    }

    #[test]
    fn fetch_only_allowed_https_hosts() {
        for s in FETCH_ALLOWED_HOSTS {
            assert!(is_fetch_allowed(&url(&format!("https://{s}/x"))), "{s}");
        }
        for s in [
            "http://download.h3hota.com/upd/changelogs/eng.txt",
            "https://evil.com/",
            "https://download.h3hota.com.evil.com/",
            "file:///C:/Windows/win.ini",
        ] {
            assert!(!is_fetch_allowed(&url(s)), "{s}");
        }
    }

    #[test]
    fn only_http_links_open_externally() {
        assert!(is_external_url(&url("https://discord.gg/XM2EWmYF3u")));
        assert!(is_external_url(&url("http://example.com/")));
        for s in [
            "file:///C:/Windows/System32/cmd.exe",
            "javascript:alert(1)",
            "mailto:a@b.c",
            "ms-settings:",
        ] {
            assert!(!is_external_url(&url(s)), "{s}");
        }
    }
}
