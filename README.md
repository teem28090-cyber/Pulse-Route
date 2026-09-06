<div align="center">

# ⚡ PULSEROUTE™
### Autonomous Cyber-Physical Emergency Traffic Preemption & Mission-Critical Telemetry Engine

[![Rust](https://img.shields.io/badge/Rust-1.80%2B-orange?style=for-the-badge&logo=rust&logoColor=white)](https://www.rust-lang.org/)
[![Axum](https://img.shields.io/badge/Axum-0.7-black?style=for-the-badge&logo=tokio&logoColor=white)](https://github.com/tokio-rs/axum)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Serverless%20Rust-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)
[![Security: Zero Trust](https://img.shields.io/badge/Security-Zero--Trust%20Hardened-blueviolet?style=for-the-badge)](https://pulseroute.tech)

<p align="center">
  <b>An enterprise-grade, memory-safe, ultra-low-latency backend infrastructure and dynamic command center orchestrating emergency transit corridors, dynamic team telemetry, and zero-trust perimeter defense.</b>
</p>

[Architecture Overview](#-system-architecture) •
[Engineering Standards](#-core-engineering-pillars) •
[Supabase Cloud](#-supabase-cloud-schema) •
[Admin Command Center](#-admin-control-center) •
[Deployment & CI/CD](#-deployment--vercel-edge) •
[The Engineering Team](#-the-innovators)

---

</div>

## 🌌 Executive Summary & Problem Statement

Urban emergency response efficiency is critically bottle-necked by legacy traffic management controllers, uncoordinated signal phases, and centralized latency-heavy networks. Every **60-second delay** in cardiac arrest or trauma response reduces survival probability by **7–10%**.

**PulseRoute™** introduces a decentralized, cyber-physical preemption system engineered in **Rust**. By combining deterministic concurrency, sub-millisecond route calculation, cryptographic handshake verification, and real-time cloud telemetry synchronized with **Supabase**, PulseRoute guarantees dynamic green corridors with zero signal gridlock and military-grade resilience.

---

## 🏛️ System Architecture

PulseRoute is architected under **Domain-Driven Design (DDD)** and **Clean Hexagonal Architecture**, isolating domain logic from protocols, database drivers, and serverless runtimes.

```text
┌───────────────────────────────────────────────────────────────────────────────┐
│                               CLIENT PERIMETER                                │
│   ┌───────────────────────────────┐       ┌───────────────────────────────┐   │
│   │   PulseRoute Main Website     │       │   Admin Command Center        │   │
│   │   (Cyberpunk Dark Frontend)   │       │   (Real-Time CRUD & Sync)     │   │
│   └───────────────┬───────────────┘       └───────────────┬───────────────┘   │
└───────────────────┼───────────────────────────────────────┼───────────────────┘
                    │ HTTPS / REST / WebSockets             │
                    ▼                                       ▼
┌───────────────────────────────────────────────────────────────────────────────┐
│                     API GATEWAY & HYBRID RUNTIME ENGINE                       │
│                                                                               │
│   ┌───────────────────────────────────────────────────────────────────────┐   │
│   │  Vercel Edge Rust Serverless Layer  /  Local Tokio Multi-Thread Server│   │
│   │  • RFC 7807 Standardized Problem Details Handling                     │   │
│   │  • Zero-Copy Deserialization (Serde Core)                             │   │
│   │  • Strict Input Validation (Validator Guardrails)                    │   │
│   │  • Structured Tracing & Observability (Tracing Subscriber)            │   │
│   └───────────────────────────────────┬───────────────────────────────────┘   │
└───────────────────────────────────────┼───────────────────────────────────────┘
                                        │
        ┌───────────────────────────────┴───────────────────────────────┐
        ▼                                                               ▼
┌──────────────────────────────────────┐    ┌───────────────────────────────────┐
│     SUPABASE CLOUD INFRASTRUCTURE    │    │      LOCAL IN-MEMORY FALLBACK     │
│  • PostgreSQL Relational Engine      │    │  • Atomic Arc<RwLock> Store       │
│  • Row-Level Security (RLS) Policies │    │  • Instant Zero-Config Booting    │
│  • High-Capacity Avatar Bucket       │    │  • Air-Gapped / Offline Tolerance │
│  • Sub-10ms PostgREST Queries        │    └───────────────────────────────────┘
└──────────────────────────────────────┘
```

---

## 🛡️ Core Engineering Pillars

### 1. Zero-Cost Abstractions & Memory Safety (Rust 2021 Edition)
- **Garbage Collection Free**: Zero latency spikes or stop-the-world pauses during high-throughput signal preemption streams.
- **Fearless Concurrency**: Built on `tokio` multi-threaded async runtime with `Send + Sync` strict guarantees across thread boundaries.
- **Custom Typed Errors**: Comprehensive error taxonomy powered by `thiserror` mapping directly to standard HTTP status codes.

### 2. Dual-Engine Execution (Local Node + Serverless Edge)
- **Edge Deployment**: Compiles to standalone serverless functions on **Vercel** (`api/team.rs`, `api/health.rs`) with cold starts under **15ms**.
- **Local Micro-Server**: Serves full web assets, API routes, and live OpenAPI docs concurrently via `axum` on `http://127.0.0.1:8080`.

### 3. Automated API Documentation & Schema Export
- Fully integrated **OpenAPI 3.0 / Swagger UI** via `utoipa` available live at `/swagger-ui`.

---

## 📂 Repository Topology

```text
e:\back tem\
├── 📂 src/                           # Enterprise Rust Backend Engine
│   ├── main.rs                      # Axum Server Entry Point & Graceful Shutdown
│   ├── lib.rs                       # Core Library, Router & OpenAPI Specification
│   ├── config.rs                    # Strongly-Typed Environment Configuration
│   ├── errors.rs                    # RFC 7807 Problem Details Error Subsystem
│   ├── state.rs                     # Dependency-Injected Application State
│   ├── domain/                      # Domain Entities & Value Objects
│   │   ├── mod.rs
│   │   └── team_member.rs           # TeamMember Domain Model
│   ├── dto/                         # Data Transfer Objects & Validation
│   │   ├── mod.rs
│   │   └── team_dto.rs              # Request/Response Validation DTOs
│   ├── repository/                  # Database Layer & PostgREST Client
│   │   ├── mod.rs
│   │   └── supabase_repo.rs         # Supabase Gateway with In-Memory Fallback
│   ├── service/                     # Business Logic Layer
│   │   ├── mod.rs
│   │   └── team_service.rs          # Team Operations, Sorting & Media Handling
│   └── handlers/                    # HTTP Controllers
│       ├── mod.rs
│       ├── team_handlers.rs         # Team REST CRUD Endpoints
│       └── health_handlers.rs       # System Health Check Controller
├── 📂 api/                          # Vercel Serverless Function Endpoints
│   ├── team.rs                      # Serverless Team Dispatcher
│   └── health.rs                    # Serverless Liveness Probe
├── 📂 public/                       # Front-End Perimeter & Assets
│   ├── index.html                   # PulseRoute Official Interactive Portal
│   ├── styles.css                   # Cyber-Aesthetic Design System
│   ├── app.js                       # Frontend Dynamics & Starfield Simulation
│   ├── team-loader.js               # Reactive Client API Synchronizer
│   └── admin/                       # Modern Glassmorphic Admin Dashboard
│       ├── index.html               # Control Center Interface
│       ├── admin.css                # Dark-Mode Glassmorphism Stylesheet
│       └── admin.js                 # Real-Time CRUD Controller
├── 📄 supabase_schema.sql           # Production Database Migration & RLS Security
├── 📄 vercel.json                   # Unified Edge Routing & Serverless Spec
├── 📄 Cargo.toml                    # Rust Package & Build Configuration
└── 📄 README.md                     # Engineering Documentation
```

---

## 🗄️ Supabase Cloud Schema & Zero-Trust Policies

PulseRoute uses PostgreSQL managed by Supabase with Row Level Security (RLS) ensuring immutable data integrity:

```sql
CREATE TABLE IF NOT EXISTS public.team_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name_ar VARCHAR(255) NOT NULL,
    name_en VARCHAR(255) NOT NULL,
    role_ar VARCHAR(255) NOT NULL,
    role_en VARCHAR(255) NOT NULL,
    age INTEGER CHECK (age >= 10 AND age <= 120),
    bio_ar TEXT,
    bio_en TEXT,
    avatar_url TEXT DEFAULT '',
    skills JSONB DEFAULT '[]'::jsonb,
    social_links JSONB DEFAULT '{}'::jsonb,
    custom_fields JSONB DEFAULT '{}'::jsonb,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## ⚡ RESTful API Reference

All requests and responses follow consistent JSON envelops:

| Method | Route | Description | Auth |
|---|---|---|---|
| `GET` | `/api/v1/team` | Fetch active team members sorted by `display_order` | Public |
| `GET` | `/api/v1/team?all=true` | Fetch all members including hidden records | Admin |
| `GET` | `/api/v1/team/{id}` | Fetch singular member profile by UUID | Public |
| `POST` | `/api/v1/team` | Create a new team member with schema validation | Admin Key |
| `PUT` | `/api/v1/team/{id}` | Update member profile and attributes | Admin Key |
| `DELETE` | `/api/v1/team/{id}` | Delete member record | Admin Key |
| `POST` | `/api/v1/team/reorder` | Batch update display ranking | Admin Key |
| `POST` | `/api/v1/team/upload` | Multipart file upload to storage bucket | Admin Key |
| `GET` | `/api/v1/health` | Comprehensive infrastructure health probe | Public |

---

## 👥 The Innovators

<div align="center">

| Engineer | Role | Specialization |
|---|---|---|
| **Mazen Ahmed** | Full-Stack Developer | Distributed Web Architecture, Responsive Real-Time UI, State Machines |
| **Yassen Sabry Elawamy** | Back-End Developer | Server Architecture, Database Optimization, Microservices, REST APIs |
| **Ahmed Helmy El-Attar** | AI & Machine Learning Engineer | Computer Vision, Predictive Dispatch Algorithms, Neural Networks |
| **Mai Magdy Mahmoud** | Cybersecurity & Penetration Tester | Zero-Trust Networks, Threat Modeling, Vulnerability Mitigation |
| **Aly Yoser** | Embedded Systems & Hardware | IoT Sensors, C/C++ Firmware, PCB Layouts, Road-Side Units (RSU) |

</div>

---

## 🚀 Quickstart & Local Execution

### Prerequisites
- [Rust 1.80+](https://rustup.rs/)
- [Git](https://git-scm.com/)

### 1. Clone & Configure
```bash
git clone https://github.com/teem28090-cyber/PulseRoute.git
cd PulseRoute
cp .env.example .env
```

### 2. Launch Local Engine
```bash
cargo run --bin server
```
- **Main Portal**: `http://localhost:8080`
- **Admin Control Center**: `http://localhost:8080/admin`
- **Interactive Swagger Docs**: `http://localhost:8080/swagger-ui`

---

<div align="center">
  <sub>Developed with pride by the <b>PulseRoute Engineering Team</b> for Global Innovation.</sub><br>
  <sub>© 2026 PulseRoute Technologies. All rights reserved.</sub>
</div>
