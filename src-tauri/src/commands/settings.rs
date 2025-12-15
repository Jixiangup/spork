#[tauri::command]
pub async fn settings<R: tauri::Runtime>(app: tauri::AppHandle<R>) -> Result<crate::app::settings::AppSettings, crate::SporkError> {
    crate::app::settings::commands::settings(app).await
}

#[tauri::command]
pub async fn save_settings<R: tauri::Runtime>(app: tauri::AppHandle<R>, settings: crate::app::settings::AppSettings) -> Result<(), crate::SporkError> {
    crate::app::settings::commands::save_settings(app, settings).await
}

#[tauri::command]
pub async fn schemes<R: tauri::Runtime>(app: tauri::AppHandle<R>, options: crate::app::settings::commands::QueryThemeOptions) -> Result<Vec<crate::app::settings::ThemeScheme>, crate::SporkError> {
    crate::app::settings::commands::schemes(app, options).await
}