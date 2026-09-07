use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use utoipa::ToSchema;
use uuid::Uuid;

#[derive(Debug, Clone, Serialize, Deserialize, ToSchema)]
pub struct SocialLinks {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub github: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub linkedin: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub twitter: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub email: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub website: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub portfolio: Option<String>,
}

impl Default for SocialLinks {
    fn default() -> Self {
        Self {
            github: None,
            linkedin: None,
            twitter: None,
            email: None,
            website: None,
            portfolio: None,
        }
    }
}

/// Domain Entity representing a PulseRoute Team Member
#[derive(Debug, Clone, Serialize, Deserialize, ToSchema)]
pub struct TeamMember {
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
