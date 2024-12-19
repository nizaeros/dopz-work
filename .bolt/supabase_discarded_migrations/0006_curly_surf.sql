/*
  # Users Table Setup

  1. New Tables
    - `users` table with fields:
      - user_id (uuid, primary key)
      - auth_id (uuid, unique)
      - email (text, unique)
      - first_name (text)
      - last_name (text)
      - role_id (uuid, foreign key)
      - role_type_name (text, foreign key)
      - client_id (uuid, optional)
      - profile_image_url (text, optional)
      - created_at (timestamptz)
      - updated_at (timestamptz)

  2. Indexes
    - auth_id
    - email
    - role_type_name

  3. Security
    - Enable RLS
    - Internal users get full access
    - All users can view their own profile
*/

-- Create users table with existence check
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'users') THEN
    CREATE TABLE users (
      user_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      auth_id uuid UNIQUE NOT NULL,
      email text UNIQUE NOT NULL,
      first_name text NOT NULL,
      last_name text NOT NULL,
      role_id uuid NOT NULL REFERENCES roles(role_id),
      role_type_name text NOT NULL REFERENCES role_types(role_type_name),
      client_id uuid,
      profile_image_url text,
      created_at timestamptz NOT NULL DEFAULT now(),
      updated_at timestamptz NOT NULL DEFAULT now()
    );
  END IF;
END $$;

-- Create indexes for performance
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_users_auth_id') THEN
    CREATE INDEX idx_users_auth_id ON users(auth_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_users_email') THEN
    CREATE INDEX idx_users_email ON users(email);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_users_role_type') THEN
    CREATE INDEX idx_users_role_type ON users(role_type_name);
  END IF;
END $$;

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "users_internal_full_access" ON users;
DROP POLICY IF EXISTS "users_view_own_profile" ON users;

-- Create policies
CREATE POLICY "users_internal_full_access"
  ON users
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users u
      WHERE u.auth_id = auth.uid()
      AND u.role_type_name = 'internal'
    )
  );

CREATE POLICY "users_view_own_profile"
  ON users
  FOR SELECT
  USING (auth.uid() = auth_id);