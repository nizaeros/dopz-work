-- Create the trigger function if it doesn't exist
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add audit columns to client_parent_association table
ALTER TABLE client_parent_association 
ADD COLUMN IF NOT EXISTS created_by UUID,
ADD COLUMN IF NOT EXISTS updated_by UUID,
ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW(),
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- Add foreign key constraints
ALTER TABLE client_parent_association
ADD CONSTRAINT fk_client_parent_association_created_by
FOREIGN KEY (created_by) REFERENCES auth.users(id);

ALTER TABLE client_parent_association
ADD CONSTRAINT fk_client_parent_association_updated_by
FOREIGN KEY (updated_by) REFERENCES auth.users(id);

-- Create trigger for automatic updated_at
DROP TRIGGER IF EXISTS update_client_parent_association_updated_at ON client_parent_association;

CREATE TRIGGER update_client_parent_association_updated_at
    BEFORE UPDATE ON client_parent_association
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Update existing rows with a system user (if needed)
DO $$
DECLARE
    system_user_id UUID;
BEGIN
    -- Get first available user or handle no users case
    SELECT id INTO system_user_id FROM auth.users LIMIT 1;
    
    IF system_user_id IS NOT NULL THEN
        UPDATE client_parent_association
        SET created_by = system_user_id,
            updated_by = system_user_id
        WHERE created_by IS NULL;
        
        -- Make columns NOT NULL after data is updated
        ALTER TABLE client_parent_association
        ALTER COLUMN created_by SET NOT NULL,
        ALTER COLUMN updated_by SET NOT NULL;
    END IF;
END $$;