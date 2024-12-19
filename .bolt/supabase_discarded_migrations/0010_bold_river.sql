/*
  # Client Inputs RLS Policies
  
  1. Security Changes
    - Enable RLS on client_inputs table
    - Add policies for internal users (full access)
    - Add policies for external users (limited access)
      - SELECT: View own client inputs
      - INSERT: Create inputs for own client
      - UPDATE: Update own inputs with status restrictions
    - No DELETE access for external users
*/

-- Enable RLS
ALTER TABLE client_inputs ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "client_inputs_internal_full_access" ON client_inputs;
DROP POLICY IF EXISTS "client_inputs_external_select" ON client_inputs;
DROP POLICY IF EXISTS "client_inputs_external_insert" ON client_inputs;
DROP POLICY IF EXISTS "client_inputs_external_update" ON client_inputs;

-- Create policies for client_inputs
CREATE POLICY "client_inputs_internal_full_access"
  ON client_inputs
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.auth_id = auth.uid()
      AND users.role_type_name = 'internal'
    )
  );

CREATE POLICY "client_inputs_external_select"
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

CREATE POLICY "client_inputs_external_insert"
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

CREATE POLICY "client_inputs_external_update"
  ON client_inputs
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.auth_id = auth.uid()
      AND users.role_type_name = 'external'
      AND users.client_id = client_inputs.client_account_id
    )
    AND input_status IN ('review', 'suspense')
    -- Add update restrictions directly in USING clause
    AND input_code = input_code
    AND client_account_id = client_account_id
    AND input_status = input_status
    AND bookkeeping_status = bookkeeping_status
  );