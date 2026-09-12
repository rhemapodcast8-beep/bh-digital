-- ==================================================
-- 01 — EXTENSIONS
-- ==================================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==================================================
-- 02 — TABLES
-- ==================================================

-- 1. categories
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. profiles
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    avatar_url TEXT,
    role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. subscriptions
CREATE TABLE IF NOT EXISTS public.subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    external_id TEXT,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'canceled', 'expired', 'past_due')),
    plan TEXT NOT NULL DEFAULT 'premium',
    start_date TIMESTAMPTZ DEFAULT NOW(),
    end_date TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT valid_subscription_dates CHECK (end_date IS NULL OR end_date >= start_date)
);

-- 4. media_contents
CREATE TABLE IF NOT EXISTS public.media_contents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    platform TEXT NOT NULL CHECK (platform IN ('youtube', 'tiktok', 'kwai')),
    video_id TEXT NOT NULL,
    published_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. user_actions
CREATE TABLE IF NOT EXISTS public.user_actions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    action_type TEXT NOT NULL CHECK (action_type IN ('bookmark', 'like', 'complete')),
    content_type TEXT NOT NULL,
    content_id UUID NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, action_type, content_type, content_id)
);

-- 6. studies
CREATE TABLE IF NOT EXISTS public.studies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT,
    image_url TEXT,
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
    is_premium BOOLEAN NOT NULL DEFAULT FALSE,
    is_official BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. lessons
CREATE TABLE IF NOT EXISTS public.lessons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    audience TEXT NOT NULL CHECK (audience IN ('adultos', 'jovens')),
    year INTEGER NOT NULL,
    quarter INTEGER NOT NULL CHECK (quarter BETWEEN 1 AND 4),
    lesson_number INTEGER NOT NULL CHECK (lesson_number > 0),
    content TEXT,
    image_url TEXT,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
    is_premium BOOLEAN NOT NULL DEFAULT FALSE,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (audience, year, quarter, lesson_number)
);

-- 8. devotionals
CREATE TABLE IF NOT EXISTS public.devotionals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    date_published DATE NOT NULL UNIQUE,
    content TEXT,
    image_url TEXT,
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. resources
CREATE TABLE IF NOT EXISTS public.resources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    type TEXT NOT NULL CHECK (type IN ('livro', 'material', 'pdf')),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    author TEXT,
    cover_image_url TEXT,
    storage_path TEXT,
    external_url TEXT,
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    is_premium BOOLEAN NOT NULL DEFAULT FALSE,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. ai_generations
CREATE TABLE IF NOT EXISTS public.ai_generations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    tool_used TEXT NOT NULL,
    prompt_text TEXT NOT NULL CHECK (char_length(prompt_text) <= 1500),
    result_text TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==================================================
-- 03 — INDEXES
-- ==================================================
CREATE INDEX idx_profiles_role ON public.profiles(role);

CREATE INDEX idx_categories_slug ON public.categories(slug);

CREATE INDEX idx_subscriptions_user_id ON public.subscriptions(user_id);
CREATE INDEX idx_subscriptions_status ON public.subscriptions(status);
CREATE INDEX idx_subscriptions_end_date ON public.subscriptions(end_date);

CREATE INDEX idx_studies_user_id ON public.studies(user_id);
CREATE INDEX idx_studies_slug ON public.studies(slug);
CREATE INDEX idx_studies_category_id ON public.studies(category_id);
CREATE INDEX idx_studies_status ON public.studies(status);
CREATE INDEX idx_studies_is_premium ON public.studies(is_premium);

CREATE INDEX idx_lessons_slug ON public.lessons(slug);
CREATE INDEX idx_lessons_calendar ON public.lessons(year, quarter, audience);
CREATE INDEX idx_lessons_status ON public.lessons(status);
CREATE INDEX idx_lessons_is_premium ON public.lessons(is_premium);

CREATE INDEX idx_devotionals_date_published ON public.devotionals(date_published);
CREATE INDEX idx_devotionals_slug ON public.devotionals(slug);
CREATE INDEX idx_devotionals_category_id ON public.devotionals(category_id);
CREATE INDEX idx_devotionals_status ON public.devotionals(status);

CREATE INDEX idx_resources_slug ON public.resources(slug);
CREATE INDEX idx_resources_category_id ON public.resources(category_id);
CREATE INDEX idx_resources_status ON public.resources(status);
CREATE INDEX idx_resources_is_premium ON public.resources(is_premium);

CREATE INDEX idx_media_contents_platform ON public.media_contents(platform);
CREATE INDEX idx_media_contents_published_at ON public.media_contents(published_at);

CREATE INDEX idx_user_actions_lookup ON public.user_actions(user_id, content_type, content_id);

CREATE INDEX idx_ai_generations_user_id ON public.ai_generations(user_id);
CREATE INDEX idx_ai_generations_created_at ON public.ai_generations(created_at);

-- ==================================================
-- 04 — FUNCTIONS AND TRIGGERS
-- ==================================================

