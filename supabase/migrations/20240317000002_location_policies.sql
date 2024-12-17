-- Enable RLS
ALTER TABLE countries ENABLE ROW LEVEL SECURITY;
ALTER TABLE states ENABLE ROW LEVEL SECURITY;
ALTER TABLE cities ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Enable read access for all users" ON countries;
DROP POLICY IF EXISTS "Enable read access for all users" ON states;
DROP POLICY IF EXISTS "Enable read access for all users" ON cities;

-- Create read policies
CREATE POLICY "Enable read access for all users"
ON countries FOR SELECT
USING (true);

CREATE POLICY "Enable read access for all users"
ON states FOR SELECT
USING (true);

CREATE POLICY "Enable read access for all users"
ON cities FOR SELECT
USING (true);

-- Create insert policies for authenticated users
CREATE POLICY "Enable insert for authenticated users"
ON countries FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable insert for authenticated users"
ON states FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable insert for authenticated users"
ON cities FOR INSERT
WITH CHECK (auth.role() = 'authenticated');