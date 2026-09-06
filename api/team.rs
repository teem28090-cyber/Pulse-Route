use pulseroute_backend::config::AppConfig;
use pulseroute_backend::dto::{
    ApiResponse, CreateTeamMemberDto, ReorderTeamMembersDto, UpdateTeamMemberDto,
};
use pulseroute_backend::repository::SupabaseRepository;
use pulseroute_backend::service::TeamService;
use std::sync::Arc;
use uuid::Uuid;
use vercel_runtime::{run, Body, Error, Request, Response, StatusCode};

#[tokio::main]
async fn main() -> Result<(), Error> {
    run(handler).await
}

pub async fn handler(req: Request) -> Result<Response<Body>, Error> {
    let config = Arc::new(AppConfig::from_env());
    let repo = SupabaseRepository::new(config.clone());
    let service = TeamService::new(repo);

    let method = req.method().clone();
    let uri = req.uri().clone();
    let path = uri.path();
    let query_str = uri.query().unwrap_or("");

    // Extract UUID if present in path, e.g. /api/team/11111111-1111-1111-1111-111111111111
    let id_opt = path
        .strip_prefix("/api/team/")
        .or_else(|| path.strip_prefix("/team/"))
        .and_then(|s| s.split('/').next())
        .and_then(|s| Uuid::parse_str(s).ok());

    let is_reorder = path.ends_with("/reorder");

    let response_result: Result<(StatusCode, serde_json::Value), (StatusCode, String)> = match method.as_str() {
        "GET" => {
            if let Some(id) = id_opt {
                match service.get_team_member(id).await {
                    Ok(member) => Ok((
                        StatusCode::OK,
                        serde_json::to_value(ApiResponse::success(member, "Team member retrieved"))
                            .unwrap(),
                    )),
                    Err(e) => Err((StatusCode::NOT_FOUND, e.to_string())),
                }
            } else {
                let active_only = !query_str.contains("all=true");
                match service.list_team_members(active_only).await {
                    Ok(members) => Ok((
                        StatusCode::OK,
                        serde_json::to_value(ApiResponse::success(members, "Team members list"))
                            .unwrap(),
                    )),
                    Err(e) => Err((StatusCode::INTERNAL_SERVER_ERROR, e.to_string())),
                }
            }
        }
        "POST" => {
            let body_bytes = req.body();
            if is_reorder {
                match serde_json::from_slice::<ReorderTeamMembersDto>(body_bytes) {
                    Ok(dto) => match service.reorder_team_members(dto).await {
                        Ok(members) => Ok((
                            StatusCode::OK,
                            serde_json::to_value(ApiResponse::success(members, "Reordered successfully"))
                                .unwrap(),
                        )),
                        Err(e) => Err((StatusCode::INTERNAL_SERVER_ERROR, e.to_string())),
                    },
                    Err(e) => Err((StatusCode::BAD_REQUEST, format!("Invalid JSON payload: {}", e))),
                }
            } else {
                match serde_json::from_slice::<CreateTeamMemberDto>(body_bytes) {
                    Ok(dto) => match service.create_team_member(dto).await {
                        Ok(member) => Ok((
                            StatusCode::CREATED,
                            serde_json::to_value(ApiResponse::success(member, "Member created successfully"))
                                .unwrap(),
                        )),
                        Err(e) => Err((StatusCode::UNPROCESSABLE_ENTITY, e.to_string())),
                    },
                    Err(e) => Err((StatusCode::BAD_REQUEST, format!("Invalid JSON payload: {}", e))),
                }
            }
        }
        "PUT" => {
            if let Some(id) = id_opt {
                let body_bytes = req.body();
                match serde_json::from_slice::<UpdateTeamMemberDto>(body_bytes) {
                    Ok(dto) => match service.update_team_member(id, dto).await {
                        Ok(member) => Ok((
                            StatusCode::OK,
                            serde_json::to_value(ApiResponse::success(member, "Member updated successfully"))
                                .unwrap(),
                        )),
                        Err(e) => Err((StatusCode::UNPROCESSABLE_ENTITY, e.to_string())),
                    },
                    Err(e) => Err((StatusCode::BAD_REQUEST, format!("Invalid JSON payload: {}", e))),
                }
            } else {
                Err((StatusCode::BAD_REQUEST, "Missing team member UUID in path".to_string()))
            }
        }
        "DELETE" => {
            if let Some(id) = id_opt {
                match service.delete_team_member(id).await {
                    Ok(()) => Ok((
                        StatusCode::OK,
                        serde_json::to_value(ApiResponse::success(
                            serde_json::json!({ "id": id, "deleted": true }),
                            "Member deleted successfully",
                        ))
                        .unwrap(),
                    )),
                    Err(e) => Err((StatusCode::NOT_FOUND, e.to_string())),
                }
            } else {
                Err((StatusCode::BAD_REQUEST, "Missing team member UUID in path".to_string()))
            }
        }
        _ => Err((StatusCode::METHOD_NOT_ALLOWED, "Method not allowed".to_string())),
    };

    let (status, body_json) = match response_result {
        Ok((status, json)) => (status, json),
        Err((status, msg)) => (
            status,
            serde_json::json!({
                "success": false,
                "error_code": "HTTP_ERROR",
                "message": msg,
                "timestamp": chrono::Utc::now().to_rfc3339()
            }),
        ),
    };

    let response_body = serde_json::to_string(&body_json)?;

    let response = Response::builder()
        .status(status)
        .header("Content-Type", "application/json")
        .header("Access-Control-Allow-Origin", "*")
        .header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        .header("Access-Control-Allow-Headers", "Content-Type, Authorization, x-api-key")
        .body(Body::Text(response_body))?;

    Ok(response)
}
