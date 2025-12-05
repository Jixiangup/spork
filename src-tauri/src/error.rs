use serde::{Serialize, Serializer};
use thiserror::Error;

#[derive(Debug, Error)]
pub enum SporkError {
    #[error("Failed to load or save settings: {0}")]
    StorageError(#[from] tauri_plugin_store::Error),

    #[error("Serialization or deserialization error: {0}")]
    SerdeError(#[from] serde_json::Error),
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "snake_case")]
#[serde(tag = "error", content = "message")]
pub enum ErrorKind {
    StorageError(String),

    SerdeError(String),
}

impl Serialize for SporkError {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: Serializer
    {
        let kind = match self {
            SporkError::StorageError(msg) => ErrorKind::StorageError(msg.to_string()),
            SporkError::SerdeError(msg) => ErrorKind::SerdeError(msg.to_string()),
        };
        kind.serialize(serializer)
    }
}