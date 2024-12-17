-- Drop existing tables if they exist
DROP TABLE IF EXISTS cities CASCADE;
DROP TABLE IF EXISTS states CASCADE;
DROP TABLE IF EXISTS countries CASCADE;

-- Create countries table
CREATE TABLE countries (
    country_id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    iso2 VARCHAR(2) UNIQUE,
    iso3 VARCHAR(3),
    region VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create states table
CREATE TABLE states (
    state_id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    state_code VARCHAR(10),
    country_id UUID REFERENCES countries(country_id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create cities table
CREATE TABLE cities (
    city_id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    state_id UUID REFERENCES states(state_id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_cities_name ON cities USING gin (name gin_trgm_ops);
CREATE INDEX idx_states_name ON states USING gin (name gin_trgm_ops);
CREATE INDEX idx_countries_name ON countries USING gin (name gin_trgm_ops);

-- Enable RLS
ALTER TABLE countries ENABLE ROW LEVEL SECURITY;
ALTER TABLE states ENABLE ROW LEVEL SECURITY;
ALTER TABLE cities ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable read access for all users" ON countries FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON states FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON cities FOR SELECT USING (true);

-- Insert initial data for India
WITH country AS (
    INSERT INTO countries (name, iso2, iso3, region)
    VALUES ('India', 'IN', 'IND', 'Asia')
    RETURNING country_id
), karnataka AS (
    INSERT INTO states (name, state_code, country_id)
    SELECT 'Karnataka', 'KA', country_id FROM country
    RETURNING state_id
), tamil_nadu AS (
    INSERT INTO states (name, state_code, country_id)
    SELECT 'Tamil Nadu', 'TN', country_id FROM country
    RETURNING state_id
)
-- Insert Karnataka cities
INSERT INTO cities (name, state_id)
SELECT name, state_id FROM karnataka, unnest(ARRAY[
    'Bengaluru',
    'Mysuru',
    'Hubli',
    'Mangaluru',
    'Belgaum'
]) AS name;

-- Insert Tamil Nadu cities
INSERT INTO cities (name, state_id)
SELECT name, state_id FROM tamil_nadu, unnest(ARRAY[
    'Chennai',
    'Coimbatore',
    'Madurai',
    'Salem',
    'Trichy'
]) AS name;