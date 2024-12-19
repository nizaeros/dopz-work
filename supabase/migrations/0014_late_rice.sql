/*
  # Fix Input Code Generation and Storage Issues

  1. Changes
    - Create and reset input code sequence
    - Update storage bucket configuration
    - Fix trigger function for input code generation
    - Add proper indexes and constraints

  2. Security
    - Update storage policies for better access control
    - Add proper RLS policies
*/

-- First, ensure the sequence exists and reset it
DO $$ 
BEGIN
  -- Create sequence if it doesn't exist
  CREATE SEQUENCE IF NOT EXISTS input_code_seq START WITH 1;
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
  -- Lock the sequence to prevent concurrent access
  PERFORM pg_advisory_xact_lock(hashtext('input_code_seq'));
  
  WHILE attempts < max_attempts LOOP
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

-- Ensure storage bucket exists with correct settings
INSERT INTO storage.buckets (id, name, public)
VALUES ('client-documents', 'client-documents', false)
ON CONFLICT (id) DO NOTHING;

-- Update storage policies
DO $$ 
BEGIN
  -- Drop existing policies if they exist
  DROP POLICY IF EXISTS "Enable upload for authenticated users" ON storage.objects;
  DROP POLICY IF EXISTS "Enable read access for authenticated users" ON storage.objects;

  -- Create new policies
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

-- Add performance optimizations
CREATE INDEX IF NOT EXISTS idx_client_inputs_input_code ON client_inputs(input_code);
CREATE INDEX IF NOT EXISTS idx_client_inputs_client_account ON client_inputs(client_account_id);