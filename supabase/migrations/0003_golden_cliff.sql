/*
  # Create Input Status Enums
  
  1. New Types
    - input_status: Enum for tracking input document status
    - bookkeeping_status: Enum for tracking bookkeeping status
*/

-- Create input status enum
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'input_status') THEN
    CREATE TYPE input_status AS ENUM (
      'review',
      'suspense', 
      'verified',
      'cancelled'
    );
  END IF;
END $$;

-- Create bookkeeping status enum
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'bookkeeping_status') THEN
    CREATE TYPE bookkeeping_status AS ENUM ('yes', 'no');
  END IF;
END $$;