use std::fs;
use std::path::Path;

use tauri::{AppHandle, Manager};
use windows_sys::Win32::UI::Shell::ShellExecuteW;
use windows_sys::Win32::UI::WindowsAndMessaging::{
    IDYES, MB_ICONWARNING, MB_YESNO, MessageBoxW, SW_SHOWNORMAL,
};

const ELECTRON_URL: &str = "https://github.com/quducute/Heroes3VN/releases/latest";

const CACHE_DIRS: [&str; 7] = [
    "Default/Cache",
    "Default/Code Cache",
    "Default/GPUCache",
    "Default/Service Worker",
    "GrShaderCache",
    "GraphiteDawnCache",
    "ShaderCache",
];

pub fn is_installed() -> bool {
    tauri::webview_version().is_ok()
}

fn wide(s: &str) -> Vec<u16> {
    s.encode_utf16().chain(std::iter::once(0)).collect()
}

pub fn show_missing_dialog() {
    let text = wide(
        "Máy của bác chưa có Microsoft Edge WebView2 Runtime nên không mở được Bản Windows WebView2.\n\n\
         Bấm Yes để mở trang tải Bản Windows (không cần WebView2).",
    );
    let caption = wide("Heroes 3 VN by Gogetto");
    let answer = unsafe {
        MessageBoxW(
            std::ptr::null_mut(),
            text.as_ptr(),
            caption.as_ptr(),
            MB_YESNO | MB_ICONWARNING,
        )
    };
    if answer == IDYES {
        let open = wide("open");
        let url = wide(ELECTRON_URL);
        unsafe {
            ShellExecuteW(
                std::ptr::null_mut(),
                open.as_ptr(),
                url.as_ptr(),
                std::ptr::null(),
                std::ptr::null(),
                SW_SHOWNORMAL,
            );
        }
    }
}

fn dir_size(path: &Path) -> u64 {
    fs::read_dir(path)
        .map(|entries| {
            entries
                .flatten()
                .map(|e| match e.file_type() {
                    Ok(t) if t.is_dir() => dir_size(&e.path()),
                    Ok(_) => e.metadata().map(|m| m.len()).unwrap_or(0),
                    Err(_) => 0,
                })
                .sum()
        })
        .unwrap_or(0)
}

pub fn cache_size(app: &AppHandle) -> u64 {
    let Ok(base) = app.path().app_local_data_dir() else {
        return 0;
    };
    let root = base.join("EBWebView");
    CACHE_DIRS.iter().map(|d| dir_size(&root.join(d))).sum()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn dir_size_sums_nested_files() {
        let root = std::env::temp_dir().join(format!("h3vn-dir-size-{}", std::process::id()));
        let _ = fs::remove_dir_all(&root);
        fs::create_dir_all(root.join("a/b")).unwrap();
        fs::write(root.join("x.bin"), [0u8; 100]).unwrap();
        fs::write(root.join("a/y.bin"), [0u8; 20]).unwrap();
        fs::write(root.join("a/b/z.bin"), [0u8; 3]).unwrap();
        fs::create_dir_all(root.join("empty")).unwrap();
        let size = dir_size(&root);
        fs::remove_dir_all(&root).unwrap();
        assert_eq!(size, 123);
    }

    #[test]
    fn dir_size_missing_dir_is_zero() {
        assert_eq!(dir_size(Path::new("Z:/h3vn/khong-ton-tai")), 0);
    }

    #[test]
    fn cache_dirs_are_relative_and_unique() {
        let unique: std::collections::HashSet<_> = CACHE_DIRS.iter().collect();
        assert_eq!(unique.len(), CACHE_DIRS.len());
        for d in CACHE_DIRS {
            assert!(!Path::new(d).is_absolute() && !d.contains(".."), "{d}");
        }
    }

    #[test]
    fn wide_string_ends_with_nul() {
        assert_eq!(wide("Bác"), vec![66, 225, 99, 0]);
    }
}
