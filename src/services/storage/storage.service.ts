import { supabase } from '../../lib/supabase';
import { handleSupabaseError } from '../../utils/error-handlers';

interface UploadResult {
  url: string;
  name: string;
  type: string;
  size: number;
}

const ACCEPTED_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-excel',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain'
];

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const storageService = {
  async uploadInputFiles(files: File[] | FileList, inputId: string): Promise<UploadResult[]> {
    try {
      const fileArray = Array.from(files);
      const uploadPromises = fileArray.map(async (file) => {
        // Validate file size
        if (file.size > MAX_FILE_SIZE) {
          throw new Error(`File ${file.name} exceeds 5MB limit`);
        }

        // Validate file type
        if (!ACCEPTED_TYPES.includes(file.type)) {
          throw new Error(`File ${file.name} has unsupported type. Supported formats: PDF, JPG, PNG, EXCEL, DOC, DOCX, TXT`);
        }

        // Create safe filename
        const fileExt = file.name.split('.').pop()?.toLowerCase();
        const safeFileName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
        const filePath = `inputs/${inputId}/${safeFileName}`;

        // Upload file
        const { error: uploadError } = await supabase.storage
          .from('client-documents')
          .upload(filePath, file, {
            cacheControl: '3600',
            contentType: file.type,
            upsert: false
          });

        if (uploadError) throw uploadError;

        // Get public URL
        const { data } = supabase.storage
          .from('client-documents')
          .getPublicUrl(filePath);

        return {
          url: data.publicUrl,
          name: file.name,
          type: file.type,
          size: file.size
        };
      });

      return await Promise.all(uploadPromises);
    } catch (error) {
      throw handleSupabaseError(error, 'Failed to upload files');
    }
  },

  async deleteFile(filePath: string): Promise<void> {
    try {
      const { error } = await supabase.storage
        .from('client-documents')
        .remove([filePath]);

      if (error) throw error;
    } catch (error) {
      throw handleSupabaseError(error, 'Failed to delete file');
    }
  }
};