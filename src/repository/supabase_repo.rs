use crate::config::AppConfig;
use crate::domain::{SocialLinks, TeamMember};
use crate::errors::{AppError, AppResult};
use chrono::Utc;
use reqwest::{header, Client};
use serde_json::json;
use std::sync::Arc;
use tokio::sync::RwLock;
use uuid::Uuid;

/// Supabase Repository interacting with Supabase PostgREST & Storage
#[derive(Clone)]
pub struct SupabaseRepository {
    client: Client,
    config: Arc<AppConfig>,
    /// Thread-safe in-memory cache / fallback store for instant local execution
    local_cache: Arc<RwLock<Vec<TeamMember>>>,
}

impl SupabaseRepository {
    pub fn new(config: Arc<AppConfig>) -> Self {
        let mut default_headers = header::HeaderMap::new();
        default_headers.insert(
            "apikey",
            header::HeaderValue::from_str(&config.supabase_anon_key)
                .unwrap_or_else(|_| header::HeaderValue::from_static("anon")),
        );
        default_headers.insert(
            header::CONTENT_TYPE,
            header::HeaderValue::from_static("application/json"),
        );
        default_headers.insert(
            "Prefer",
            header::HeaderValue::from_static("return=representation"),
        );

        let client = Client::builder()
            .default_headers(default_headers)
            .build()
            .expect("Failed to initialize HTTP client for Supabase");

        // Seed initial team members matching PulseRoute team
        let initial_members = vec![
            TeamMember {
                id: Uuid::parse_str("11111111-1111-1111-1111-111111111111").unwrap(),
                name_ar: "مازن أحمد".to_string(),
                name_en: "Mazen Ahmed".to_string(),
                role_ar: "مطور ويب وتطبيقات شامل".to_string(),
                role_en: "Full-Stack Developer".to_string(),
                age: Some(17),
                bio_ar: Some("شغوف ببناء معمارية برمجية متكاملة وتجارب مستخدم فائقة السرعة والأناقة.".to_string()),
                bio_en: Some("Passionate about building scalable architectures and delightful user experiences.".to_string()),
                avatar_url: "assets/mazen_ahmed.jpg".to_string(),
                skills: vec![
                    "Rust".to_string(),
                    "React".to_string(),
                    "Node.js".to_string(),
                    "TypeScript".to_string(),
                    "Architecture".to_string(),
                ],
                social_links: SocialLinks {
                    github: Some("https://github.com".to_string()),
                    linkedin: Some("https://linkedin.com".to_string()),
                    twitter: None,
                    email: Some("mazen@pulseroute.com".to_string()),
                    website: None,
                    portfolio: None,
                },
                custom_fields: json!({ "github_username": "mazen", "badge": "Lead Architect" }),
                display_order: 1,
                is_active: true,
                is_featured: true,
                created_at: Utc::now(),
                updated_at: Utc::now(),
            },
            TeamMember {
                id: Uuid::parse_str("22222222-2222-2222-2222-222222222222").unwrap(),
                name_ar: "ياسين صبري العوامي".to_string(),
                name_en: "Yassen Sabry Elawamy".to_string(),
                role_ar: "مطور أنظمة وخدمات خلفية".to_string(),
                role_en: "Back-End Developer".to_string(),
                age: Some(18),
                bio_ar: Some("خبير في تصميم واجهات الـ REST API وقواعد البيانات المتقدمة وإدارة الخوادم السحابية.".to_string()),
                bio_en: Some("Expert in crafting high-throughput REST APIs, database schemas, and microservices.".to_string()),
                avatar_url: "assets/yassen_sabry.jpg".to_string(),
                skills: vec![
                    "Rust".to_string(),
                    "PostgreSQL".to_string(),
                    "Supabase".to_string(),
                    "Docker".to_string(),
                    "REST APIs".to_string(),
                ],
                social_links: SocialLinks {
                    github: Some("https://github.com".to_string()),
                    linkedin: Some("https://linkedin.com".to_string()),
                    twitter: None,
                    email: Some("yassen@pulseroute.com".to_string()),
                    website: None,
                    portfolio: None,
                },
                custom_fields: json!({ "github_username": "yassen", "badge": "Core Engine" }),
                display_order: 2,
                is_active: true,
                is_featured: true,
                created_at: Utc::now(),
                updated_at: Utc::now(),
            },
            TeamMember {
                id: Uuid::parse_str("33333333-3333-3333-3333-333333333333").unwrap(),
                name_ar: "أحمد حلمي العتر".to_string(),
                name_en: "Ahmed Helmy El-Etr".to_string(),
                role_ar: "مهندس ذكاء اصطناعي وتعلم آلة".to_string(),
                role_en: "AI Developer & Machine Learning Engineer".to_string(),
                age: Some(17),
                bio_ar: Some("تطوير نماذج الذكاء الاصطناعي التوليدي والرؤية الحاسوبية لمعالجة البيانات المعقدة.".to_string()),
                bio_en: Some("Building state-of-the-art computer vision models and generative AI systems.".to_string()),
                avatar_url: "assets/ahmed_helmy.jpg".to_string(),
                skills: vec![
                    "Python".to_string(),
                    "PyTorch".to_string(),
                    "TensorFlow".to_string(),
                    "Computer Vision".to_string(),
                    "Data Science".to_string(),
                ],
                social_links: SocialLinks {
                    github: Some("https://github.com".to_string()),
                    linkedin: Some("https://linkedin.com".to_string()),
                    twitter: None,
                    email: Some("ahmed@pulseroute.com".to_string()),
                    website: None,
                    portfolio: None,
                },
                custom_fields: json!({ "github_username": "ahmed", "badge": "AI & ML" }),
                display_order: 3,
                is_active: true,
                is_featured: true,
                created_at: Utc::now(),
                updated_at: Utc::now(),
            },
            TeamMember {
                id: Uuid::parse_str("44444444-4444-4444-4444-444444444444").unwrap(),
                name_ar: "مي مجدي محمود".to_string(),
                name_en: "Mai Magdy Mahmoud".to_string(),
                role_ar: "مهندسة أمن سيبراني واختبار اختراق".to_string(),
                role_en: "Cybersecurity & Penetration Testing Engineer".to_string(),
                age: Some(21),
                bio_ar: Some("تأمين البنية التحتية والشبكات المعقدة واختبار الثغرات والأنظمة الصفرية لحماية بروتوكولات الطوارئ.".to_string()),
                bio_en: Some("Hardening cyber-physical infrastructure, Zero-Trust network topologies, and emergency telemetry defense.".to_string()),
                avatar_url: "assets/mai_ibrahim.jpg".to_string(),
                skills: vec![
                    "Penetration Testing & Vulnerability Assessment".to_string(),
                    "Zero-Trust Network Architecture".to_string(),
                    "Encrypted Protocols & System Hardening".to_string(),
                    "Infrastructure Security & Threat Defense".to_string(),
                ],
                social_links: SocialLinks {
                    github: Some("https://github.com".to_string()),
                    linkedin: Some("https://linkedin.com".to_string()),
                    twitter: None,
                    email: Some("mai@pulseroute.com".to_string()),
                    website: None,
                    portfolio: None,
                },
                custom_fields: json!({ "github_username": "mai", "badge": "Security & Defense" }),
                display_order: 4,
                is_active: true,
                is_featured: true,
                created_at: Utc::now(),
                updated_at: Utc::now(),
            },
            TeamMember {
                id: Uuid::parse_str("55555555-5555-5555-5555-555555555555").unwrap(),
                name_ar: "علي يسر".to_string(),
                name_en: "Aly Yoser".to_string(),
                role_ar: "مهندس أنظمة مدمجة وعتاد".to_string(),
                role_en: "Embedded Systems & Hardware Engineer".to_string(),
                age: Some(18),
                bio_ar: Some("ربط العالم الرقمي بالعالم الفيزيائي من خلال الدوائر الإلكترونية والأنظمة المدمجة الذكية.".to_string()),
                bio_en: Some("Designing smart embedded firmware, IoT sensors, and high-reliability circuits.".to_string()),
                avatar_url: "assets/aly_yoser.jpg".to_string(),
                skills: vec![
                    "C/C++".to_string(),
                    "Rust Embedded".to_string(),
                    "IoT".to_string(),
                    "PCB Design".to_string(),
                    "Sensors".to_string(),
                ],
                social_links: SocialLinks {
                    github: Some("https://github.com".to_string()),
                    linkedin: Some("https://linkedin.com".to_string()),
                    twitter: None,
                    email: Some("aly@pulseroute.com".to_string()),
                    website: None,
                    portfolio: None,
                },
                custom_fields: json!({ "github_username": "aly", "badge": "Hardware & IoT" }),
                display_order: 5,
                is_active: true,
                is_featured: true,
                created_at: Utc::now(),
                updated_at: Utc::now(),
            },
        ];

        Self {
            client,
            config,
            local_cache: Arc::new(RwLock::new(initial_members)),
        }
    }

