use crate::config::AppConfig;
use crate::repository::SupabaseRepository;
use crate::service::TeamService;
use std::sync::Arc;

#[derive(Clone)]
pub struct AppState {
    pub config: Arc<AppConfig>,
    pub team_service: Arc<TeamService>,
}

impl AppState {
    pub fn new(config: AppConfig) -> Self {
        let config_arc = Arc::new(config);
        let repo = SupabaseRepository::new(config_arc.clone());
        let team_service = Arc::new(TeamService::new(repo));

        Self {
            config: config_arc,
            team_service,
        }
    }
}
