-- Enable RLS on storage.objects
alter table storage.objects enable row level security;

-- Create storage bucket policies
create policy "Allow authenticated users to upload files"
on storage.objects for insert
with check (
  auth.role() = 'authenticated' AND 
  bucket_id = 'assets' AND 
  (storage.foldername(name))[1] = 'public'
);

create policy "Allow authenticated users to update files"
on storage.objects for update
using (
  auth.role() = 'authenticated' AND 
  bucket_id = 'assets' AND 
  (storage.foldername(name))[1] = 'public'
);

create policy "Allow authenticated users to read files"
on storage.objects for select
using (
  bucket_id = 'assets' AND 
  (storage.foldername(name))[1] = 'public'
);

-- Enable RLS on client_accounts
alter table client_accounts enable row level security;

-- Create policies for client_accounts
create policy "Enable read access for authenticated users"
on client_accounts for select
using (auth.role() = 'authenticated');

create policy "Enable insert access for authenticated users"
on client_accounts for insert
with check (auth.role() = 'authenticated');

create policy "Enable update access for authenticated users"
on client_accounts for update
using (auth.role() = 'authenticated');

create policy "Enable delete access for authenticated users"
on client_accounts for delete
using (auth.role() = 'authenticated');

-- Enable RLS on client_parent_association
alter table client_parent_association enable row level security;

-- Create policies for client_parent_association
create policy "Enable read access for authenticated users"
on client_parent_association for select
using (auth.role() = 'authenticated');

create policy "Enable insert access for authenticated users"
on client_parent_association for insert
with check (auth.role() = 'authenticated');

create policy "Enable update access for authenticated users"
on client_parent_association for update
using (auth.role() = 'authenticated');

create policy "Enable delete access for authenticated users"
on client_parent_association for delete
using (auth.role() = 'authenticated');