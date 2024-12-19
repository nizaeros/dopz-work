/*
  # Client Inputs Schema
  
  1. New Types
    - input_status: Enum for tracking input status
    - bookkeeping_status: Enum for tracking bookkeeping status
  
  2. New Tables
    - client_inputs: Tracks client input documents and data
  
  3. Features
    - Automatic input code generation
    - Audit trail for updates
    - Optimized indexes for common queries
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

-- Create sequence for input codes
CREATE SEQUENCE IF NOT EXISTS input_code_seq START 1;

-- Create client_inputs table
CREATE TABLE IF NOT EXISTS client_inputs (
  input_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  input_code text NOT NULL UNIQUE,
  client_account_id uuid NOT NULL REFERENCES client_accounts(client_account_id),
  input_month date NOT NULL,
  dated_on date,
  category text NOT NULL,
  input_status input_status NOT NULL DEFAULT 'review',
  party_name text,
  amount numeric(15,2),
  bookkeeping_status bookkeeping_status NOT NULL DEFAULT 'no',
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  created_by uuid NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now(),
  updated_by uuid NOT NULL
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_client_inputs_client_account ON client_inputs(client_account_id);
CREATE INDEX IF NOT EXISTS idx_client_inputs_status ON client_inputs(input_status);
CREATE INDEX IF NOT EXISTS idx_client_inputs_month ON client_inputs(input_month);