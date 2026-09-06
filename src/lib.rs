pub mod config;
pub mod domain;
pub mod dto;
pub mod errors;
pub mod handlers;
pub mod middleware;
pub mod repository;
pub mod service;
pub mod state;

use axum::{
    middleware::from_fn_with_state,
    routing::{get, post},
    Router,
};
use tower_http::{
    compression::CompressionLayer,
    cors::{Any, CorsLayer},
    trace::TraceLayer,
};
use utoipa::OpenApi;
use utoipa_swagger_ui::SwaggerUi;

use crate::dto::*;
use crate::errors::ErrorResponse;
use crate::handlers::*;
use crate::state::AppState;

#[derive(OpenApi)]
#[openapi(
    paths(
        handlers::team_handlers::list_team_members,
        handlers::team_handlers::get_team_member,
        handlers::team_handlers::create_team_member,
        handlers::team_handlers::update_team_member,
        handlers::team_handlers::delete_team_member,
        handlers::team_handlers::reorder_team_members,
        handlers::health_handlers::health_check,
    ),
    components(
        schemas(
            domain::TeamMember,
            domain::SocialLinks,
            CreateTeamMemberDto,
            UpdateTeamMemberDto,
            ReorderTeamMembersDto,
            ReorderItemDto,
            TeamMemberResponseDto,
            ApiResponse<TeamMemberResponseDto>,
            ApiResponse<Vec<TeamMemberResponseDto>>,
            ApiResponse<serde_json::Value>,
            ErrorResponse,
        )
    ),
    tags(
        (name = "Team", description = "Team member management endpoints"),
        (name = "Health", description = "Health and system status endpoints")
    ),
    info(
        title = "PulseRoute Team Management API",
        version = "1.0.0",
        description = "Enterprise-grade Rust backend API powering PulseRoute team management, integrated with Supabase and Vercel.",
        contact(
            name = "PulseRoute Engineering Team",
            email = "engineering@pulseroute.com"
        )
    )
)]
pub struct ApiDoc;

/// Construct the Axum application router
pub fn create_router(state: AppState) -> Router {
    let cors = CorsLayer::new()
        .allow_origin(Any)
        .allow_methods(Any)
        .allow_headers(Any);

    let api_routes = Router::new()
        .route("/health", get(health_check))
        .route(
            "/team",
            get(list_team_members).post(create_team_member),
        )
        .route(
            "/team/:id",
            get(get_team_member)
                .put(update_team_member)
                .delete(delete_team_member),
        )
        .route("/team/reorder", post(reorder_team_members))
        .route("/team/upload", post(upload_avatar))
        .layer(from_fn_with_state(state.clone(), middleware::require_admin_auth));

    Router::new()
        .merge(SwaggerUi::new("/swagger-ui").url("/api-docs/openapi.json", ApiDoc::openapi()))
        .nest("/api/v1", api_routes.clone())
        .nest("/api", api_routes)
        .layer(TraceLayer::new_for_http())
        .layer(CompressionLayer::new())
        .layer(cors)
        .with_state(state)
}
