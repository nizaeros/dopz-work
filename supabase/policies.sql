-- Enable RLS
ALTER TABLE doc_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_inputs ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- Doc Categories Policies
CREATE POLICY "Allow full access to internal users" ON doc_categories
    USING (EXISTS (
        SELECT 1 FROM users
        WHERE users.auth_id = auth.uid()
        AND users.role_type_name = 'internal'
    ));

CREATE POLICY "Allow read access to external users" ON doc_categories
    FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM users
        WHERE users.auth_id = auth.uid()
        AND users.role_type_name = 'external'
    ));

-- Client Inputs Policies
CREATE POLICY "Allow full access to internal users" ON client_inputs
    USING (EXISTS (
        SELECT 1 FROM users
        WHERE users.auth_id = auth.uid()
        AND users.role_type_name = 'internal'
    ));

CREATE POLICY "Allow external users to view their client inputs" ON client_inputs
    FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM users
        WHERE users.auth_id = auth.uid()
        AND users.role_type_name = 'external'
        AND users.client_id = client_inputs.client_account_id
    ));

CREATE POLICY "Allow external users to create inputs for their client" ON client_inputs
    FOR INSERT
    WITH CHECK (EXISTS (
        SELECT 1 FROM users
        WHERE users.auth_id = auth.uid()
        AND users.role_type_name = 'external'
        AND users.client_id = client_inputs.client_account_id
    ));

-- Comments Policies
CREATE POLICY "Allow full access to internal users" ON comments
    USING (EXISTS (
        SELECT 1 FROM users
        WHERE users.auth_id = auth.uid()
        AND users.role_type_name = 'internal'
    ));

CREATE POLICY "Allow external users to view non-internal comments" ON comments
    FOR SELECT
    USING (
        (NOT is_internal) AND
        EXISTS (
            SELECT 1 FROM users
            WHERE users.auth_id = auth.uid()
            AND users.role_type_name = 'external'
            AND users.client_id = (
                SELECT client_account_id FROM client_inputs
                WHERE client_inputs.input_id = comments.entity_id
            )
        )
    );

CREATE POLICY "Allow external users to create comments" ON comments
    FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM users
            WHERE users.auth_id = auth.uid()
            AND users.role_type_name = 'external'
            AND users.client_id = (
                SELECT client_account_id FROM client_inputs
                WHERE client_inputs.input_id = NEW.entity_id
            )
        )
    );

-- Documents Policies
CREATE POLICY "Allow full access to internal users" ON documents
    USING (EXISTS (
        SELECT 1 FROM users
        WHERE users.auth_id = auth.uid()
        AND users.role_type_name = 'internal'
    ));

CREATE POLICY "Allow external users to view their documents" ON documents
    FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM users
        WHERE users.auth_id = auth.uid()
        AND users.role_type_name = 'external'
        AND users.client_id = (
            SELECT client_account_id FROM client_inputs
            WHERE client_inputs.input_id = documents.entity_id
        )
    ));

CREATE POLICY "Allow external users to upload documents" ON documents
    FOR INSERT
    WITH CHECK (EXISTS (
        SELECT 1 FROM users
        WHERE users.auth_id = auth.uid()
        AND users.role_type_name = 'external'
        AND users.client_id = (
            SELECT client_account_id FROM client_inputs
            WHERE client_inputs.input_id = NEW.entity_id
        )
    ));