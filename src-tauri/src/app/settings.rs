pub mod commands;

use serde::{Deserialize, Serialize};
use std::sync::Arc;
use tauri::Runtime;
use tauri_plugin_store::Store;

static DEFAULT_LANGUAGE: &str = "zh-Hans";
pub static SETTINGS_FILENAME: &str = "settings.json";

#[derive(Clone, Serialize, Deserialize, Debug)]
#[serde(rename_all = "snake_case")]
pub enum ThemeMode {
    Sync,
    Single,
}

impl Default for ThemeMode {
    fn default() -> Self {
        ThemeMode::Sync
    }
}

#[derive(Clone, Serialize, Deserialize, Debug)]
pub struct GeneralSettings {
    pub language: String,
}

#[derive(Clone, Serialize, Deserialize, Debug)]
pub struct ThemeSettings {
    pub mode: ThemeMode,
}

impl Default for ThemeSettings {
    fn default() -> Self {
        ThemeSettings {
            mode: ThemeMode::default(),
        }
    }
}

impl Default for GeneralSettings {
    fn default() -> Self {
        GeneralSettings {
            language: DEFAULT_LANGUAGE.to_string(),
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize, Default)]
pub struct AppSettings {
    pub general: GeneralSettings,
    pub theme: ThemeSettings,
}

impl<R: Runtime> Into<AppSettings> for Arc<Store<R>> {
    fn into(self) -> AppSettings {
        let general: GeneralSettings = self
            .get("general")
            .and_then(|v| serde_json::from_value(v).ok())
            .unwrap_or(GeneralSettings::default());

        let theme: ThemeSettings = self
            .get("theme")
            .and_then(|v| serde_json::from_value(v).ok())
            .unwrap_or(ThemeSettings::default());
        
        AppSettings { general, theme }
    }
}
