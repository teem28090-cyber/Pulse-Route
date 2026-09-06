use std::env;

#[derive(Debug, Clone)]
pub struct AppConfig {
    pub host: String,
    pub port: u16,
    pub supabase_url: String,
    pub supabase_anon_key: String,
    pub supabase_service_role_key: String,
    pub admin_api_key: String,
    pub cors_allowed_origins: Vec<String>,
}

impl AppConfig {
    pub fn from_env() -> Self {
        dotenvy::dotenv().ok();

        let host = env::var("HOST").unwrap_or_else(|_| "0.0.0.0".to_string());
        let port = env::var("PORT")
            .ok()
            .and_then(|p| p.parse::<u16>().ok())
            .unwrap_or(8080);

        let supabase_url = env::var("SUPABASE_URL")
            .unwrap_or_else(|_| "https://your-project.supabase.co".to_string())
            .trim_end_matches('/')
            .to_string();

        let supabase_anon_key = env::var("SUPABASE_ANON_KEY")
            .unwrap_or_else(|_| "dummy_anon_key".to_string());

        let supabase_service_role_key = env::var("SUPABASE_SERVICE_ROLE_KEY")
            .unwrap_or_else(|_| supabase_anon_key.clone());

        let admin_api_key = env::var("ADMIN_API_KEY")
            .unwrap_or_else(|_| "pulseroute-admin-2026".to_string());

        let cors_raw = env::var("CORS_ALLOWED_ORIGINS").unwrap_or_else(|_| "*".to_string());
        let cors_allowed_origins = cors_raw
            .split(',')
            .map(|s| s.trim().to_string())
            .filter(|s| !s.is_empty())
            .collect();

        Self {
            host,
            port,
            supabase_url,
            supabase_anon_key,
            supabase_service_role_key,
            admin_api_key,
            cors_allowed_origins,
        }
    }

    /// Check whether real Supabase credentials have been configured
    pub fn has_real_supabase(&self) -> bool {
        !self.supabase_url.contains("your-project") 
            && !self.supabase_anon_key.contains("dummy")
            && self.supabase_url.starts_with("https://")
    }
}
