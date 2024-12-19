import { supabase } from '../../lib/supabase';
import { handleSupabaseError } from '../../utils/error-handlers';

interface DocumentUpload {
  url: string;
  name: string;
  type: string;
  size: number;
}

export const documentService = {
  async createDocuments(
    entityId: string,
    documents: DocumentUpload[],
    userId: string
  ): Promise<void> {
    try {
      if (!documents.length) return;

      const documentRecords = documents.map(doc => ({
        entity_type: 'client_input',
        entity_id: entityId,
        document_url: doc.url,
        file_name: doc.name,
        file_type: doc.type,
        file_size: doc.size,
        created_by: userId,
        updated_by: userId
      }));

      const { error } = await supabase
        .from('documents')
        .insert(documentRecords);

      if (error) throw error;
    } catch (error) {
      throw handleSupabaseError(error, 'Failed to create document records');
    }
  },

  async getDocuments(entityId: string): Promise<DocumentUpload[]> {
    try {
      const { data, error } = await supabase
        .from('documents')
        .select('document_id, document_url, file_name, file_type, file_size')
        .eq('entity_id', entityId)
        .eq('entity_type', 'client_input')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      throw handleSupabaseError(error, 'Failed to fetch documents');
    }
  },

  async deleteDocument(documentId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('documents')
        .delete()
        .eq('document_id', documentId);

      if (error) throw error;
    } catch (error) {
      throw handleSupabaseError(error, 'Failed to delete document');
    }
  }
};