// Database Functions Definitions
export const databaseFunctions = {
  // Audit trigger function
  audit_client_input_changes: `
    CREATE OR REPLACE FUNCTION audit_client_input_changes()
    RETURNS TRIGGER AS $$
    BEGIN
      NEW.updated_at = now();
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
  `,

  // Input code generation function
  generate_input_code: `
    CREATE OR REPLACE FUNCTION generate_input_code()
    RETURNS TRIGGER AS $$
    BEGIN
      NEW.input_code := 'D' || LPAD(nextval('input_code_seq')::text, 6, '0');
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
  `,

  // Client slug generation function
  set_client_slug_trigger: `
    CREATE OR REPLACE FUNCTION set_client_slug_trigger()
    RETURNS TRIGGER AS $$
    DECLARE
      base_slug text;
      new_slug text;
      counter integer := 1;
    BEGIN
      base_slug := lower(regexp_replace(NEW.friendly_name, '[^a-zA-Z0-9\\s-]', '', 'g'));
      base_slug := regexp_replace(base_slug, '\\s+', '-', 'g');
      base_slug := trim(both '-' from base_slug);
      
      new_slug := base_slug;
      
      WHILE EXISTS (
        SELECT 1 
        FROM client_accounts 
        WHERE slug = new_slug 
        AND client_account_id != NEW.client_account_id
      ) LOOP
        counter := counter + 1;
        new_slug := base_slug || '-' || counter::text;
      END LOOP;
      
      NEW.slug := new_slug;
      NEW.updated_at := CURRENT_TIMESTAMP;
      
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
  `
};