-- Enable RLS on comments table
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Internal users have full access
CREATE POLICY "internal_users_all_access" ON comments
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE users.auth_id = auth.uid()
            AND users.role_type_name = 'internal'
        )
    );

-- External users can view non-internal comments on their inputs
CREATE POLICY "external_users_view_own" ON comments
    FOR SELECT
    USING (
        NOT is_internal
        AND EXISTS (
            SELECT 1 FROM users u
            JOIN client_inputs ci ON ci.client_account_id = u.client_id
            WHERE u.auth_id = auth.uid()
            AND u.role_type_name = 'external'
            AND ci.input_id = comments.entity_id
            AND comments.entity_type = 'client_input'
        )
    );

-- External users can add comments to their inputs
CREATE POLICY "external_users_create_own" ON comments
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
        AND NOT NEW.is_internal
    );