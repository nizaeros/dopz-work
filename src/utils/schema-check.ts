import { supabase } from '../lib/supabase';

export async function verifySchema() {
  try {
    // Try to query the client_accounts table
    const { data: clients, error: clientError } = await supabase
      .from('client_accounts')
      .select('client_account_id')
      .limit(1);

    if (clientError) {
      console.error('Error accessing client_accounts:', clientError);
      return false;
    }

    // Try to query the users table
    const { data: users, error: userError } = await supabase
      .from('users')
      .select('auth_id')
      .limit(1);

    if (userError) {
      console.error('Error accessing users:', userError);
      return false;
    }

    console.log('Schema verification successful');
    return true;
  } catch (error) {
    console.error('Schema verification failed:', error);
    return false;
  }
}