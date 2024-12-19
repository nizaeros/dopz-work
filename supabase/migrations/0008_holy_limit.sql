/*
  # Client Inputs Triggers
  
  1. Functions
    - generate_input_code: Automatically generates sequential input codes
    - audit_client_input_changes: Tracks update timestamps
  
  2. Triggers
    - tr_generate_input_code: Assigns input codes on insert
    - tr_audit_client_input_changes: Updates timestamps on changes
*/

-- Create input code generation function
CREATE OR REPLACE FUNCTION generate_input_code()
RETURNS TRIGGER AS $$
BEGIN
  NEW.input_code := 'D' || LPAD(nextval('input_code_seq')::text, 6, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create input code trigger
DROP TRIGGER IF EXISTS tr_generate_input_code ON client_inputs;
CREATE TRIGGER tr_generate_input_code
  BEFORE INSERT ON client_inputs
  FOR EACH ROW
  EXECUTE FUNCTION generate_input_code();

-- Create audit trigger function
CREATE OR REPLACE FUNCTION audit_client_input_changes()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create audit trigger
DROP TRIGGER IF EXISTS tr_audit_client_input_changes ON client_inputs;
CREATE TRIGGER tr_audit_client_input_changes
  BEFORE UPDATE ON client_inputs
  FOR EACH ROW
  EXECUTE FUNCTION audit_client_input_changes();