-- Add test data for India
WITH country AS (
    SELECT country_id FROM countries WHERE iso2 = 'IN'
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
]) AS name
ON CONFLICT DO NOTHING;

-- Insert Tamil Nadu cities
INSERT INTO cities (name, state_id)
SELECT name, state_id FROM tamil_nadu, unnest(ARRAY[
    'Chennai',
    'Coimbatore',
    'Madurai',
    'Salem',
    'Trichy'
]) AS name
ON CONFLICT DO NOTHING;