import React from 'react';
import { UseFormWatch, UseFormSetValue } from 'react-hook-form';
import { Image } from 'lucide-react';
import { FileUpload } from '../../../../../components/ui/FileUpload';
import type { ClientFormData } from '../../../../../types/forms';

interface CompanyLogoProps {
  watch: UseFormWatch<ClientFormData>;
  setValue: UseFormSetValue<ClientFormData>;
  error?: string;
}

export const CompanyLogo: React.FC<CompanyLogoProps> = ({
  watch,
  setValue,
  error,
}) => {
  const handleLogoSelect = (file: File) => {
    setValue('logo_file', file);
  };

  const handleLogoRemove = () => {
    setValue('logo_file', undefined);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Image className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold text-gray-900">Company Logo</h3>
      </div>

      <FileUpload
        label="Logo"
        onFileSelect={handleLogoSelect}
        onFileRemove={handleLogoRemove}
        selectedFile={watch('logo_file')}
        error={error}
        accept={{
          'image/*': ['.png', '.jpg', '.jpeg', '.gif']
        }}
        maxSize={5 * 1024 * 1024} // 5MB
      />
    </div>
  );
};