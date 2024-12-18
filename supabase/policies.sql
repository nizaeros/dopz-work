-- Enable RLS on storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Create storage bucket policies
CREATE POLICY "Allow authenticated users to upload files"
ON storage.objects FOR INSERT
WITH CHECK (
  auth.role() = 'authenticated' AND 
  bucket_id = 'assets' AND 
  (storage.foldername(name))[1] = 'public'
);

CREATE POLICY "Allow authenticated users to update files"
ON storage.objects FOR UPDATE
USING (
  auth.role() = 'authenticated' AND 
  bucket_id = 'assets' AND 
  (storage.foldername(name))[1] = 'public'
);

CREATE POLICY "Allow authenticated users to read files"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'assets' AND 
  (storage.foldername(name))[1] = 'public'
);

-- Enable RLS on client_accounts
ALTER TABLE client_accounts ENABLE ROW LEVEL SECURITY;

-- Create policies for client_accounts
CREATE POLICY "Enable read access for authenticated users"
ON client_accounts FOR SELECT
USING (auth.role() = 'authenticated');

CREATE POLICY "Enable insert access for authenticated users"
ON client_accounts FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update access for authenticated users"
ON client_accounts FOR UPDATE
USING (auth.role() = 'authenticated');

CREATE POLICY "Enable delete access for authenticated users"
ON client_accounts FOR DELETE
USING (auth.role() = 'authenticated');

-- Enable RLS on client_parent_association
ALTER TABLE client_parent_association ENABLE ROW LEVEL SECURITY;

-- Create policies for client_parent_association
CREATE POLICY "Enable read access for authenticated users"
ON client_parent_association FOR SELECT
USING (auth.role() = 'authenticated');

CREATE POLICY "Enable insert access for authenticated users"
ON client_parent_association FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update access for authenticated users"
ON client_parent_association FOR UPDATE
USING (auth.role() = 'authenticated');

CREATE POLICY "Enable delete access for authenticated users"
ON client_parent_association FOR DELETE
USING (auth.role() = 'authenticated');