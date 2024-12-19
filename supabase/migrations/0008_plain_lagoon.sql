-- Create storage bucket for client documents
INSERT INTO storage.buckets (id, name, public)
VALUES ('client-documents', 'client-documents', true)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS on the bucket
CREATE POLICY "Allow authenticated users to upload files"
ON storage.objects FOR INSERT 
WITH CHECK (
  bucket_id = 'client-documents' AND
  auth.role() = 'authenticated'
);

CREATE POLICY "Allow authenticated users to read files"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'client-documents' AND
  auth.role() = 'authenticated'
);