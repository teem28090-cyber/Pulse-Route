use crate::domain::{SocialLinks, TeamMember};
use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use utoipa::ToSchema;
use uuid::Uuid;
use validator::Validate;

/// Standard API response wrapper for consistent client consumption
#[derive(Debug, Serialize, Deserialize, ToSchema)]
pub struct ApiResponse<T> {
    pub success: bool,
    pub message: String,
    pub data: T,
    pub timestamp: String,
}

impl<T> ApiResponse<T> {
    pub fn success(data: T, message: impl Into<String>) -> Self {
        Self {
            success: true,
            message: message.into(),
            data,
            timestamp: Utc::now().to_rfc3339(),
        }
    }
}

/// Request DTO for creating a new team member
#[derive(Debug, Clone, Serialize, Deserialize, Validate, ToSchema)]
pub struct CreateTeamMemberDto {
    #[validate(length(min = 2, max = 100, message = "Arabic name must be between 2 and 100 characters"))]
    pub name_ar: String,

    #[validate(length(min = 2, max = 100, message = "English name must be between 2 and 100 characters"))]
    pub name_en: String,

    #[validate(length(min = 2, max = 150, message = "Arabic role must be between 2 and 150 characters"))]
    pub role_ar: String,

    #[validate(length(min = 2, max = 150, message = "English role must be between 2 and 150 characters"))]
    pub role_en: String,

    #[validate(range(min = 10, max = 120, message = "Age must be between 10 and 120"))]
    pub age: Option<i32>,

    pub bio_ar: Option<String>,
    pub bio_en: Option<String>,

    #[serde(default)]
    pub avatar_url: Option<String>,

    #[serde(default)]
    pub skills: Option<Vec<String>>,

    #[serde(default)]
    pub social_links: Option<SocialLinks>,

    #[serde(default)]
    pub custom_fields: Option<serde_json::Value>,

    #[serde(default)]
    pub display_order: Option<i32>,

    #[serde(default = "default_true")]
    pub is_active: Option<bool>,

    #[serde(default)]
    pub is_featured: Option<bool>,
}

fn default_true() -> Option<bool> {
    Some(true)
}

/// Request DTO for updating an existing team member
#[derive(Debug, Clone, Serialize, Deserialize, Validate, ToSchema)]
pub struct UpdateTeamMemberDto {
    #[validate(length(min = 2, max = 100, message = "Arabic name must be between 2 and 100 characters"))]
    pub name_ar: Option<String>,

    #[validate(length(min = 2, max = 100, message = "English name must be between 2 and 100 characters"))]
    pub name_en: Option<String>,

    #[validate(length(min = 2, max = 150, message = "Arabic role must be between 2 and 150 characters"))]
    pub role_ar: Option<String>,

    #[validate(length(min = 2, max = 150, message = "English role must be between 2 and 150 characters"))]
    pub role_en: Option<String>,

    #[validate(range(min = 10, max = 120, message = "Age must be between 10 and 120"))]
    pub age: Option<i32>,

    pub bio_ar: Option<String>,
    pub bio_en: Option<String>,

    pub avatar_url: Option<String>,
    pub skills: Option<Vec<String>>,
    pub social_links: Option<SocialLinks>,
    pub custom_fields: Option<serde_json::Value>,
    pub display_order: Option<i32>,
    pub is_active: Option<bool>,
    pub is_featured: Option<bool>,
}

/// Request DTO for re-ordering team members in batch
#[derive(Debug, Clone, Serialize, Deserialize, ToSchema)]
pub struct ReorderItemDto {
    pub id: Uuid,
    pub display_order: i32,
}

#[derive(Debug, Clone, Serialize, Deserialize, ToSchema)]
pub struct ReorderTeamMembersDto {
    pub orders: Vec<ReorderItemDto>,
}

/// Response DTO formatted for frontend localization and rendering
#[derive(Debug, Clone, Serialize, Deserialize, ToSchema)]
pub struct TeamMemberResponseDto {
    pub id: Uuid,
    pub name_ar: String,
    pub name_en: String,
    pub role_ar: String,
    pub role_en: String,
    pub age: Option<i32>,
    pub bio_ar: Option<String>,
    pub bio_en: Option<String>,
    pub avatar_url: String,
    pub skills: Vec<String>,
    pub social_links: SocialLinks,
    pub custom_fields: serde_json::Value,
    pub display_order: i32,
    pub is_active: bool,
    pub is_featured: bool,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

impl From<TeamMember> for TeamMemberResponseDto {
    fn from(m: TeamMember) -> Self {
        Self {
            id: m.id,
            name_ar: m.name_ar,
            name_en: m.name_en,
            role_ar: m.role_ar,
            role_en: m.role_en,
            age: m.age,
            bio_ar: m.bio_ar,
            bio_en: m.bio_en,
            avatar_url: m.avatar_url,
            skills: m.skills,
            social_links: m.social_links,
            custom_fields: m.custom_fields,
            display_order: m.display_order,
            is_active: m.is_active,
            is_featured: m.is_featured,
            created_at: m.created_at,
            updated_at: m.updated_at,
        }
    }
}
