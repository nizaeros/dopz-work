-- Populate Asian countries
INSERT INTO countries (name, iso2, iso3, phone_code, currency, currency_symbol, tld, region)
VALUES 
  ('India', 'IN', 'IND', '91', 'INR', '₹', '.in', 'Asia'),
  ('China', 'CN', 'CHN', '86', 'CNY', '¥', '.cn', 'Asia'),
  ('Japan', 'JP', 'JPN', '81', 'JPY', '¥', '.jp', 'Asia'),
  ('Singapore', 'SG', 'SGP', '65', 'SGD', 'S$', '.sg', 'Asia'),
  ('Malaysia', 'MY', 'MYS', '60', 'MYR', 'RM', '.my', 'Asia'),
  ('Thailand', 'TH', 'THA', '66', 'THB', '฿', '.th', 'Asia'),
  ('Vietnam', 'VN', 'VNM', '84', 'VND', '₫', '.vn', 'Asia'),
  ('Indonesia', 'ID', 'IDN', '62', 'IDR', 'Rp', '.id', 'Asia'),
  ('Philippines', 'PH', 'PHL', '63', 'PHP', '₱', '.ph', 'Asia'),
  ('South Korea', 'KR', 'KOR', '82', 'KRW', '₩', '.kr', 'Asia')
ON CONFLICT (iso2) DO UPDATE 
SET 
  name = EXCLUDED.name,
  iso3 = EXCLUDED.iso3,
  phone_code = EXCLUDED.phone_code,
  currency = EXCLUDED.currency,
  currency_symbol = EXCLUDED.currency_symbol,
  tld = EXCLUDED.tld,
  region = EXCLUDED.region;