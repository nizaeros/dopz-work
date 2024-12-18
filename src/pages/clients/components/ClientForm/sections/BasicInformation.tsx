import React from 'react';
import { UseFormRegister, FieldErrors, UseFormWatch, Control, Controller } from 'react-hook-form';
import { Building2, Briefcase, Users } from 'lucide-react';
import { Input } from '../../../../../components/ui/Input';
import { AccountType, EntityType } from '../../../../../types/enums';
import type { ClientFormData } from '../../../../../types/forms';

interface BasicInformationProps {
  register: UseFormRegister<ClientFormData>;
  watch: UseFormWatch<ClientFormData>;
  control: Control<ClientFormData>;
  errors: FieldErrors<ClientFormData>;
  industries: Array<{ id: string; name: string; }>;
  initialData?: Partial<ClientFormData>;
}

export const BasicInformation: React.FC<BasicInformationProps> = ({
  register,
  control,
  errors,
  industries,
  initialData
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Building2 className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            {...register('friendly_name')}
            label="Client Name"
            placeholder="Enter client name"
            error={errors.friendly_name?.message}
            required
          />
          <Input
            {...register('registered_name')}
            label="Registered Name"
            placeholder="Enter registered name"
            error={errors.registered_name?.message}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Account Type</label>
            <div className="relative">
              <Controller
                name="account_type"
                control={control}
                defaultValue={initialData?.account_type}
                render={({ field }) => (
                  <select
                    {...field}
                    className="appearance-none w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary bg-white"
                  >
                    {Object.entries(AccountType).map(([key, value]) => (
                      <option key={value} value={value}>
                        {key}
                      </option>
                    ))}
                  </select>
                )}
              />
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            {errors.account_type?.message && (
              <p className="mt-1 text-sm text-red-600">{errors.account_type.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Entity Type</label>
            <div className="relative">
              <Controller
                name="entity_type"
                control={control}
                defaultValue={initialData?.entity_type}
                render={({ field }) => (
                  <select
                    {...field}
                    className="appearance-none w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary bg-white"
                  >
                    {Object.entries(EntityType).map(([key, value]) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                )}
              />
              <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            {errors.entity_type?.message && (
              <p className="mt-1 text-sm text-red-600">{errors.entity_type.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
          <div className="relative">
            <Controller
              name="industry_id"
              control={control}
              defaultValue={initialData?.industry_id}
              render={({ field }) => (
                <select
                  {...field}
                  className="appearance-none w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary bg-white"
                >
                  <option value="">Select Industry</option>
                  {industries.map((industry) => (
                    <option key={industry.id} value={industry.id}>
                      {industry.name}
                    </option>
                  ))}
                </select>
              )}
            />
            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
          {errors.industry_id?.message && (
            <p className="mt-1 text-sm text-red-600">{errors.industry_id.message}</p>
          )}
        </div>
      </div>
    </div>
  );
};