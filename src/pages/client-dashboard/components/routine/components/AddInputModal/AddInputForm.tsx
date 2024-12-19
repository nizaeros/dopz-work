import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon, FileText, Upload, X } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { Button } from '../../../../../../components/ui/Button';
import { FormField } from './FormField';
import { useDocCategories } from '../../hooks/useDocCategories';
import { LoadingSpinner } from '../../../../../../components/ui/LoadingSpinner';
import { routineInputSchema } from './validation';
import type { RoutineInputFormData } from './types';

interface AddInputFormProps {
  onSubmit: (data: RoutineInputFormData) => Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export const AddInputForm: React.FC<AddInputFormProps> = ({
  onSubmit,
  onCancel,
  isSubmitting = false,
}) => {
  const { categories, loading: categoriesLoading, error: categoriesError } = useDocCategories();
  
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<RoutineInputFormData>({
    resolver: zodResolver(routineInputSchema),
    defaultValues: {
      dated_on: new Date().toISOString().split('T')[0],
      files: []
    }
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setValue('files', acceptedFiles, { shouldValidate: true });
  }, [setValue]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt']
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    multiple: true
  });

  const files = watch('files') || [];

  const removeFile = (index: number) => {
    const currentFiles = [...files];
    currentFiles.splice(index, 1);
    setValue('files', currentFiles, { shouldValidate: true });
  };

  if (categoriesLoading) {
    return (
      <div className="flex justify-center py-8">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (categoriesError) {
    return (
      <div className="text-red-600 text-center py-8">
        Failed to load categories. Please try again.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Date and Category */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Date"
          error={errors.dated_on?.message}
          icon={CalendarIcon}
          required
        >
          <input
            type="date"
            {...register('dated_on')}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
          />
        </FormField>

        <FormField
          label="Category"
          error={errors.doc_category_id?.message}
          icon={FileText}
          required
        >
          <select
            {...register('doc_category_id')}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
          >
            <option value="">Select category</option>
            {categories.map(category => (
              <option key={category.doc_category_id} value={category.doc_category_id}>
                {category.doc_category_name}
              </option>
            ))}
          </select>
        </FormField>
      </div>

      {/* Notes */}
      <FormField
        label="Notes"
        error={errors.notes?.message}
      >
        <textarea
          {...register('notes')}
          rows={3}
          placeholder="Add any reference or notes..."
          className="block w-full border border-gray-300 rounded-md focus:ring-primary focus:border-primary resize-none p-2"
        />
      </FormField>

      {/* File Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Upload Files
          <span className="text-gray-400 text-xs ml-1">(Max 5MB per file)</span>
        </label>
        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
            transition-colors duration-200
            ${isDragActive ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-gray-400'}
            ${errors.files ? 'border-red-300 bg-red-50' : ''}
          `}
        >
          <input {...getInputProps()} />
          <div className="space-y-2">
            <Upload className="h-8 w-8 mx-auto text-gray-400" />
            <p className="text-sm text-gray-600">
              {isDragActive ? (
                'Drop files here'
              ) : (
                'Drag & drop files here, or click to browse'
              )}
            </p>
            <p className="text-xs text-gray-500">
              Supported formats: PDF, JPG, PNG, EXCEL, DOC, DOCX, TXT
            </p>
          </div>
        </div>

        {/* Selected Files List */}
        {files.length > 0 && (
          <div className="mt-2 space-y-1">
            {files.map((file, index) => (
              <div key={index} className="text-sm text-gray-600 flex items-center justify-between bg-gray-50 p-2 rounded">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span className="truncate">{file.name}</span>
                  <span className="text-xs text-gray-400">
                    ({Math.round(file.size / 1024)}KB)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="p-1 hover:bg-gray-200 rounded-full"
                >
                  <X className="h-4 w-4 text-gray-500" />
                </button>
              </div>
            ))}
          </div>
        )}

        {errors.files && (
          <p className="mt-1 text-sm text-red-600">{errors.files.message}</p>
        )}
      </div>

      {/* Form Actions */}
      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          Submit
        </Button>
      </div>
    </form>
  );
};