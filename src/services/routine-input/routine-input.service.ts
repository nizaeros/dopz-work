import { supabase } from '../../lib/supabase';
import { handleSupabaseError } from '../../utils/error-handlers';
import { storageService } from '../storage/storage.service';
import { documentService } from '../document/document.service';
import type { RoutineInput } from '../../types/routine-input';
import type { RoutineInputFormData } from '../../pages/client-dashboard/components/routine/components/AddInputModal/types';

export const routineInputService = {
  async getRoutineInputs(clientId: string): Promise<RoutineInput[]> {
    try {
      const { data, error } = await supabase
        .from('client_inputs')
        .select(`
          input_id,
          input_code,
          client_account_id,
          input_type,
          dated_on,
          financial_year,
          party_name,
          amount,
          doc_category_id,
          input_status,
          bookkeeping_status,
          notes,
          created_at,
          created_by,
          updated_at,
          updated_by,
          doc_categories:doc_category_id (
            doc_category_name
          )
        `)
        .eq('client_account_id', clientId)
        .eq('input_type', 'routine')
        .order('dated_on', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      throw handleSupabaseError(error, 'Failed to fetch routine inputs');
    }
  },

  async createRoutineInput(data: { clientId: string } & RoutineInputFormData): Promise<void> {
    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // Start a transaction
      const { data: input, error: inputError } = await supabase
        .from('client_inputs')
        .insert({
          client_account_id: data.clientId,
          input_type: 'routine',
          dated_on: data.dated_on,
          doc_category_id: data.doc_category_id,
          notes: data.notes,
          input_status: 'review',
          bookkeeping_status: 'no',
          created_by: user.id,
          updated_by: user.id
        })
        .select()
        .single();

      if (inputError) throw inputError;

      // Upload files if provided
      if (data.files?.length) {
        const uploadedFiles = await storageService.uploadInputFiles(data.files, input.input_id);
        await documentService.createDocuments(input.input_id, uploadedFiles, user.id);
      }
    } catch (error) {
      throw handleSupabaseError(error, 'Failed to create routine input');
    }
  },

  async getInputActivities(inputId: string) {
    try {
      const { data, error } = await supabase
        .from('input_activities')
        .select(`
          activity_id,
          input_id,
          activity_type,
          description,
          created_at,
          users (
            first_name,
            last_name
          )
        `)
        .eq('input_id', inputId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      throw handleSupabaseError(error, 'Failed to fetch input activities');
    }
  }
};