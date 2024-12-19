-- Enable RLS on client_accounts table
ALTER TABLE client_accounts ENABLE ROW LEVEL SECURITY;

-- Internal users have full access
CREATE POLICY "internal_users_all_access" ON client_accounts
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE users.auth_id = auth.uid()
            AND users.role_type_name = 'internal'
        )
    );

-- External users can only view their own company
CREATE POLICY "external_users_view_own_company" ON client_accounts
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE users.auth_id = auth.uid()
            AND users.role_type_name = 'external'
            AND users.client_id = client_accounts.client_account_id
        )
    );

-- Prevent external users from inserting
CREATE POLICY "external_users_no_insert" ON client_accounts
    FOR INSERT
    WITH CHECK (false);

-- Prevent external users from updating
CREATE POLICY "external_users_no_update" ON client_accounts
    FOR UPDATE
    USING (false);

-- Prevent external users from deleting
CREATE POLICY "external_users_no_delete" ON client_accounts
    FOR DELETE
    USING (false);