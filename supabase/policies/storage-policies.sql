-- Drop existing policies
DROP POLICY IF EXISTS "Allow authenticated users to upload files" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to update files" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to read files" ON storage.objects;

-- Create comprehensive storage policies
CREATE POLICY "Enable read access for all users" ON storage.objects FOR SELECT
USING (bucket_id = 'assets' AND (storage.foldername(name))[1] = 'public');

CREATE POLICY "Enable insert access for authenticated users" ON storage.objects FOR INSERT 
WITH CHECK (
  auth.role() = 'authenticated' AND 
  bucket_id = 'assets' AND 
  (storage.foldername(name))[1] = 'public'
);

CREATE POLICY "Enable update access for authenticated users" ON storage.objects FOR UPDATE
USING (
  auth.role() = 'authenticated' AND 
  bucket_id = 'assets' AND 
  (storage.foldername(name))[1] = 'public'
);

CREATE POLICY "Enable delete access for authenticated users" ON storage.objects FOR DELETE
USING (
  auth.role() = 'authenticated' AND 
  bucket_id = 'assets' AND 
  (storage.foldername(name))[1] = 'public'
);