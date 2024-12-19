/*
  # Fix Input Code Generation and Storage Setup

  1. Changes
    - Create input_code_seq if not exists
    - Reset sequence to ensure clean start
    - Update storage bucket and policies
    - Add proper constraints and indexes
*/

-- Create sequence if it doesn't exist
CREATE SEQUENCE IF NOT EXISTS input_code_seq START WITH 1;

-- Reset sequence to ensure clean start
ALTER SEQUENCE input_code_seq RESTART WITH 1;

-- Ensure storage bucket exists with correct settings
INSERT INTO storage.buckets (id, name, public)
VALUES ('client-documents', 'client-documents', false)
ON CONFLICT (id) DO NOTHING;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Allow authenticated users to upload files" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to read files" ON storage.objects;
DROP POLICY IF EXISTS "Enable upload for authenticated users" ON storage.objects;
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON storage.objects;

-- Create comprehensive storage policies
CREATE POLICY "Enable upload for authenticated users" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'client-documents' AND
  auth.role() = 'authenticated' AND
  (storage.foldername(name))[1] = 'inputs'
);

CREATE POLICY "Enable read access for authenticated users" ON storage.objects
FOR SELECT USING (
  bucket_id = 'client-documents' AND
  auth.role() = 'authenticated' AND
  (storage.foldername(name))[1] = 'inputs'
);

-- Update input code generation function with better error handling
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
  
  -- If we reach here, we couldn't generate a unique code
  RAISE EXCEPTION 'Failed to generate unique input code after % attempts', max_attempts;
END;
$$ LANGUAGE plpgsql;

-- Recreate trigger to ensure it uses latest function version
DROP TRIGGER IF EXISTS tr_generate_input_code ON client_inputs;

CREATE TRIGGER tr_generate_input_code
  BEFORE INSERT ON client_inputs
  FOR EACH ROW
  EXECUTE FUNCTION generate_input_code();

-- Add index for input_code to improve lookup performance
CREATE INDEX IF NOT EXISTS idx_client_inputs_input_code ON client_inputs(input_code);