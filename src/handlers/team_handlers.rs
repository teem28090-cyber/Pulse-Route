use axum::{
    extract::{Multipart, Path, Query, State},
    http::StatusCode,
    response::IntoResponse,
    Json,
};
use serde::Deserialize;
use uuid::Uuid;

use crate::dto::{
    ApiResponse, CreateTeamMemberDto, ReorderTeamMembersDto,
    UpdateTeamMemberDto,
};
use crate::errors::{AppError, AppResult};
use crate::state::AppState;

#[derive(Debug, Deserialize)]
pub struct ListQuery {
    pub all: Option<bool>,
}

/// GET /api/v1/team
/// Retrieve list of team members
#[utoipa::path(
    get,
    path = "/api/v1/team",
    tag = "Team",
    params(
        ("all" = Option<bool>, Query, description = "Include inactive team members (admin view)")
    ),
    responses(
        (status = 200, description = "List of team members", body = ApiResponse<Vec<TeamMemberResponseDto>>),
        (status = 500, description = "Internal server error")
    )
)]
pub async fn list_team_members(
    State(state): State<AppState>,
    Query(query): Query<ListQuery>,
) -> AppResult<impl IntoResponse> {
    let active_only = !query.all.unwrap_or(false);
    let members = state.team_service.list_team_members(active_only).await?;
    Ok(Json(ApiResponse::success(members, "Team members retrieved successfully")))
}

/// GET /api/v1/team/:id
/// Retrieve a single team member by UUID
#[utoipa::path(
    get,
    path = "/api/v1/team/{id}",
    tag = "Team",
    params(
        ("id" = Uuid, Path, description = "Team member UUID")
    ),
    responses(
        (status = 200, description = "Team member details", body = ApiResponse<TeamMemberResponseDto>),
        (status = 404, description = "Team member not found")
    )
)]
pub async fn get_team_member(
    State(state): State<AppState>,
    Path(id): Path<Uuid>,
) -> AppResult<impl IntoResponse> {
    let member = state.team_service.get_team_member(id).await?;
    Ok(Json(ApiResponse::success(member, "Team member retrieved successfully")))
}

/// POST /api/v1/team
/// Create a new team member
#[utoipa::path(
    post,
    path = "/api/v1/team",
    tag = "Team",
    request_body = CreateTeamMemberDto,
    responses(
        (status = 201, description = "Team member created", body = ApiResponse<TeamMemberResponseDto>),
        (status = 422, description = "Validation error")
    )
)]
pub async fn create_team_member(
    State(state): State<AppState>,
    Json(payload): Json<CreateTeamMemberDto>,
) -> AppResult<impl IntoResponse> {
    let created = state.team_service.create_team_member(payload).await?;
    Ok((
        StatusCode::CREATED,
        Json(ApiResponse::success(created, "Team member created successfully")),
    ))
}

/// PUT /api/v1/team/:id
/// Update an existing team member
#[utoipa::path(
    put,
    path = "/api/v1/team/{id}",
    tag = "Team",
    params(
        ("id" = Uuid, Path, description = "Team member UUID")
    ),
    request_body = UpdateTeamMemberDto,
    responses(
        (status = 200, description = "Team member updated", body = ApiResponse<TeamMemberResponseDto>),
        (status = 404, description = "Team member not found"),
        (status = 422, description = "Validation error")
    )
)]
pub async fn update_team_member(
    State(state): State<AppState>,
    Path(id): Path<Uuid>,
    Json(payload): Json<UpdateTeamMemberDto>,
) -> AppResult<impl IntoResponse> {
    let updated = state.team_service.update_team_member(id, payload).await?;
    Ok(Json(ApiResponse::success(updated, "Team member updated successfully")))
}

/// DELETE /api/v1/team/:id
/// Delete a team member
#[utoipa::path(
    delete,
    path = "/api/v1/team/{id}",
    tag = "Team",
    params(
        ("id" = Uuid, Path, description = "Team member UUID")
    ),
    responses(
        (status = 200, description = "Team member deleted", body = ApiResponse<serde_json::Value>),
        (status = 404, description = "Team member not found")
    )
)]
pub async fn delete_team_member(
    State(state): State<AppState>,
    Path(id): Path<Uuid>,
) -> AppResult<impl IntoResponse> {
    state.team_service.delete_team_member(id).await?;
    Ok(Json(ApiResponse::success(
        serde_json::json!({ "id": id, "deleted": true }),
        "Team member deleted successfully",
    )))
}

/// POST /api/v1/team/reorder
/// Reorder team members display priority
#[utoipa::path(
    post,
    path = "/api/v1/team/reorder",
    tag = "Team",
    request_body = ReorderTeamMembersDto,
    responses(
        (status = 200, description = "Team members reordered", body = ApiResponse<Vec<TeamMemberResponseDto>>)
    )
)]
pub async fn reorder_team_members(
    State(state): State<AppState>,
    Json(payload): Json<ReorderTeamMembersDto>,
) -> AppResult<impl IntoResponse> {
    let reordered = state.team_service.reorder_team_members(payload).await?;
    Ok(Json(ApiResponse::success(reordered, "Team members reordered successfully")))
}

/// POST /api/v1/team/upload
/// Upload an avatar image (supports multipart/form-data)
pub async fn upload_avatar(
    State(state): State<AppState>,
    mut multipart: Multipart,
) -> AppResult<impl IntoResponse> {
    while let Some(field) = multipart
        .next_field()
        .await
        .map_err(|e| AppError::BadRequest(format!("Failed to read multipart field: {}", e)))?
    {
        let content_type = field
            .content_type()
            .unwrap_or("application/octet-stream")
            .to_string();

        let raw_filename = field
            .file_name()
            .unwrap_or("avatar.jpg")
            .to_string();

        let ext = std::path::Path::new(&raw_filename)
            .extension()
            .and_then(|e| e.to_str())
            .unwrap_or("jpg");

        let unique_filename = format!("{}_{}.{}", Uuid::new_v4(), chrono::Utc::now().timestamp(), ext);

        let data = field
            .bytes()
            .await
            .map_err(|e| AppError::BadRequest(format!("Failed to read file bytes: {}", e)))?
            .to_vec();

        let public_url = state
            .team_service
            .upload_avatar(&unique_filename, data, &content_type)
            .await?;

        return Ok((
            StatusCode::CREATED,
            Json(ApiResponse::success(
                serde_json::json!({ "url": public_url, "filename": unique_filename }),
                "Avatar uploaded successfully",
            )),
        ));
    }

    Err(AppError::BadRequest("No file provided in multipart request".to_string()))
}
