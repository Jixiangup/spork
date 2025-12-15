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
    Day,
    Night,
    Auto,
}

impl Default for ThemeMode {
    fn default() -> Self {
        ThemeMode::Auto
    }
}

impl ThemeMode {
    pub fn default_scheme(&self) -> ThemeScheme {
        match self {
            ThemeMode::Day => ThemeScheme::Light,
            ThemeMode::Night => ThemeScheme::Dark,
            ThemeMode::Auto => ThemeScheme::Light,
        }
    }
}

#[derive(Clone, Serialize, Deserialize, Debug)]
#[serde(rename_all = "snake_case")]
pub enum ThemeScheme {
    Light,
    LightColorblind,
    LightTritanopia,
    LightHighContrast,
    Dark,
    DarkColorblind,
    DarkTritanopia,
    DarkDimmed,
}

impl Default for ThemeScheme {
    fn default() -> Self {
        ThemeScheme::Light
    }
}

impl ThemeScheme {
    pub fn all_schemes() -> Vec<ThemeScheme> {
        vec![
            ThemeScheme::Light,
            ThemeScheme::LightColorblind,
            ThemeScheme::LightTritanopia,
            ThemeScheme::LightHighContrast,
            ThemeScheme::Dark,
            ThemeScheme::DarkColorblind,
            ThemeScheme::DarkTritanopia,
            ThemeScheme::DarkDimmed,
        ]
    }

    pub fn is_dark(&self) -> bool {
        matches!(
            self,
            ThemeScheme::Dark
                | ThemeScheme::DarkColorblind
                | ThemeScheme::DarkTritanopia
                | ThemeScheme::DarkDimmed
        )
    }

    pub fn is_light(&self) -> bool {
        !self.is_dark()
    }

    pub fn available() -> Vec<ThemeScheme> {
        vec![
            ThemeScheme::Light,
            ThemeScheme::LightColorblind,
            ThemeScheme::LightTritanopia,
            ThemeScheme::Dark,
            ThemeScheme::DarkColorblind,
            ThemeScheme::DarkTritanopia,
            ThemeScheme::DarkDimmed,
        ]
    }
}

#[derive(Clone, Serialize, Deserialize, Debug)]
pub struct GeneralSettings {
    pub language: String,
}

#[derive(Clone, Serialize, Deserialize, Debug)]
pub struct ThemeSettings {
    pub mode: ThemeMode,
    pub scheme: ThemeScheme,
    pub night_scheme: ThemeScheme,
    pub day_scheme: ThemeScheme,
}

impl Default for ThemeSettings {
    fn default() -> Self {
        ThemeSettings {
            mode: ThemeMode::default(),
            scheme: ThemeScheme::default(),
            night_scheme: ThemeScheme::DarkDimmed,
            day_scheme: ThemeScheme::Light,
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
