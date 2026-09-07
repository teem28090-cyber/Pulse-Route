use axum::{extract::State, response::IntoResponse, Json};
use crate::dto::ApiResponse;
use crate::errors::AppResult;
use crate::state::AppState;

#[utoipa::path(
    get,
    path = "/api/v1/health",
    tag = "Health",
    responses(
        (status = 200, description = "Service health status", body = ApiResponse<serde_json::Value>)
    )
)]
pub async fn health_check(State(state): State<AppState>) -> AppResult<impl IntoResponse> {
    let supabase_configured = state.config.has_real_supabase();

    let health_data = serde_json::json!({
        "status": "healthy",
        "service": "PulseRoute Backend",
        "version": env!("CARGO_PKG_VERSION"),
        "supabase": {
            "connected": supabase_configured,
            "url": if supabase_configured { &state.config.supabase_url } else { "running_in_standalone_mode" }
        },
        "engine": "Rust (Axum + Tokio + Supabase)",
        "timestamp": chrono::Utc::now().to_rfc3339(),
    });

    Ok(Json(ApiResponse::success(health_data, "Service is healthy and ready")))
}
