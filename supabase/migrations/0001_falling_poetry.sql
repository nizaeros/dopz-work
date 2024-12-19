-- Verify schema access by checking existing tables
DO $$ 
BEGIN
  -- Check if client_accounts table exists
  IF EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'client_accounts'
  ) THEN
    RAISE NOTICE 'client_accounts table exists';
  ELSE
    RAISE NOTICE 'client_accounts table does not exist';
  END IF;

  -- Check if users table exists
  IF EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'users'
  ) THEN
    RAISE NOTICE 'users table exists';
  ELSE
    RAISE NOTICE 'users table does not exist';
  END IF;
END $$;