export type InputType = 'routine' | 'onetime';
export type InputStatus = 'review' | 'suspense' | 'verified' | 'cancelled';
export type BookkeepingStatus = 'yes' | 'no';

export interface RoutineInput {
  input_id: string;
  input_code: string;
  client_account_id: string;
  input_type: InputType;
  dated_on: string;
  financial_year: string;
  party_name?: string;
  amount?: number;
  doc_category_id?: string;
  input_status: InputStatus;
  bookkeeping_status: BookkeepingStatus;
  notes?: string;
  created_at: string;
  created_by: string;
  updated_at: string;
  updated_by: string;
  // Joined data
  doc_categories?: {
    doc_category_name: string;
  };
}

export interface RoutineInputActivity {
  activity_id: string;
  input_id: string;
  activity_type: string;
  description: string;
  created_at: string;
  users: {
    first_name: string;
    last_name: string;
  };
}