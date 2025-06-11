/*
  # Schéma initial pour l'application Hip-Hop

  1. Nouvelles Tables
    - `actors`
      - Stocke les informations sur tous les acteurs du milieu hip-hop
      - Types: rappeur, producteur, réalisateur, beatmaker, etc.
    - `videos`
      - Contient tous les types de vidéos (clips, interviews, documentaires, etc.)
    - `video_actors`
      - Table de liaison entre videos et actors
      - Stocke le rôle de chaque acteur dans une vidéo

  2. Sécurité
    - RLS activé sur toutes les tables
    - Politiques de lecture publique
    - Politiques d'écriture restreintes aux administrateurs
*/

-- Création de l'enum pour les types d'acteurs
CREATE TYPE actor_type AS ENUM (
  'rappeur',
  'producteur',
  'realisateur',
  'beatmaker',
  'media',
  'radio'
);

-- Création de l'enum pour les types de vidéos
CREATE TYPE video_type AS ENUM (
  'clip',
  'interview',
  'documentaire',
  'reportage',
  'short'
);

-- Table des acteurs
CREATE TABLE IF NOT EXISTS actors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  firstname text,
  lastname text,
  nickname text,
  actor_type actor_type NOT NULL,
  birth_date date,
  birth_country text,
  live_country text,
  bio text,
  photo_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Table des vidéos
CREATE TABLE IF NOT EXISTS videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  type video_type NOT NULL,
  url text NOT NULL,
  release_date date,
  description_short text NOT NULL,
  description_long text,
  thumbnail_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Table de liaison video_actors
CREATE TABLE IF NOT EXISTS video_actors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id uuid REFERENCES videos(id) ON DELETE CASCADE,
  actor_id uuid REFERENCES actors(id) ON DELETE CASCADE,
  role text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Activation RLS
ALTER TABLE actors ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE video_actors ENABLE ROW LEVEL SECURITY;

-- Politiques de lecture publique
CREATE POLICY "Lecture publique des acteurs"
  ON actors
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Lecture publique des vidéos"
  ON videos
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Lecture publique des relations video_actors"
  ON video_actors
  FOR SELECT
  TO public
  USING (true);

-- Politiques d'écriture pour les administrateurs
CREATE POLICY "Écriture admin des acteurs"
  ON actors
  FOR ALL
  TO authenticated
  USING (auth.uid() IN (SELECT id FROM auth.users WHERE auth.email() = ANY(ARRAY['admin@example.com'])))
  WITH CHECK (auth.uid() IN (SELECT id FROM auth.users WHERE auth.email() = ANY(ARRAY['admin@example.com'])));

CREATE POLICY "Écriture admin des vidéos"
  ON videos
  FOR ALL
  TO authenticated
  USING (auth.uid() IN (SELECT id FROM auth.users WHERE auth.email() = ANY(ARRAY['admin@example.com'])))
  WITH CHECK (auth.uid() IN (SELECT id FROM auth.users WHERE auth.email() = ANY(ARRAY['admin@example.com'])));

CREATE POLICY "Écriture admin des relations video_actors"
  ON video_actors
  FOR ALL
  TO authenticated
  USING (auth.uid() IN (SELECT id FROM auth.users WHERE auth.email() = ANY(ARRAY['admin@example.com'])))
  WITH CHECK (auth.uid() IN (SELECT id FROM auth.users WHERE auth.email() = ANY(ARRAY['admin@example.com'])));

-- Triggers pour mise à jour automatique des timestamps
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_actors_updated_at
  BEFORE UPDATE ON actors
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_videos_updated_at
  BEFORE UPDATE ON videos
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS actors_actor_type_idx ON actors(actor_type);
CREATE INDEX IF NOT EXISTS videos_type_idx ON videos(type);
CREATE INDEX IF NOT EXISTS video_actors_video_id_idx ON video_actors(video_id);
CREATE INDEX IF NOT EXISTS video_actors_actor_id_idx ON video_actors(actor_id);