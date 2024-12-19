-- Enable RLS on client_inputs table
ALTER TABLE client_inputs ENABLE ROW LEVEL SECURITY;

-- Policy for external users to VIEW their client inputs
CREATE POLICY "external_users_select_policy" ON client_inputs
    FOR SELECT 
    USING (
        -- Check if the authenticated user is external and belongs to the client
        EXISTS (
            SELECT 1 FROM users
            WHERE users.auth_id = auth.uid()
            AND users.role_type_name = 'external'
            AND users.client_id = client_inputs.client_account_id
        )
    );

-- Policy for external users to CREATE inputs for their client
CREATE POLICY "external_users_insert_policy" ON client_inputs
    FOR INSERT
    WITH CHECK (
        -- Verify user is external and creating input for their client
        EXISTS (
            SELECT 1 FROM users
            WHERE users.auth_id = auth.uid()
            AND users.role_type_name = 'external'
            AND users.client_id = client_inputs.client_account_id
        )
    );

-- Policy for external users to UPDATE their inputs
-- Only allows updating when status is 'review' or 'suspense'
CREATE POLICY "external_users_update_policy" ON client_inputs
    FOR UPDATE
    USING (
        -- Check if user is external and input belongs to their client
        EXISTS (
            SELECT 1 FROM users
            WHERE users.auth_id = auth.uid()
            AND users.role_type_name = 'external'
            AND users.client_id = client_inputs.client_account_id
        )
        -- Only allow updates for inputs in 'review' or 'suspense' status
        AND input_status IN ('review', 'suspense')
    )
    WITH CHECK (
        -- Prevent updating certain fields
        NEW.input_status = OLD.input_status
        AND NEW.bookkeeping_status = OLD.bookkeeping_status
        AND NEW.client_account_id = OLD.client_account_id
        AND NEW.input_code = OLD.input_code
    );

-- Policy to PREVENT DELETE for external users
CREATE POLICY "external_users_no_delete_policy" ON client_inputs
    FOR DELETE
    USING (false);