-- Function to set updated_at
CREATE OR REPLACE FUNCTION public.set_current_timestamp_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Triggers for updated_at
CREATE TRIGGER set_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
CREATE TRIGGER set_categories_updated_at BEFORE UPDATE ON public.categories FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
CREATE TRIGGER set_subscriptions_updated_at BEFORE UPDATE ON public.subscriptions FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
CREATE TRIGGER set_media_contents_updated_at BEFORE UPDATE ON public.media_contents FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
CREATE TRIGGER set_user_actions_updated_at BEFORE UPDATE ON public.user_actions FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
CREATE TRIGGER set_studies_updated_at BEFORE UPDATE ON public.studies FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
CREATE TRIGGER set_lessons_updated_at BEFORE UPDATE ON public.lessons FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
CREATE TRIGGER set_devotionals_updated_at BEFORE UPDATE ON public.devotionals FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
CREATE TRIGGER set_resources_updated_at BEFORE UPDATE ON public.resources FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();

-- is_admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
DECLARE
    user_role TEXT;
BEGIN
    SELECT role INTO user_role FROM public.profiles WHERE id = auth.uid();
    RETURN COALESCE(user_role = 'admin', FALSE);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- is_premium
CREATE OR REPLACE FUNCTION public.is_premium()
RETURNS BOOLEAN AS $$
DECLARE
    has_premium BOOLEAN;
