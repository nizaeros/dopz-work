-- Populate countries table with initial data
INSERT INTO countries (name, iso2, iso3, phone_code, currency, currency_symbol, tld, region)
VALUES 
  ('India', 'IN', 'IND', '91', 'INR', '₹', '.in', 'Asia'),
  ('United States', 'US', 'USA', '1', 'USD', '$', '.us', 'Americas'),
  ('United Kingdom', 'GB', 'GBR', '44', 'GBP', '£', '.uk', 'Europe'),
  ('Singapore', 'SG', 'SGP', '65', 'SGD', 'S$', '.sg', 'Asia'),
  ('Australia', 'AU', 'AUS', '61', 'AUD', 'A$', '.au', 'Oceania'),
  ('Canada', 'CA', 'CAN', '1', 'CAD', 'C$', '.ca', 'Americas'),
  ('Germany', 'DE', 'DEU', '49', 'EUR', '€', '.de', 'Europe'),
  ('Japan', 'JP', 'JPN', '81', 'JPY', '¥', '.jp', 'Asia'),
  ('United Arab Emirates', 'AE', 'ARE', '971', 'AED', 'د.إ', '.ae', 'Asia'),
  ('Malaysia', 'MY', 'MYS', '60', 'MYR', 'RM', '.my', 'Asia'),
  ('China', 'CN', 'CHN', '86', 'CNY', '¥', '.cn', 'Asia'),
  ('South Korea', 'KR', 'KOR', '82', 'KRW', '₩', '.kr', 'Asia'),
  ('France', 'FR', 'FRA', '33', 'EUR', '€', '.fr', 'Europe'),
  ('Italy', 'IT', 'ITA', '39', 'EUR', '€', '.it', 'Europe'),
  ('Spain', 'ES', 'ESP', '34', 'EUR', '€', '.es', 'Europe')
ON CONFLICT (country_id) DO UPDATE 
SET 
  name = EXCLUDED.name,
  iso2 = EXCLUDED.iso2,
  iso3 = EXCLUDED.iso3,
  phone_code = EXCLUDED.phone_code,
  currency = EXCLUDED.currency,
  currency_symbol = EXCLUDED.currency_symbol,
  tld = EXCLUDED.tld,
  region = EXCLUDED.region;