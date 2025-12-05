use tauri::{AppHandle, Runtime};
use tauri_plugin_store::StoreExt;
use crate::app::settings::{AppSettings, SETTINGS_FILENAME};

/// Load the application settings from the store.
pub async fn settings<R: Runtime>(app: AppHandle<R>) -> Result<AppSettings, crate::SporkError> {
    let store = app.store(SETTINGS_FILENAME)?;
    Ok(store.into())
}

/// Save the application settings to the store.
pub async fn save_settings<R: Runtime>(app: AppHandle<R>, settings: AppSettings) -> Result<(), crate::SporkError> {
    let store = app.store(SETTINGS_FILENAME)?;
    store.set("general", serde_json::to_value(&settings.general)?);
    store.set("theme", serde_json::to_value(&settings.theme)?);
    store.save()?;
    Ok(())
}