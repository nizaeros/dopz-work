import { z } from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-excel',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain'
];

export const routineInputSchema = z.object({
  dated_on: z.string().min(1, 'Date is required'),
  doc_category_id: z.string().uuid('Please select a valid category'),
  notes: z.string().optional(),
  files: z.array(z.custom<File>((file) => {
    if (!(file instanceof File)) {
      return false;
    }
    if (file.size > MAX_FILE_SIZE) {
      return false;
    }
    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
      return false;
    }
    return true;
  }, 'Please upload valid files (PDF, JPG, PNG, EXCEL, DOC, DOCX, TXT) under 5MB'))
    .default([])
});

export type RoutineInputFormData = z.infer<typeof routineInputSchema>;