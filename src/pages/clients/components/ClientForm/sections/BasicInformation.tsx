import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { Building2 } from 'lucide-react';
import { Input } from '../../../../../components/ui/Input';
import { AccountType, EntityType } from '../../../../../types/enums';
import type { ClientFormData } from '../../../../../types/forms';

interface BasicInformationProps {
  register: UseFormRegister<ClientFormData>;
  errors: FieldErrors<ClientFormData>;
  industries: Array<{ id: string; name: string; }>;
}

export const BasicInformation: React.FC<BasicInformationProps> = ({
  register,
  errors,
  industries,
}) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          {...register('friendly_name')}
          label="Client Name"
          icon={Building2}
          error={errors.friendly_name?.message}
          required
        />
        <Input
          {...register('registered_name')}
          label="Registered Name"
          icon={Building2}
          error={errors.registered_name?.message}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Account Type</label>
          <select
            {...register('account_type')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          >
            {Object.entries(AccountType).map(([key, value]) => (
              <option key={value} value={value}>
                {key}
              </option>
            ))}
          </select>
          {errors.account_type?.message && (
            <p className="mt-1 text-sm text-red-600">{errors.account_type.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Entity Type</label>
          <select
            {...register('entity_type')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          >
            {Object.entries(EntityType).map(([key, value]) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
          {errors.entity_type?.message && (
            <p className="mt-1 text-sm text-red-600">{errors.entity_type.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Industry</label>
        <select
          {...register('industry_id')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
        >
          <option value="">Select Industry</option>
          {industries.map((industry) => (
            <option key={industry.id} value={industry.id}>
              {industry.name}
            </option>
          ))}
        </select>
        {errors.industry_id?.message && (
          <p className="mt-1 text-sm text-red-600">{errors.industry_id.message}</p>
        )}
      </div>
    </div>
  );
};