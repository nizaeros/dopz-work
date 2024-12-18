import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { Hash, FileText } from 'lucide-react';
import { Input } from '../../../../../components/ui/Input';
import type { ClientFormData } from '../../../../../types/forms';

interface RegistrationDetailsProps {
  register: UseFormRegister<ClientFormData>;
  errors: FieldErrors<ClientFormData>;
}

export const RegistrationDetails: React.FC<RegistrationDetailsProps> = ({
  register,
  errors,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <FileText className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold text-gray-900">Registration Details</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Input
          {...register('gstin')}
          label="GSTIN"
          placeholder="Enter GSTIN"
          icon={Hash}
          error={errors.gstin?.message}
        />
        <Input
          {...register('tan')}
          label="TAN"
          placeholder="Enter TAN"
          icon={Hash}
          error={errors.tan?.message}
        />
        <Input
          {...register('icn')}
          label="ICN"
          placeholder="Enter ICN"
          icon={Hash}
          error={errors.icn?.message}
        />
      </div>
    </div>
  );
};