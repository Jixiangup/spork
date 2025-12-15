use crate::app::settings::{AppSettings, ThemeScheme, SETTINGS_FILENAME};
use tauri::{AppHandle, Runtime};
use tauri_plugin_store::StoreExt;

#[derive(serde::Deserialize, Debug, Clone, Default)]
pub struct QueryThemeOptions {
    /// Whether to query only currently available theme plans
    pub only_available_schemes: Option<bool>,
}

/// Load the application settings from the store.
pub async fn settings<R: Runtime>(app: AppHandle<R>) -> Result<AppSettings, crate::SporkError> {
    let store = app.store(SETTINGS_FILENAME)?;
    Ok(store.into())
}

/// Save the application settings to the store.
pub async fn save_settings<R: Runtime>(
    app: AppHandle<R>,
    settings: AppSettings,
) -> Result<(), crate::SporkError> {
    let store = app.store(SETTINGS_FILENAME)?;
    store.set("general", serde_json::to_value(&settings.general)?);
    store.set("theme", serde_json::to_value(&settings.theme)?);
    store.save()?;
    Ok(())
}

pub async fn schemes<R: Runtime>(
    _app: AppHandle<R>,
    option: QueryThemeOptions,
) -> Result<Vec<ThemeScheme>, crate::SporkError> {
    if let Some(only_available_schemes) = option.only_available_schemes {
        if only_available_schemes {
            return Ok(ThemeScheme::available());
        }
    }
    Ok(ThemeScheme::all_schemes())
}
