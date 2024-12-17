-- Add some test cities for India
WITH country AS (
  INSERT INTO countries (name, iso2, iso3, region)
  VALUES ('India', 'IN', 'IND', 'Asia')
  RETURNING country_id
), state AS (
  INSERT INTO states (name, state_code, country_id)
  SELECT 'Karnataka', 'KA', country_id FROM country
  RETURNING state_id
)
INSERT INTO cities (name, state_id)
SELECT name, state_id FROM state, unnest(ARRAY[
  'Bengaluru',
  'Mysuru',
  'Hubli',
  'Mangaluru'
]) AS name;

-- Add Tamil Nadu cities
WITH country AS (
  SELECT country_id FROM countries WHERE iso2 = 'IN'
), state AS (
  INSERT INTO states (name, state_code, country_id)
  SELECT 'Tamil Nadu', 'TN', country_id FROM country
  RETURNING state_id
)
INSERT INTO cities (name, state_id)
SELECT name, state_id FROM state, unnest(ARRAY[
  'Chennai',
  'Coimbatore',
  'Madurai',
  'Salem'
]) AS name;