/*
  # Fix Input Code Generation

  1. Changes
    - Reset input code sequence
    - Update input code trigger to handle concurrent inserts
    - Add explicit locking to prevent race conditions
*/

-- Reset the sequence to ensure we start fresh
ALTER SEQUENCE input_code_seq RESTART WITH 1;

-- Update the input code generation function with proper locking
CREATE OR REPLACE FUNCTION generate_input_code()
RETURNS TRIGGER AS $$
DECLARE
  new_code TEXT;
  attempts INTEGER := 0;
  max_attempts CONSTANT INTEGER := 3;
BEGIN
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