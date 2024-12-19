/*
  # Role Types Setup

  1. New Tables
    - role_types
      - role_type_id (uuid, primary key)
      - role_type_name (text, unique, internal/external only)
      - created_at (timestamptz)
      - updated_at (timestamptz)

  2. Initial Data
    - Inserts default role types (internal, external)

  3. Security
    - Enables RLS
    - Internal users get full access
    - All authenticated users can view
*/

-- Create role types table
CREATE TABLE IF NOT EXISTS role_types (
  role_type_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  role_type_name text NOT NULL UNIQUE CHECK (role_type_name IN ('internal', 'external')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Insert default role types
INSERT INTO role_types (role_type_name)
VALUES ('internal'), ('external')
ON CONFLICT (role_type_name) DO NOTHING;

-- Enable RLS
ALTER TABLE role_types ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "role_types_internal_full_access" ON role_types;
DROP POLICY IF EXISTS "role_types_authenticated_select" ON role_types;

-- Create policies
CREATE POLICY "role_types_internal_full_access"
  ON role_types
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.auth_id = auth.uid()
      AND users.role_type_name = 'internal'
    )
  );

CREATE POLICY "role_types_authenticated_select"
  ON role_types
  FOR SELECT
  TO authenticated
  USING (true);