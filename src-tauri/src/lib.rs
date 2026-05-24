use std::{fs, path::PathBuf};

use serde_json::Value;
use tauri::Manager;

fn file_json_path(app: &tauri::AppHandle) -> Result<PathBuf, String> {
    let app_dir = app
        .path()
        .app_local_data_dir()
        .map_err(|error| format!("failed to resolve app data dir: {error}"))?;

    fs::create_dir_all(&app_dir)
        .map_err(|error| format!("failed to create app data dir: {error}"))?;

    Ok(app_dir.join("file.json"))
}

#[tauri::command]
fn save_file_json(app: tauri::AppHandle, data: Value) -> Result<(), String> {
    let file_path = file_json_path(&app)?;
    let content = serde_json::to_string_pretty(&data)
        .map_err(|error| format!("failed to serialize json: {error}"))?;

    fs::write(file_path, content).map_err(|error| format!("failed to write file.json: {error}"))
}

#[tauri::command]
fn read_file_json(app: tauri::AppHandle) -> Result<Value, String> {
    let file_path = file_json_path(&app)?;
    let content = fs::read_to_string(file_path)
        .map_err(|error| format!("failed to read file.json: {error}"))?;

    serde_json::from_str(&content).map_err(|error| format!("failed to parse file.json: {error}"))
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![save_file_json, read_file_json])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
