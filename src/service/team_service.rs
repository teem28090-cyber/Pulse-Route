use crate::domain::TeamMember;
use crate::dto::{
    CreateTeamMemberDto, ReorderTeamMembersDto, TeamMemberResponseDto, UpdateTeamMemberDto,
};
use crate::errors::{AppError, AppResult};
use crate::repository::SupabaseRepository;
use chrono::Utc;
use uuid::Uuid;
use validator::Validate;

#[derive(Clone)]
pub struct TeamService {
    repository: SupabaseRepository,
}

impl TeamService {
    pub fn new(repository: SupabaseRepository) -> Self {
        Self { repository }
    }

    /// List all team members (public view or admin view)
    pub async fn list_team_members(&self, active_only: bool) -> AppResult<Vec<TeamMemberResponseDto>> {
        let members = self.repository.find_all(active_only).await?;
        Ok(members.into_iter().map(TeamMemberResponseDto::from).collect())
    }

    /// Get single team member by id
    pub async fn get_team_member(&self, id: Uuid) -> AppResult<TeamMemberResponseDto> {
        let member = self.repository.find_by_id(id).await?;
        Ok(TeamMemberResponseDto::from(member))
    }

    /// Create a new team member with business validation
    pub async fn create_team_member(&self, dto: CreateTeamMemberDto) -> AppResult<TeamMemberResponseDto> {
        dto.validate()
            .map_err(|e| AppError::ValidationError(e.to_string()))?;

        // Calculate next display order if not specified
        let existing = self.repository.find_all(false).await.unwrap_or_default();
        let next_order = dto.display_order.unwrap_or_else(|| {
            existing.iter().map(|m| m.display_order).max().unwrap_or(0) + 1
        });

        let new_member = TeamMember {
            id: Uuid::new_v4(),
            name_ar: dto.name_ar.trim().to_string(),
            name_en: dto.name_en.trim().to_string(),
            role_ar: dto.role_ar.trim().to_string(),
            role_en: dto.role_en.trim().to_string(),
            age: dto.age,
            bio_ar: dto.bio_ar.map(|s| s.trim().to_string()),
            bio_en: dto.bio_en.map(|s| s.trim().to_string()),
            avatar_url: dto.avatar_url.unwrap_or_else(|| "assets/default_avatar.jpg".to_string()),
            skills: dto.skills.unwrap_or_default(),
            social_links: dto.social_links.unwrap_or_default(),
            custom_fields: dto.custom_fields.unwrap_or_else(|| serde_json::json!({})),
            display_order: next_order,
            is_active: dto.is_active.unwrap_or(true),
            is_featured: dto.is_featured.unwrap_or(false),
            created_at: Utc::now(),
            updated_at: Utc::now(),
        };

        let saved = self.repository.create(new_member).await?;
        Ok(TeamMemberResponseDto::from(saved))
    }

    /// Update an existing team member
    pub async fn update_team_member(
        &self,
        id: Uuid,
        dto: UpdateTeamMemberDto,
    ) -> AppResult<TeamMemberResponseDto> {
        dto.validate()
            .map_err(|e| AppError::ValidationError(e.to_string()))?;

        let mut member = self.repository.find_by_id(id).await?;

        if let Some(name_ar) = dto.name_ar {
            member.name_ar = name_ar.trim().to_string();
        }
        if let Some(name_en) = dto.name_en {
            member.name_en = name_en.trim().to_string();
        }
        if let Some(role_ar) = dto.role_ar {
            member.role_ar = role_ar.trim().to_string();
        }
        if let Some(role_en) = dto.role_en {
            member.role_en = role_en.trim().to_string();
        }
        if let Some(age) = dto.age {
            member.age = Some(age);
        }
        if let Some(bio_ar) = dto.bio_ar {
            member.bio_ar = Some(bio_ar.trim().to_string());
        }
        if let Some(bio_en) = dto.bio_en {
            member.bio_en = Some(bio_en.trim().to_string());
        }
        if let Some(avatar_url) = dto.avatar_url {
            member.avatar_url = avatar_url;
        }
        if let Some(skills) = dto.skills {
            member.skills = skills;
        }
        if let Some(social_links) = dto.social_links {
            member.social_links = social_links;
        }
        if let Some(custom_fields) = dto.custom_fields {
            member.custom_fields = custom_fields;
        }
        if let Some(display_order) = dto.display_order {
            member.display_order = display_order;
        }
        if let Some(is_active) = dto.is_active {
            member.is_active = is_active;
        }
        if let Some(is_featured) = dto.is_featured {
            member.is_featured = is_featured;
        }

        member.updated_at = Utc::now();

        let updated = self.repository.update(member).await?;
        Ok(TeamMemberResponseDto::from(updated))
    }

    /// Delete team member by id
    pub async fn delete_team_member(&self, id: Uuid) -> AppResult<()> {
        self.repository.delete(id).await
    }

    /// Batch reorder team members
    pub async fn reorder_team_members(&self, dto: ReorderTeamMembersDto) -> AppResult<Vec<TeamMemberResponseDto>> {
        for item in dto.orders {
            if let Ok(mut member) = self.repository.find_by_id(item.id).await {
                member.display_order = item.display_order;
                member.updated_at = Utc::now();
                let _ = self.repository.update(member).await;
            }
        }
        self.list_team_members(false).await
    }

    /// Handle avatar upload and return public URL
    pub async fn upload_avatar(&self, filename: &str, file_bytes: Vec<u8>, content_type: &str) -> AppResult<String> {
        if file_bytes.len() > 5 * 1024 * 1024 {
            return Err(AppError::ValidationError("Avatar file size exceeds 5MB limit".to_string()));
        }

        let valid_types = ["image/jpeg", "image/png", "image/webp", "image/gif"];
        if !valid_types.contains(&content_type) {
            return Err(AppError::ValidationError("Unsupported image format. Allowed: JPG, PNG, WEBP, GIF".to_string()));
        }

        self.repository.upload_avatar(filename, file_bytes, content_type).await
    }
}