BEGIN
    SELECT EXISTS (
        SELECT 1 FROM public.subscriptions
        WHERE user_id = auth.uid()
          AND status = 'active'
          AND plan = 'premium'
          AND (end_date IS NULL OR end_date > NOW())
    ) INTO has_premium;
    RETURN has_premium;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- handle_new_user
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, avatar_url, role)
    VALUES (
        NEW.id,
        NEW.raw_user_meta_data->>'full_name',
        NEW.raw_user_meta_data->>'avatar_url',
        'user'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- prevent_profile_role_update
CREATE OR REPLACE FUNCTION public.prevent_profile_role_update()
RETURNS TRIGGER AS $$
BEGIN
    IF NOT public.is_admin() THEN
        IF NEW.role IS DISTINCT FROM OLD.role THEN
            RAISE EXCEPTION 'Usuários comuns não podem alterar o campo role.';
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER enforce_profile_role_protection
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.prevent_profile_role_update();

-- prevent_study_official_escalation
CREATE OR REPLACE FUNCTION public.prevent_study_official_escalation()
RETURNS TRIGGER AS $$
BEGIN
    IF NOT public.is_admin() THEN
        IF NEW.is_official = TRUE THEN
            RAISE EXCEPTION 'Usuários comuns não podem criar ou transformar estudos em oficiais.';
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER enforce_study_official_protection
BEFORE INSERT OR UPDATE ON public.studies
FOR EACH ROW
EXECUTE FUNCTION public.prevent_study_official_escalation();

-- ==================================================
-- 05 — RLS
-- ==================================================

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_contents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.devotionals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_generations ENABLE ROW LEVEL SECURITY;

-- CATEGORIES
CREATE POLICY "Categories: Leitura pública" ON public.categories FOR SELECT USING (TRUE);
CREATE POLICY "Categories: Admin gerencia" ON public.categories FOR ALL USING (public.is_admin());

-- PROFILES
CREATE POLICY "Profiles: Usuário vê seu perfil" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Profiles: Admin vê todos" ON public.profiles FOR SELECT USING (public.is_admin());
CREATE POLICY "Profiles: Usuário atualiza seu perfil" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Profiles: Admin atualiza todos" ON public.profiles FOR UPDATE USING (public.is_admin());

-- SUBSCRIPTIONS
CREATE POLICY "Subscriptions: Usuário vê as suas" ON public.subscriptions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Subscriptions: Admin gerencia todas" ON public.subscriptions FOR ALL USING (public.is_admin());

-- MEDIA_CONTENTS
CREATE POLICY "Media: Leitura pública" ON public.media_contents FOR SELECT USING (TRUE);
CREATE POLICY "Media: Admin gerencia" ON public.media_contents FOR ALL USING (public.is_admin());

-- USER_ACTIONS
CREATE POLICY "User_actions: Usuário gerencia as suas" ON public.user_actions FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "User_actions: Admin gerencia todas" ON public.user_actions FOR ALL USING (public.is_admin());

-- STUDIES
CREATE POLICY "Studies: Públicos gratuitos oficiais" ON public.studies FOR SELECT USING (status = 'published' AND is_official = TRUE AND is_premium = FALSE);
CREATE POLICY "Studies: Premium oficiais" ON public.studies FOR SELECT USING (status = 'published' AND is_official = TRUE AND is_premium = TRUE AND (public.is_premium() OR public.is_admin()));
CREATE POLICY "Studies: Usuário gerencia pessoais" ON public.studies FOR ALL USING (auth.uid() = user_id AND is_official = FALSE);
CREATE POLICY "Studies: Admin gerencia todos" ON public.studies FOR ALL USING (public.is_admin());

-- LESSONS
CREATE POLICY "Lessons: Leitura gratuita" ON public.lessons FOR SELECT USING (status = 'published' AND is_premium = FALSE);
CREATE POLICY "Lessons: Leitura premium" ON public.lessons FOR SELECT USING (status = 'published' AND is_premium = TRUE AND (public.is_premium() OR public.is_admin()));
CREATE POLICY "Lessons: Admin gerencia" ON public.lessons FOR ALL USING (public.is_admin());

-- DEVOTIONALS
CREATE POLICY "Devotionals: Públicos" ON public.devotionals FOR SELECT USING (status = 'published');
CREATE POLICY "Devotionals: Admin gerencia" ON public.devotionals FOR ALL USING (public.is_admin());

-- RESOURCES
CREATE POLICY "Resources: Leitura gratuita" ON public.resources FOR SELECT USING (status = 'published' AND is_premium = FALSE);
CREATE POLICY "Resources: Leitura premium" ON public.resources FOR SELECT USING (status = 'published' AND is_premium = TRUE AND (public.is_premium() OR public.is_admin()));
CREATE POLICY "Resources: Admin gerencia" ON public.resources FOR ALL USING (public.is_admin());

-- AI_GENERATIONS
CREATE POLICY "AI: Usuário vê os seus" ON public.ai_generations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "AI: Usuário insere os seus" ON public.ai_generations FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "AI: Usuário deleta os seus" ON public.ai_generations FOR DELETE USING (auth.uid() = user_id);

-- ==================================================
-- 06 — STORAGE
-- ==================================================

INSERT INTO storage.buckets (id, name, public) VALUES ('public-assets', 'public-assets', true) ON CONFLICT (id) DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('protected-materials', 'protected-materials', false) ON CONFLICT (id) DO NOTHING;

-- PUBLIC-ASSETS
CREATE POLICY "Public Assets: Leitura pública" ON storage.objects FOR SELECT USING (bucket_id = 'public-assets');
CREATE POLICY "Public Assets: Usuário upload avatar" ON storage.objects FOR INSERT WITH CHECK (
    bucket_id = 'public-assets' AND
    auth.role() = 'authenticated' AND
    (storage.foldername(name))[1] = 'avatars' AND
    (storage.foldername(name))[2] = auth.uid()::text
);
CREATE POLICY "Public Assets: Usuário update próprio avatar" ON storage.objects FOR UPDATE USING (
    bucket_id = 'public-assets' AND
    auth.role() = 'authenticated' AND
    (storage.foldername(name))[1] = 'avatars' AND
    (storage.foldername(name))[2] = auth.uid()::text
);
CREATE POLICY "Public Assets: Usuário deleta próprio avatar" ON storage.objects FOR DELETE USING (
    bucket_id = 'public-assets' AND
    auth.role() = 'authenticated' AND
    (storage.foldername(name))[1] = 'avatars' AND
    (storage.foldername(name))[2] = auth.uid()::text
);
CREATE POLICY "Public Assets: Admin gerencia" ON storage.objects FOR ALL USING (bucket_id = 'public-assets' AND public.is_admin());

-- PROTECTED-MATERIALS
CREATE POLICY "Protected Materials: Admin gerencia" ON storage.objects FOR ALL USING (bucket_id = 'protected-materials' AND public.is_admin());

-- ==================================================
-- 07 — SEED
-- ==================================================

INSERT INTO public.categories (name, slug) VALUES 
('Parábolas', 'parabolas'),
('Fé', 'fe'),
('Oração', 'oracao'),
('Família', 'familia'),
('Vida Cristã', 'vida-crista'),
('Evangelismo', 'evangelismo'),
('Personagens', 'personagens'),
('Esboços', 'esbocos')
ON CONFLICT (slug) DO NOTHING;

-- ==================================================
-- 08 — VALIDATION
-- ==================================================

SELECT table_name, column_name, data_type 
FROM information_schema.columns 
WHERE table_schema = 'public' 
ORDER BY table_name;

SELECT conname, pg_get_constraintdef(c.oid)
FROM pg_constraint c
JOIN pg_namespace n ON n.oid = c.connamespace
WHERE n.nspname = 'public';

SELECT tablename, indexname, indexdef 
FROM pg_indexes 
WHERE schemaname = 'public';

SELECT proname, prosrc 
FROM pg_proc 
WHERE pronamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'public');

SELECT event_object_table, trigger_name, action_statement 
FROM information_schema.triggers 
WHERE trigger_schema = 'public';

SELECT relname, relrowsecurity 
FROM pg_class 
WHERE relnamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'public') AND relkind = 'r';

SELECT tablename, policyname, permissive, roles, cmd, qual, with_check 
FROM pg_policies 
WHERE schemaname = 'public';

SELECT id, name, public FROM storage.buckets;

SELECT tablename, policyname, cmd, qual, with_check 
FROM pg_policies 
WHERE schemaname = 'storage';
