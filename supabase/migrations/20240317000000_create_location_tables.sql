-- Drop existing tables if they exist
DROP TABLE IF EXISTS cities;
DROP TABLE IF EXISTS states;
DROP TABLE IF EXISTS countries;

-- Create countries table
CREATE TABLE countries (
    country_id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    iso2 VARCHAR(2) UNIQUE,
    iso3 VARCHAR(3) UNIQUE,
    phone_code VARCHAR(10),
    currency VARCHAR(10),
    currency_symbol VARCHAR(10),
    tld VARCHAR(10),
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

-- Create indexes for better search performance
CREATE INDEX idx_cities_name ON cities(name);
CREATE INDEX idx_states_name ON states(name);
CREATE INDEX idx_countries_name ON countries(name);
CREATE INDEX idx_countries_region ON countries(region);

-- Enable RLS
ALTER TABLE countries ENABLE ROW LEVEL SECURITY;
ALTER TABLE states ENABLE ROW LEVEL SECURITY;
ALTER TABLE cities ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable read access for all users" ON countries FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON states FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON cities FOR SELECT USING (true);