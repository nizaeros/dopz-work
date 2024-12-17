-- Populate Asian countries
INSERT INTO countries (name, iso2, iso3, phone_code, currency, currency_symbol, tld, region)
VALUES 
  ('India', 'IN', 'IND', '91', 'INR', '₹', '.in', 'Asia'),
  ('China', 'CN', 'CHN', '86', 'CNY', '¥', '.cn', 'Asia'),
  ('Japan', 'JP', 'JPN', '81', 'JPY', '¥', '.jp', 'Asia'),
  ('South Korea', 'KR', 'KOR', '82', 'KRW', '₩', '.kr', 'Asia'),
  ('Singapore', 'SG', 'SGP', '65', 'SGD', 'S$', '.sg', 'Asia'),
  ('Malaysia', 'MY', 'MYS', '60', 'MYR', 'RM', '.my', 'Asia'),
  ('Indonesia', 'ID', 'IDN', '62', 'IDR', 'Rp', '.id', 'Asia'),
  ('Thailand', 'TH', 'THA', '66', 'THB', '฿', '.th', 'Asia'),
  ('Vietnam', 'VN', 'VNM', '84', 'VND', '₫', '.vn', 'Asia'),
  ('Philippines', 'PH', 'PHL', '63', 'PHP', '₱', '.ph', 'Asia'),
  ('Bangladesh', 'BD', 'BGD', '880', 'BDT', '৳', '.bd', 'Asia'),
  ('Pakistan', 'PK', 'PAK', '92', 'PKR', '₨', '.pk', 'Asia'),
  ('Sri Lanka', 'LK', 'LKA', '94', 'LKR', 'Rs', '.lk', 'Asia'),
  ('Nepal', 'NP', 'NPL', '977', 'NPR', 'रू', '.np', 'Asia'),
  ('Hong Kong', 'HK', 'HKG', '852', 'HKD', 'HK$', '.hk', 'Asia'),
  ('Taiwan', 'TW', 'TWN', '886', 'TWD', 'NT$', '.tw', 'Asia'),
  ('United Arab Emirates', 'AE', 'ARE', '971', 'AED', 'د.إ', '.ae', 'Asia'),
  ('Saudi Arabia', 'SA', 'SAU', '966', 'SAR', '﷼', '.sa', 'Asia'),
  ('Israel', 'IL', 'ISR', '972', 'ILS', '₪', '.il', 'Asia'),
  ('Qatar', 'QA', 'QAT', '974', 'QAR', 'ر.ق', '.qa', 'Asia')
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