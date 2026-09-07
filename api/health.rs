use pulseroute_backend::config::AppConfig;
use std::sync::Arc;
use vercel_runtime::{run, Body, Error, Request, Response, StatusCode};

#[tokio::main]
async fn main() -> Result<(), Error> {
    run(handler).await
}

pub async fn handler(_req: Request) -> Result<Response<Body>, Error> {
    let config = Arc::new(AppConfig::from_env());
    let supabase_configured = config.has_real_supabase();

    let health_data = serde_json::json!({
        "status": "healthy",
        "service": "PulseRoute Vercel Serverless Function",
        "version": env!("CARGO_PKG_VERSION"),
        "supabase": {
            "connected": supabase_configured,
            "url": if supabase_configured { &config.supabase_url } else { "supabase_credentials_not_set" }
        },
        "platform": "Vercel Serverless (Rust)",
        "timestamp": chrono::Utc::now().to_rfc3339(),
    });

    let body = serde_json::to_string(&health_data)?;

    let response = Response::builder()
        .status(StatusCode::OK)
        .header("Content-Type", "application/json")
        .header("Access-Control-Allow-Origin", "*")
        .body(Body::Text(body))?;

    Ok(response)
}
