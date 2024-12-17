-- Enable the pg_trgm extension for text search
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Add GIN indexes for faster text search
DROP INDEX IF EXISTS idx_cities_name;
DROP INDEX IF EXISTS idx_states_name;
DROP INDEX IF EXISTS idx_countries_name;

CREATE INDEX idx_cities_name ON cities USING gin (name gin_trgm_ops);
CREATE INDEX idx_states_name ON states USING gin (name gin_trgm_ops);
CREATE INDEX idx_countries_name ON countries USING gin (name gin_trgm_ops);