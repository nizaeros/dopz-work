/*
  # Fix Input Code Sequence Creation

  1. Changes
    - Create input_code_seq if it doesn't exist
    - Reset sequence to 1
    - Update trigger function to handle sequence properly
*/

-- Create sequence if it doesn't exist
CREATE SEQUENCE IF NOT EXISTS input_code_seq START WITH 1;

-- Reset sequence
ALTER SEQUENCE input_code_seq RESTART WITH 1;

-- Update trigger function to handle sequence properly
CREATE OR REPLACE FUNCTION generate_input_code()
RETURNS TRIGGER AS $$
DECLARE
  new_code TEXT;
  attempts INTEGER := 0;
  max_attempts CONSTANT INTEGER := 3;
BEGIN
  -- Ensure sequence exists
  IF NOT EXISTS (
    SELECT 1 FROM pg_sequences WHERE schemaname = 'public' AND sequencename = 'input_code_seq'
  ) THEN
    CREATE SEQUENCE input_code_seq START WITH 1;
  END IF;

  WHILE attempts < max_attempts LOOP
    -- Lock the sequence to prevent concurrent access
    PERFORM pg_advisory_xact_lock(hashtext('input_code_seq'));
    
    -- Generate new code
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

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS tr_generate_input_code ON client_inputs;

-- Create trigger
CREATE TRIGGER tr_generate_input_code
  BEFORE INSERT ON client_inputs
  FOR EACH ROW
  EXECUTE FUNCTION generate_input_code();