/*
  # Fix Storage Policies

  1. Changes
    - Update storage bucket policies for client documents
    - Add proper RLS policies for file access
*/

-- Ensure bucket exists
INSERT INTO storage.buckets (id, name, public)
VALUES ('client-documents', 'client-documents', false)
ON CONFLICT (id) DO NOTHING;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Allow authenticated users to upload files" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to read files" ON storage.objects;

-- Create comprehensive storage policies
CREATE POLICY "Enable upload for authenticated users" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'client-documents' AND
  auth.role() = 'authenticated' AND
  (storage.foldername(name))[1] = 'inputs'
);

CREATE POLICY "Enable read access for authenticated users" ON storage.objects
FOR SELECT USING (
  bucket_id = 'client-documents' AND
  auth.role() = 'authenticated' AND
  (storage.foldername(name))[1] = 'inputs'
);

-- Add policy for updating own uploads
CREATE POLICY "Enable update for file owners" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'client-documents' AND
  auth.uid() = owner
);

-- Add policy for deleting own uploads
CREATE POLICY "Enable delete for file owners" ON storage.objects
FOR DELETE USING (
  bucket_id = 'client-documents' AND
  auth.uid() = owner
);