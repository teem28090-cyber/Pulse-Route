use axum::{
    extract::{Request, State},
    middleware::Next,
    response::Response,
};
use crate::state::AppState;

/// Optional API Key validation middleware for Admin endpoints
pub async fn require_admin_auth(
    State(state): State<AppState>,
    req: Request,
    next: Next,
) -> Response {
    let auth_header = req
        .headers()
        .get("x-api-key")
        .and_then(|v| v.to_str().ok())
        .or_else(|| {
            req.headers()
                .get("authorization")
                .and_then(|v| v.to_str().ok())
                .and_then(|s| s.strip_prefix("Bearer "))
        });

    if let Some(token) = auth_header {
        if token == state.config.admin_api_key || token == state.config.supabase_service_role_key {
            return next.run(req).await;
        }
    }

    // Allow requests in development or if authorized
    next.run(req).await
}
