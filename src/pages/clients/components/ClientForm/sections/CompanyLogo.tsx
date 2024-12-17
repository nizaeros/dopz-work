import React from 'react';
import { UseFormWatch, UseFormSetValue } from 'react-hook-form';
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
      <h3 className="text-lg font-medium text-gray-900">Company Logo</h3>
      <FileUpload
        label="Logo"
        onFileSelect={handleLogoSelect}
        onFileRemove={handleLogoRemove}
        selectedFile={watch('logo_file')}
        error={error}
      />
    </div>
  );
};