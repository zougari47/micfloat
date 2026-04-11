use tauri::Manager;

#[cfg(target_os = "linux")]
use webkit2gtk::{PermissionRequestExt, WebViewExt};

#[tauri::command]
fn toggle_overlay(app: tauri::AppHandle, visible: bool) {
    if let Some(window) = app.get_webview_window("overlay") {
        if visible {
            window.show().unwrap();
            window.set_focus().unwrap();
        } else {
            window.hide().unwrap();
        }
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_clipboard_manager::init())
        .plugin(tauri_plugin_store::Builder::default().build())
        .setup(|app| {
            #[cfg(target_os = "linux")]
            {
                if let Some(overlay) = app.get_webview_window("overlay") {
                    overlay
                        .with_webview(|wv| {
                            wv.inner().connect_permission_request(|_, request| {
                                request.allow();
                                true
                            });
                        })
                        .unwrap();
                }
            }
            let args: Vec<String> = std::env::args().collect();
            if args.contains(&"--overlay".to_string()) {
                if let Some(overlay) = app.get_webview_window("overlay") {
                    overlay.show().unwrap();
                }
            } else {
                if let Some(main) = app.get_webview_window("main") {
                    main.show().unwrap();
                }
            }
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![toggle_overlay])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
