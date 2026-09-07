-- ==============================================================================
-- PulseRoute Team Management - Supabase Schema & Initial Migration
-- ==============================================================================
-- This SQL script creates the team_members table, security policies (RLS), 
-- indexes, storage bucket policies, and seeds initial team data.
-- Run this in your Supabase SQL Editor: https://supabase.com/dashboard/project/_/sql
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create the team_members table
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

-- 3. Indexes for fast retrieval and ordering
CREATE INDEX IF NOT EXISTS idx_team_members_active_order 
    ON public.team_members (is_active, display_order ASC, created_at DESC);

-- 4. Auto-update `updated_at` timestamp trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_team_members_updated_at ON public.team_members;
CREATE TRIGGER trg_team_members_updated_at
BEFORE UPDATE ON public.team_members
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- 5. Row Level Security (RLS) Configuration
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

-- Allow anyone (public/anon) to read active team members
DROP POLICY IF EXISTS "Public can view active team members" ON public.team_members;
CREATE POLICY "Public can view active team members"
    ON public.team_members
    FOR SELECT
    USING (is_active = true);

-- Allow full access for service_role / authenticated admin users
DROP POLICY IF EXISTS "Full access for service role and authenticated users" ON public.team_members;
CREATE POLICY "Full access for service role and authenticated users"
    ON public.team_members
    FOR ALL
    USING (auth.role() = 'authenticated' OR auth.role() = 'service_role')
    WITH CHECK (auth.role() = 'authenticated' OR auth.role() = 'service_role');

-- 6. Seed initial PulseRoute team members
INSERT INTO public.team_members (
    name_en, name_ar, 
    role_en, role_ar, 
    age, 
    avatar_url, 
    skills, 
    social_links, 
    display_order, 
    is_active, 
    is_featured
)
VALUES
(
    'Mazen Ahmed',
    'مازن أحمد',
    'Full-Stack Developer',
    'مطور ويب وتطبيقات شامل',
    17,
    'assets/mazen_ahmed.jpg',
    '["Rust", "React", "Node.js", "TypeScript", "Tailwind CSS", "Architecture"]'::jsonb,
    '{"github": "https://github.com", "linkedin": "https://linkedin.com", "email": "mazen@pulseroute.com"}'::jsonb,
    1,
    TRUE,
    TRUE
),
(
    'Yassen Sabry Elawamy',
    'ياسين صبري العوامي',
    'Back-End Developer',
    'مطور أنظمة وخدمات خلفية',
    18,
    'assets/yassen_sabry.jpg',
    '["Rust", "PostgreSQL", "Supabase", "Docker", "Microservices", "REST APIs"]'::jsonb,
    '{"github": "https://github.com", "linkedin": "https://linkedin.com", "email": "yassen@pulseroute.com"}'::jsonb,
    2,
    TRUE,
    TRUE
),
(
    'Ahmed Helmy El-Etr',
    'أحمد حلمي العتر',
    'AI Developer & Machine Learning Engineer',
    'مهندس ذكاء اصطناعي وتعلم آلة',
    17,
    'assets/ahmed_helmy.jpg',
    '["Python", "PyTorch", "TensorFlow", "Computer Vision", "LLMs", "Data Science"]'::jsonb,
    '{"github": "https://github.com", "linkedin": "https://linkedin.com", "email": "ahmed@pulseroute.com"}'::jsonb,
    3,
    TRUE,
    TRUE
),
(
    'Mai Magdy Mahmoud',
    'مي مجدي محمود',
    'Cybersecurity & Penetration Testing Engineer',
    'مهندسة أمن سيبراني واختبار اختراق',
    21,
    'assets/mai_ibrahim.jpg',
    '["Penetration Testing & Vulnerability Assessment", "Zero-Trust Network Architecture", "Encrypted Protocols & System Hardening", "Infrastructure Security & Threat Defense"]'::jsonb,
    '{"github": "https://github.com", "linkedin": "https://linkedin.com", "email": "mai@pulseroute.com"}'::jsonb,
    4,
    TRUE,
    TRUE
),
(
    'Aly Yoser',
    'علي يسر',
    'Embedded Systems & Hardware Engineer',
    'مهندس أنظمة مدمجة وعتاد',
    18,
    'assets/aly_yoser.jpg',
    '["C/C++", "Rust Embedded", "IoT", "PCB Design", "Sensors", "Firmware"]'::jsonb,
    '{"github": "https://github.com", "linkedin": "https://linkedin.com", "email": "aly@pulseroute.com"}'::jsonb,
    5,
    TRUE,
    TRUE
)
ON CONFLICT (id) DO NOTHING;

-- 7. Supabase Storage Bucket Setup for Avatars (Run if you use Supabase Storage)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to avatar files
DROP POLICY IF EXISTS "Public can view avatars" ON storage.objects;
CREATE POLICY "Public can view avatars"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'avatars');

-- Allow authenticated/service role to upload/update/delete avatars
DROP POLICY IF EXISTS "Admins can upload avatars" ON storage.objects;
CREATE POLICY "Admins can upload avatars"
    ON storage.objects FOR ALL
    USING (bucket_id = 'avatars' AND (auth.role() = 'authenticated' OR auth.role() = 'service_role'))
    WITH CHECK (bucket_id = 'avatars' AND (auth.role() = 'authenticated' OR auth.role() = 'service_role'));
