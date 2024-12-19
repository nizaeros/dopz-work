-- Drop existing function and recreate with simpler logic
CREATE OR REPLACE FUNCTION generate_input_code()
RETURNS TRIGGER AS $$
DECLARE
  next_number INTEGER;
BEGIN
  -- Get the next number from existing codes
  SELECT COALESCE(
    MAX(NULLIF(REGEXP_REPLACE(input_code, '\D', '', 'g'), '')::INTEGER),
    0
  ) + 1 INTO next_number
  FROM client_inputs;
  
  -- Generate new code with proper padding
  NEW.input_code := 'D' || LPAD(next_number::TEXT, 6, '0');
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Recreate the trigger
DROP TRIGGER IF EXISTS tr_generate_input_code ON client_inputs;
CREATE TRIGGER tr_generate_input_code
  BEFORE INSERT ON client_inputs
  FOR EACH ROW
  EXECUTE FUNCTION generate_input_code();

-- Add index for better performance
DROP INDEX IF EXISTS idx_client_inputs_input_code_numeric;
CREATE INDEX idx_client_inputs_input_code_numeric 
ON client_inputs ((NULLIF(REGEXP_REPLACE(input_code, '\D', '', 'g'), '')::INTEGER));