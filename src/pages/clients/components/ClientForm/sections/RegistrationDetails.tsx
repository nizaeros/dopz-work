import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { Hash } from 'lucide-react';
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
      <h3 className="text-lg font-medium text-gray-900">Registration Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Input
          {...register('gstin')}
          label="GSTIN"
          icon={Hash}
          error={errors.gstin?.message}
        />
        <Input
          {...register('tan')}
          label="TAN"
          icon={Hash}
          error={errors.tan?.message}
        />
        <Input
          {...register('icn')}
          label="ICN"
          icon={Hash}
          error={errors.icn?.message}
        />
      </div>
    </div>
  );
};