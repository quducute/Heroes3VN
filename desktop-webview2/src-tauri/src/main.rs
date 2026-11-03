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

static HTTP: LazyLock<reqwest::Client> = LazyLock::new(|| {
    reqwest::Client::builder()
        .timeout(Duration::from_secs(10))
        .build()
        .expect("reqwest client")
});

#[tauri::command]
async fn fetch_text(url: String) -> Result<String, String> {
    let u = Url::parse(&url).map_err(|e| e.to_string())?;
    let host = u.host_str().unwrap_or_default();
    if u.scheme() != "https" || !FETCH_ALLOWED_HOSTS.contains(&host) {
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
fn reset_settings(window: WebviewWindow) -> Result<Settings, String> {
    let next = DEFAULT_SETTINGS.clone();
    settings::save(window.app_handle(), &next)?;
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

fn open_external(app: &AppHandle, url: &Url) {
    if matches!(url.scheme(), "http" | "https") {
        let _ = app.opener().open_url(url.as_str(), None::<&str>);
    }
}

fn create_window(app: &AppHandle) -> tauri::Result<WebviewWindow> {
    let Settings {
        window_size,
        default_page,
    } = settings::load(app);
    let (width, height) = settings::window_size(app, &window_size);
    let nav_app = app.clone();
    let popup_app = app.clone();
    let win = WebviewWindowBuilder::new(
        app,
        "main",
        WebviewUrl::App(format!("index.html?page={default_page}").into()),
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
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            fetch_text,
            get_settings,
            set_window_size,
            set_default_page,
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
