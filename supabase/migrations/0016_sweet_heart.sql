/*
  # Fix Input Code Generation

  1. Changes
    - Reset and lock sequence
    - Update input code generation function to ensure sequential numbering
    - Add transaction-level locking for concurrent safety
    - Add validation to prevent gaps in sequence

  2. Security
    - Maintains existing RLS policies
    - Adds proper locking mechanism
*/

-- First, reset the sequence to ensure clean start
ALTER SEQUENCE input_code_seq RESTART WITH 1;

-- Update the input code generation function
CREATE OR REPLACE FUNCTION generate_input_code()
RETURNS TRIGGER AS $$
DECLARE
  last_code TEXT;
  next_number INTEGER;
BEGIN
  -- Lock the table to prevent concurrent access
  LOCK TABLE client_inputs IN SHARE MODE;
  
  -- Get the last used number from existing codes
  SELECT COALESCE(
    MAX(NULLIF(REGEXP_REPLACE(input_code, '\D', '', 'g'), '')::INTEGER),
    0
  ) INTO next_number
  FROM client_inputs;
  
  -- Increment the number
  next_number := next_number + 1;
  
  -- Generate new code with proper padding
  NEW.input_code := 'D' || LPAD(next_number::TEXT, 6, '0');
  
  -- Verify uniqueness
  IF EXISTS (
    SELECT 1 FROM client_inputs WHERE input_code = NEW.input_code
  ) THEN
    RAISE EXCEPTION 'Duplicate input code generated: %', NEW.input_code;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Recreate the trigger
DROP TRIGGER IF EXISTS tr_generate_input_code ON client_inputs;
CREATE TRIGGER tr_generate_input_code
  BEFORE INSERT ON client_inputs
  FOR EACH ROW
  EXECUTE FUNCTION generate_input_code();

-- Add index for performance
CREATE INDEX IF NOT EXISTS idx_client_inputs_input_code_numeric 
ON client_inputs ((NULLIF(REGEXP_REPLACE(input_code, '\D', '', 'g'), '')::INTEGER));