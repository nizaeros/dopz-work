import { supabase } from '../../lib/supabase';
import { handleSupabaseError } from '../../utils/error-handlers';
import type { RoutineInput } from '../../types/routine-input';

export const routineInputMigrationService = {
  async migrateFromClientInputs(): Promise<{ success: boolean; count: number }> {
    try {
      // Fetch data from client_inputs table
      const { data: clientInputs, error: fetchError } = await supabase
        .from('client_inputs')
        .select(`
          input_id,
          input_code,
          client_account_id,
          input_month,
          dated_on,
          category,
          input_status,
          party_name,
          amount,
          bookkeeping_status,
          notes,
          created_at,
          created_by,
          updated_at,
          updated_by
        `);

      if (fetchError) throw fetchError;

      if (!clientInputs?.length) {
        return { success: true, count: 0 };
      }

      // Map the data to match routine_inputs structure
      const routineInputs = clientInputs.map(input => ({
        input_id: input.input_id,
        input_code: input.input_code,
        client_account_id: input.client_account_id,
        input_month: input.input_month,
        dated_on: input.dated_on,
        category: input.category,
        input_status: input.input_status,
        party_name: input.party_name,
        amount: input.amount,
        bookkeeping_status: input.bookkeeping_status,
        notes: input.notes,
        created_at: input.created_at,
        created_by: input.created_by,
        updated_at: input.updated_at,
        updated_by: input.updated_by
      }));

      // Insert data into routine_inputs table
      const { error: insertError } = await supabase
        .from('routine_inputs')
        .upsert(routineInputs, {
          onConflict: 'input_id',
          ignoreDuplicates: false
        });

      if (insertError) throw insertError;

      return { success: true, count: routineInputs.length };
    } catch (error) {
      throw handleSupabaseError(error, 'Failed to migrate routine input data');
    }
  },

  async verifyMigration(): Promise<{
    sourceCount: number;
    targetCount: number;
    isComplete: boolean;
  }> {
    try {
      // Get count from source table
      const { count: sourceCount, error: sourceError } = await supabase
        .from('client_inputs')
        .select('*', { count: 'exact', head: true });

      if (sourceError) throw sourceError;

      // Get count from target table
      const { count: targetCount, error: targetError } = await supabase
        .from('routine_inputs')
        .select('*', { count: 'exact', head: true });

      if (targetError) throw targetError;

      return {
        sourceCount: sourceCount || 0,
        targetCount: targetCount || 0,
        isComplete: (sourceCount || 0) === (targetCount || 0)
      };
    } catch (error) {
      throw handleSupabaseError(error, 'Failed to verify migration');
    }
  }
};