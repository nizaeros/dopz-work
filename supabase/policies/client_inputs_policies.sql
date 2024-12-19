-- Enable RLS on client_inputs table
ALTER TABLE client_inputs ENABLE ROW LEVEL SECURITY;

-- Internal users have full access
CREATE POLICY "internal_users_all_access" ON client_inputs
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE users.auth_id = auth.uid()
            AND users.role_type_name = 'internal'
        )
    );

-- External users can view their own client's inputs
CREATE POLICY "external_users_view_own" ON client_inputs
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE users.auth_id = auth.uid()
            AND users.role_type_name = 'external'
            AND users.client_id = client_inputs.client_account_id
        )
    );

-- External users can create inputs for their own client
CREATE POLICY "external_users_create_own" ON client_inputs
    FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM users
            WHERE users.auth_id = auth.uid()
            AND users.role_type_name = 'external'
            AND users.client_id = client_inputs.client_account_id
        )
    );

-- External users can update their own inputs only if status is 'review' or 'suspense'
CREATE POLICY "external_users_update_own" ON client_inputs
    FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE users.auth_id = auth.uid()
            AND users.role_type_name = 'external'
            AND users.client_id = client_inputs.client_account_id
        )
        AND client_inputs.input_status IN ('review', 'suspense')
    );

-- Separate policy to restrict field updates for external users
CREATE POLICY "external_users_update_restrictions" ON client_inputs
    FOR UPDATE
    USING (
        client_inputs.input_code = client_inputs.input_code
        AND client_inputs.client_account_id = client_inputs.client_account_id
        AND client_inputs.input_status = client_inputs.input_status
        AND client_inputs.bookkeeping_status = client_inputs.bookkeeping_status
    );

-- No delete access for external users
CREATE POLICY "external_users_no_delete" ON client_inputs
    FOR DELETE
    USING (false);