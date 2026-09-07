use pulseroute_backend::config::AppConfig;
use pulseroute_backend::create_router;
use pulseroute_backend::state::AppState;
use std::net::SocketAddr;
use std::path::PathBuf;
use tower_http::services::ServeDir;
use tracing::{info, warn};
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Initialize structured tracing
    tracing_subscriber::registry()
        .with(
            tracing_subscriber::EnvFilter::try_from_default_env()
                .unwrap_or_else(|_| "info,pulseroute_backend=debug,tower_http=info".into()),
        )
        .with(tracing_subscriber::fmt::layer())
        .init();

    info!("🚀 Initializing PulseRoute Rust Backend Service...");

    let config = AppConfig::from_env();
    let port = config.port;
    let host = config.host.clone();

    if config.has_real_supabase() {
        info!("🔗 Connected to Supabase Instance at: {}", config.supabase_url);
    } else {
        warn!("⚠️  Using In-Memory/Offline cache (Supabase credentials not configured in .env). Initial team seed active.");
    }

    let state = AppState::new(config);
    let app_router = create_router(state);

    // Serve public frontend and admin files if the directory exists
    let public_dir = PathBuf::from("public");
    let router = if public_dir.exists() {
        info!("📁 Serving static web & admin assets from: ./public");
        app_router.fallback_service(ServeDir::new(public_dir))
    } else {
        app_router
    };

    let addr: SocketAddr = format!("{}:{}", host, port).parse()?;
    info!("⚡ Server is listening on http://{}", addr);
    info!("📖 Swagger OpenAPI Docs: http://{}/swagger-ui", addr);
    info!("🛠️  Admin Dashboard: http://{}/admin", addr);

    let listener = tokio::net::TcpListener::bind(addr).await?;

    axum::serve(listener, router)
        .with_graceful_shutdown(shutdown_signal())
        .await?;

    info!("👋 PulseRoute Backend shut down cleanly.");
    Ok(())
}

async fn shutdown_signal() {
    let ctrl_c = async {
        tokio::signal::ctrl_c()
            .await
            .expect("Failed to install Ctrl+C signal handler");
    };

    #[cfg(unix)]
    let terminate = async {
        tokio::signal::unix::signal(tokio::signal::unix::SignalKind::terminate())
            .expect("Failed to install signal handler")
            .recv()
            .await;
    };

    #[cfg(not(unix))]
    let terminate = std::future::pending::<()>();

    tokio::select! {
        _ = ctrl_c => info!("🛑 Received Ctrl+C, initiating graceful shutdown..."),
        _ = terminate => info!("🛑 Received SIGTERM, initiating graceful shutdown..."),
    }
}
