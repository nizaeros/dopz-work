-- Enable RLS on documents table
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- Internal users have full access
CREATE POLICY "internal_users_all_access" ON documents
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE users.auth_id = auth.uid()
            AND users.role_type_name = 'internal'
        )
    );

-- External users can view documents related to their client's inputs
CREATE POLICY "external_users_view_own" ON documents
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM users u
            JOIN client_inputs ci ON ci.client_account_id = u.client_id
            WHERE u.auth_id = auth.uid()
            AND u.role_type_name = 'external'
            AND ci.input_id = documents.entity_id
            AND documents.entity_type = 'client_input'
        )
    );

-- External users can upload documents for their own inputs
CREATE POLICY "external_users_upload_own" ON documents
    FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM users u
            JOIN client_inputs ci ON ci.client_account_id = u.client_id
            WHERE u.auth_id = auth.uid()
            AND u.role_type_name = 'external'
            AND ci.input_id = NEW.entity_id
            AND NEW.entity_type = 'client_input'
        )
    );