-- Drop views that depend on cities table first
DO $$ 
BEGIN
    -- Drop views if they exist
    DROP VIEW IF EXISTS client_list_view CASCADE;
    
    -- Drop tables in correct order
    DROP TABLE IF EXISTS cities CASCADE;
    DROP TABLE IF EXISTS states CASCADE;
    DROP TABLE IF EXISTS countries CASCADE;
    
    -- Create tables with proper dependencies
    CREATE TABLE countries (
        country_id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
        name VARCHAR(255) NOT NULL,
        iso2 VARCHAR(2) UNIQUE,
        iso3 VARCHAR(3),
        region VARCHAR(100),
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE states (
        state_id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
        name VARCHAR(255) NOT NULL,
        state_code VARCHAR(10),
        country_id UUID REFERENCES countries(country_id) ON DELETE CASCADE,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE cities (
        city_id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
        name VARCHAR(255) NOT NULL,
        state_id UUID REFERENCES states(state_id) ON DELETE CASCADE,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
    );

    -- Recreate client_list_view
    CREATE OR REPLACE VIEW client_list_view AS
    SELECT 
        ca.client_account_id,
        ca.friendly_name,
        ca.registered_name,
        ca.account_type,
        ca.entity_type,
        ca.gstin,
        ca.logo_image_url,
        ca.is_active,
        ca.created_at,
        i.industry_name,
        c.name as city_name,
        s.name as state_name,
        co.name as country_name,
        string_agg(pa.parent_account_code, '; ') as parent_accounts
    FROM client_accounts ca
    LEFT JOIN industries i ON ca.industry_id = i.industry_id
    LEFT JOIN cities c ON ca.city_id = c.city_id
    LEFT JOIN states s ON c.state_id = s.state_id
    LEFT JOIN countries co ON s.country_id = co.country_id
    LEFT JOIN client_parent_association cpa ON ca.client_account_id = cpa.client_account_id
    LEFT JOIN parent_accounts pa ON cpa.parent_account_id = pa.parent_account_id
    GROUP BY 
        ca.client_account_id,
        ca.friendly_name,
        ca.registered_name,
        ca.account_type,
        ca.entity_type,
        ca.gstin,
        ca.logo_image_url,
        ca.is_active,
        ca.created_at,
        i.industry_name,
        c.name,
        s.name,
        co.name;
END $$;