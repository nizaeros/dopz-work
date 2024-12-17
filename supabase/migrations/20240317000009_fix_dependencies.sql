-- Drop tables in correct order to avoid dependency issues
DO $$ 
BEGIN
    -- Drop tables if they exist
    DROP TABLE IF EXISTS cities CASCADE;
    DROP TABLE IF EXISTS states CASCADE;
    DROP TABLE IF EXISTS countries CASCADE;
    
    -- Create tables with proper dependencies
    CREATE TABLE IF NOT EXISTS countries (
        country_id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
        name VARCHAR(255) NOT NULL,
        iso2 VARCHAR(2) UNIQUE,
        iso3 VARCHAR(3),
        region VARCHAR(100),
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS states (
        state_id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
        name VARCHAR(255) NOT NULL,
        state_code VARCHAR(10),
        country_id UUID REFERENCES countries(country_id) ON DELETE CASCADE,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS cities (
        city_id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
        name VARCHAR(255) NOT NULL,
        state_id UUID REFERENCES states(state_id) ON DELETE CASCADE,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
    );
END $$;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_cities_name ON cities(name);
CREATE INDEX IF NOT EXISTS idx_states_name ON states(name);
CREATE INDEX IF NOT EXISTS idx_countries_name ON countries(name);

-- Enable RLS
ALTER TABLE countries ENABLE ROW LEVEL SECURITY;
ALTER TABLE states ENABLE ROW LEVEL SECURITY;
ALTER TABLE cities ENABLE ROW LEVEL SECURITY;

-- Create policies
DO $$ 
BEGIN
    -- Drop existing policies
    DROP POLICY IF EXISTS "Enable read access for all users" ON countries;
    DROP POLICY IF EXISTS "Enable read access for all users" ON states;
    DROP POLICY IF EXISTS "Enable read access for all users" ON cities;

    -- Create new policies
    CREATE POLICY "Enable read access for all users" ON countries FOR SELECT USING (true);
    CREATE POLICY "Enable read access for all users" ON states FOR SELECT USING (true);
    CREATE POLICY "Enable read access for all users" ON cities FOR SELECT USING (true);
END $$;