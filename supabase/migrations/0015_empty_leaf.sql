/*
  # Fix Input Code Generation

  1. Changes
    - Create input_code_seq sequence if it doesn't exist
    - Reset sequence to start fresh
    - Update input code generation function with proper error handling
    - Add necessary indexes for performance
    - Update storage policies for document uploads

  2. Security
    - Enable RLS for client_inputs table
    - Add appropriate policies for access control
*/

-- First, ensure the sequence exists and reset it
DO $$ 
BEGIN
  -- Create sequence if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM pg_sequences WHERE schemaname = 'public' AND sequencename = 'input_code_seq') THEN
    CREATE SEQUENCE input_code_seq START WITH 1;
  END IF;
  
  -- Reset sequence
  ALTER SEQUENCE input_code_seq RESTART WITH 1;
END $$;

-- Update the input code generation function with better error handling
CREATE OR REPLACE FUNCTION generate_input_code()
RETURNS TRIGGER AS $$
DECLARE
  new_code TEXT;
  attempts INTEGER := 0;
  max_attempts CONSTANT INTEGER := 3;
BEGIN
  -- Ensure we have a valid sequence
  IF NOT EXISTS (SELECT 1 FROM pg_sequences WHERE schemaname = 'public' AND sequencename = 'input_code_seq') THEN
    RAISE EXCEPTION 'input_code_seq sequence does not exist';
  END IF;

  WHILE attempts < max_attempts LOOP
    -- Lock the sequence to prevent concurrent access
    PERFORM pg_advisory_xact_lock(hashtext('input_code_seq'));
    
    -- Generate new code with better padding
    new_code := 'D' || LPAD(nextval('input_code_seq')::text, 6, '0');
    
    -- Check if code already exists
    IF NOT EXISTS (
      SELECT 1 FROM client_inputs WHERE input_code = new_code
    ) THEN
      NEW.input_code := new_code;
      RETURN NEW;
    END IF;
    
    attempts := attempts + 1;
  END LOOP;
  
  RAISE EXCEPTION 'Failed to generate unique input code after % attempts', max_attempts;
END;
$$ LANGUAGE plpgsql;

-- Recreate trigger
DROP TRIGGER IF EXISTS tr_generate_input_code ON client_inputs;
CREATE TRIGGER tr_generate_input_code
  BEFORE INSERT ON client_inputs
  FOR EACH ROW
  EXECUTE FUNCTION generate_input_code();

-- Add performance optimizations
CREATE INDEX IF NOT EXISTS idx_client_inputs_input_code ON client_inputs(input_code);
CREATE INDEX IF NOT EXISTS idx_client_inputs_client_account ON client_inputs(client_account_id);
CREATE INDEX IF NOT EXISTS idx_client_inputs_status ON client_inputs(input_status);

-- Update storage policies for document uploads
DO $$ 
BEGIN
  -- Ensure bucket exists
  INSERT INTO storage.buckets (id, name, public)
  VALUES ('client-documents', 'client-documents', false)
  ON CONFLICT (id) DO NOTHING;

  -- Update storage policies
  DROP POLICY IF EXISTS "Enable upload for authenticated users" ON storage.objects;
  DROP POLICY IF EXISTS "Enable read access for authenticated users" ON storage.objects;

  CREATE POLICY "Enable upload for authenticated users" ON storage.objects
    FOR INSERT 
    WITH CHECK (
      bucket_id = 'client-documents' AND
      auth.role() = 'authenticated' AND
      (storage.foldername(name))[1] = 'inputs'
    );

  CREATE POLICY "Enable read access for authenticated users" ON storage.objects
    FOR SELECT
    USING (
      bucket_id = 'client-documents' AND
      auth.role() = 'authenticated' AND
      (storage.foldername(name))[1] = 'inputs'
    );
END $$;

-- Enable RLS and add policies for client_inputs
ALTER TABLE client_inputs ENABLE ROW LEVEL SECURITY;

-- Policy for internal users (full access)
CREATE POLICY "Allow full access to internal users"
  ON client_inputs
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.auth_id = auth.uid()
      AND users.role_type_name = 'internal'
    )
  );

-- Policy for external users (view own client's inputs)
CREATE POLICY "Allow external users to view own client inputs"
  ON client_inputs
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.auth_id = auth.uid()
      AND users.role_type_name = 'external'
      AND users.client_id = client_inputs.client_account_id
    )
  );

-- Policy for external users (create inputs for own client)
CREATE POLICY "Allow external users to create own client inputs"
  ON client_inputs
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.auth_id = auth.uid()
      AND users.role_type_name = 'external'
      AND users.client_id = client_inputs.client_account_id
    )
  );