    /// Retrieve all team members (optionally filtered by active status)
    pub async fn find_all(&self, active_only: bool) -> AppResult<Vec<TeamMember>> {
        if self.config.has_real_supabase() {
            let mut url = format!("{}/rest/v1/team_members?select=*&order=display_order.asc,created_at.desc", self.config.supabase_url);
            if active_only {
                url.push_str("&is_active=eq.true");
            }

            let response = self
                .client
                .get(&url)
                .header("Authorization", format!("Bearer {}", self.config.supabase_anon_key))
                .send()
                .await
                .map_err(|e| AppError::DatabaseError(e.to_string()))?;

            if response.status().is_success() {
                let members: Vec<TeamMember> = response
                    .json()
                    .await
                    .map_err(|e| AppError::DatabaseError(format!("Deserialization error: {}", e)))?;
                return Ok(members);
            }
        }

        // Return from local cache if Supabase is offline or not configured
        let cache = self.local_cache.read().await;
        let mut result: Vec<TeamMember> = cache
            .iter()
            .filter(|m| !active_only || m.is_active)
            .cloned()
            .collect();
        result.sort_by_key(|m| m.display_order);
        Ok(result)
    }

    /// Retrieve a single member by UUID
    pub async fn find_by_id(&self, id: Uuid) -> AppResult<TeamMember> {
        if self.config.has_real_supabase() {
            let url = format!("{}/rest/v1/team_members?id=eq.{}&select=*&limit=1", self.config.supabase_url, id);
            let response = self
                .client
                .get(&url)
                .header("Authorization", format!("Bearer {}", self.config.supabase_anon_key))
                .send()
                .await
                .map_err(|e| AppError::DatabaseError(e.to_string()))?;

            if response.status().is_success() {
                let members: Vec<TeamMember> = response
                    .json()
                    .await
                    .map_err(|e| AppError::DatabaseError(e.to_string()))?;

                if let Some(member) = members.into_iter().next() {
                    return Ok(member);
                }
            }
        }

        let cache = self.local_cache.read().await;
        cache
            .iter()
            .find(|m| m.id == id)
            .cloned()
            .ok_or_else(|| AppError::NotFound(format!("Team member with id {} not found", id)))
    }

