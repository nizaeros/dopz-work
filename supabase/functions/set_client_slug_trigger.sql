CREATE OR REPLACE FUNCTION public.set_client_slug_trigger()
RETURNS trigger AS $$
DECLARE
  base_slug text;
  new_slug text;
  counter integer := 1;
BEGIN
  -- Create the base slug from friendly_name
  base_slug := lower(regexp_replace(NEW.friendly_name, '[^a-zA-Z0-9\s-]', '', 'g')); -- Remove special chars
  base_slug := regexp_replace(base_slug, '\s+', '-', 'g'); -- Replace spaces with hyphens
  base_slug := trim(both '-' from base_slug); -- Trim hyphens from ends
  
  -- Initial attempt with base slug
  new_slug := base_slug;
  
  -- Keep trying with incremented counter until we find a unique slug
  WHILE EXISTS (
    SELECT 1 
    FROM client_accounts 
    WHERE slug = new_slug 
    AND (
      -- For new records, check all existing slugs
      NEW.client_account_id IS NULL 
      OR 
      -- For updates, exclude the current record
      client_account_id != NEW.client_account_id
    )
  ) LOOP
    counter := counter + 1;
    new_slug := base_slug || '-' || counter::text;
  END LOOP;
  
  -- Set the new slug
  NEW.slug := new_slug;
  
  -- Set updated_at timestamp
  NEW.updated_at := CURRENT_TIMESTAMP;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;