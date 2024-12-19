-- Alter client_inputs table to make party_name and amount optional
ALTER TABLE public.client_inputs 
    ALTER COLUMN party_name DROP NOT NULL,
    ALTER COLUMN amount DROP NOT NULL,
    ALTER COLUMN input_status SET DEFAULT 'review'::input_status,
    ALTER COLUMN bookkeeping_status SET DEFAULT 'no'::bookkeeping_status;