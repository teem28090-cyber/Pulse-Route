use axum::{
    http::StatusCode,
    response::{IntoResponse, Response},
    Json,
};
use serde::{Deserialize, Serialize};
use thiserror::Error;
use utoipa::ToSchema;

/// Standardized API Error Response following RFC 7807 Problem Details
#[derive(Debug, Serialize, Deserialize, ToSchema)]
pub struct ErrorResponse {
    pub success: bool,
    pub error_code: String,
    pub message: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub details: Option<serde_json::Value>,
    pub timestamp: String,
}

#[derive(Error, Debug)]
pub enum AppError {
    #[error("Resource not found: {0}")]
    NotFound(String),

    #[error("Validation failed: {0}")]
    ValidationError(String),

    #[error("Bad request: {0}")]
    BadRequest(String),

    #[error("Unauthorized access: {0}")]
    Unauthorized(String),

    #[error("Forbidden operation: {0}")]
    Forbidden(String),

    #[error("Conflict occurred: {0}")]
    Conflict(String),

    #[error("Supabase Database error: {0}")]
    DatabaseError(String),

    #[error("Storage/Upload error: {0}")]
    StorageError(String),

    #[error("External service error: {0}")]
    ExternalServiceError(String),

    #[error("Internal server error: {0}")]
    InternalServerError(String),
}

impl IntoResponse for AppError {
    fn into_response(self) -> Response {
        let (status, error_code, message, details) = match &self {
            AppError::NotFound(msg) => (
                StatusCode::NOT_FOUND,
                "NOT_FOUND",
                msg.clone(),
                None,
            ),
            AppError::ValidationError(msg) => (
                StatusCode::UNPROCESSABLE_ENTITY,
                "VALIDATION_ERROR",
                msg.clone(),
                None,
            ),
            AppError::BadRequest(msg) => (
                StatusCode::BAD_REQUEST,
                "BAD_REQUEST",
                msg.clone(),
                None,
            ),
            AppError::Unauthorized(msg) => (
                StatusCode::UNAUTHORIZED,
                "UNAUTHORIZED",
                msg.clone(),
                None,
            ),
            AppError::Forbidden(msg) => (
                StatusCode::FORBIDDEN,
                "FORBIDDEN",
                msg.clone(),
                None,
            ),
            AppError::Conflict(msg) => (
                StatusCode::CONFLICT,
                "CONFLICT",
                msg.clone(),
                None,
            ),
            AppError::DatabaseError(msg) => (
                StatusCode::BAD_GATEWAY,
                "DATABASE_ERROR",
                format!("Database interaction failed: {}", msg),
                None,
            ),
            AppError::StorageError(msg) => (
                StatusCode::BAD_GATEWAY,
                "STORAGE_ERROR",
                format!("Storage operation failed: {}", msg),
                None,
            ),
            AppError::ExternalServiceError(msg) => (
                StatusCode::SERVICE_UNAVAILABLE,
                "EXTERNAL_SERVICE_ERROR",
                msg.clone(),
                None,
            ),
            AppError::InternalServerError(msg) => (
                StatusCode::INTERNAL_SERVER_ERROR,
                "INTERNAL_SERVER_ERROR",
                msg.clone(),
                None,
            ),
        };

        let body = Json(ErrorResponse {
            success: false,
            error_code: error_code.to_string(),
            message,
            details,
            timestamp: chrono::Utc::now().to_rfc3339(),
        });

        (status, body).into_response()
    }
}

pub type AppResult<T> = Result<T, AppError>;
