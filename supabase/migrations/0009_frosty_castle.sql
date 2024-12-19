/*
  # Add Document Categories Table and Data

  1. New Tables
    - doc_categories
      - doc_category_id (uuid, primary key)
      - doc_category_name (text, unique)
      - is_active (boolean)
      - created_at (timestamptz)
      - updated_at (timestamptz)

  2. Security
    - Enable RLS
    - Add policies for read access
*/

-- Create doc_categories table
CREATE TABLE IF NOT EXISTS doc_categories (
  doc_category_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  doc_category_name text NOT NULL UNIQUE,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE doc_categories ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow read access for authenticated users"
  ON doc_categories
  FOR SELECT
  TO authenticated
  USING (true);

-- Insert default categories
INSERT INTO doc_categories (doc_category_name) VALUES
  ('Bank Statement'),
  ('Invoice'),
  ('Receipt'),
  ('Purchase Order'),
  ('Contract'),
  ('Tax Document'),
  ('Expense Report'),
  ('Financial Statement'),
  ('Payroll Document'),
  ('Other')
ON CONFLICT (doc_category_name) DO NOTHING;