/*
  # Database Improvements Migration
  
  1. New Policies
    - Add policy to prevent modifying finalized inputs
  
  2. Performance Improvements  
    - Add indexes for frequently queried columns
    
  3. Data Validation
    - Add constraints for URLs and GSTIN format
    - Add constraints for input amounts and dates
*/

-- Add new policy to prevent modifying finalized inputs
DROP POLICY IF EXISTS "prevent_modifying_finalized_inputs" ON client_inputs;
CREATE POLICY "prevent_modifying_finalized_inputs" ON client_inputs
    FOR UPDATE
    USING (
        input_status NOT IN ('verified', 'cancelled')
    );

-- Add missing indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_client_accounts_friendly_name ON client_accounts(friendly_name);
CREATE INDEX IF NOT EXISTS idx_client_accounts_created_at ON client_accounts(created_at);
CREATE INDEX IF NOT EXISTS idx_client_inputs_input_month ON client_inputs(input_month);
CREATE INDEX IF NOT EXISTS idx_client_inputs_status ON client_inputs(input_status);
CREATE INDEX IF NOT EXISTS idx_client_inputs_created_at ON client_inputs(created_at);

-- Add data validation constraints to client_accounts
DO $$ 
BEGIN
    -- Add URL format constraints
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'check_website_url'
    ) THEN
        ALTER TABLE client_accounts
        ADD CONSTRAINT check_website_url 
        CHECK (website_url IS NULL OR website_url ~* '^https?://.*$');
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'check_linkedin_url'
    ) THEN
        ALTER TABLE client_accounts
        ADD CONSTRAINT check_linkedin_url 
        CHECK (linkedin_url IS NULL OR linkedin_url ~* '^https?://([^/]*\.)?linkedin\.com/.*$');
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'check_gstin_format'
    ) THEN
        ALTER TABLE client_accounts
        ADD CONSTRAINT check_gstin_format 
        CHECK (gstin IS NULL OR gstin ~* '^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$');
    END IF;
END $$;

-- Add data validation constraints to client_inputs
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'check_amount_positive'
    ) THEN
        ALTER TABLE client_inputs
        ADD CONSTRAINT check_amount_positive 
        CHECK (amount IS NULL OR amount >= 0);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'check_input_month_range'
    ) THEN
        ALTER TABLE client_inputs
        ADD CONSTRAINT check_input_month_range 
        CHECK (input_month <= CURRENT_DATE);
    END IF;
END $$;