    /// Create a new team member
    pub async fn create(&self, member: TeamMember) -> AppResult<TeamMember> {
        if self.config.has_real_supabase() {
            let url = format!("{}/rest/v1/team_members", self.config.supabase_url);
            let response = self
                .client
                .post(&url)
                .header("Authorization", format!("Bearer {}", self.config.supabase_service_role_key))
                .json(&member)
                .send()
                .await
                .map_err(|e| AppError::DatabaseError(e.to_string()))?;

            if response.status().is_success() {
                let created_members: Vec<TeamMember> = response
                    .json()
                    .await
                    .map_err(|e| AppError::DatabaseError(e.to_string()))?;

                if let Some(created) = created_members.into_iter().next() {
                    let mut cache = self.local_cache.write().await;
                    cache.push(created.clone());
                    return Ok(created);
                }
            }
        }

        let mut cache = self.local_cache.write().await;
        cache.push(member.clone());
        Ok(member)
    }

    /// Update an existing member
    pub async fn update(&self, member: TeamMember) -> AppResult<TeamMember> {
        if self.config.has_real_supabase() {
            let url = format!("{}/rest/v1/team_members?id=eq.{}", self.config.supabase_url, member.id);
            let response = self
                .client
                .patch(&url)
                .header("Authorization", format!("Bearer {}", self.config.supabase_service_role_key))
                .json(&member)
                .send()
                .await
                .map_err(|e| AppError::DatabaseError(e.to_string()))?;

            if response.status().is_success() {
                let updated_members: Vec<TeamMember> = response
                    .json()
                    .await
                    .map_err(|e| AppError::DatabaseError(e.to_string()))?;

                if let Some(updated) = updated_members.into_iter().next() {
                    let mut cache = self.local_cache.write().await;
                    if let Some(pos) = cache.iter().position(|m| m.id == member.id) {
                        cache[pos] = updated.clone();
                    }
                    return Ok(updated);
                }
            }
        }

        let mut cache = self.local_cache.write().await;
        if let Some(pos) = cache.iter().position(|m| m.id == member.id) {
            cache[pos] = member.clone();
            Ok(member)
        } else {
            Err(AppError::NotFound(format!("Team member with id {} not found", member.id)))
        }
    }

    /// Delete a member by UUID
    pub async fn delete(&self, id: Uuid) -> AppResult<()> {
        if self.config.has_real_supabase() {
            let url = format!("{}/rest/v1/team_members?id=eq.{}", self.config.supabase_url, id);
            let response = self
                .client
                .delete(&url)
                .header("Authorization", format!("Bearer {}", self.config.supabase_service_role_key))
                .send()
                .await
                .map_err(|e| AppError::DatabaseError(e.to_string()))?;

            if !response.status().is_success() {
                return Err(AppError::DatabaseError(format!("Supabase delete failed with status {}", response.status())));
            }
        }

        let mut cache = self.local_cache.write().await;
        if let Some(pos) = cache.iter().position(|m| m.id == id) {
            cache.remove(pos);
            Ok(())
        } else {
            Err(AppError::NotFound(format!("Team member with id {} not found", id)))
        }
    }

    /// Upload an image to Supabase Storage Bucket 'avatars'
    pub async fn upload_avatar(&self, filename: &str, file_bytes: Vec<u8>, content_type: &str) -> AppResult<String> {
        if self.config.has_real_supabase() {
            let storage_url = format!("{}/storage/v1/object/avatars/{}", self.config.supabase_url, filename);
            let response = self
                .client
                .post(&storage_url)
                .header("Authorization", format!("Bearer {}", self.config.supabase_service_role_key))
                .header("Content-Type", content_type)
                .header("x-upsert", "true")
                .body(file_bytes)
                .send()
                .await
                .map_err(|e| AppError::StorageError(e.to_string()))?;

            if response.status().is_success() {
                let public_url = format!("{}/storage/v1/object/public/avatars/{}", self.config.supabase_url, filename);
                return Ok(public_url);
            }
        }

        // Fallback: return relative upload path for local static serving
        Ok(format!("uploads/{}", filename))
    }
}
