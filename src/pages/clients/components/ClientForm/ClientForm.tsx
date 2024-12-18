import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../../../../components/ui/Button';
import { BasicInformation } from './sections/BasicInformation';
import { RegistrationDetails } from './sections/RegistrationDetails';
import { OnlinePresence } from './sections/OnlinePresence';
import { ParentAccounts } from './sections/ParentAccounts';
import { CompanyLogo } from './sections/CompanyLogo';
import { LocationInformation } from './sections/LocationInformation';
import { useIndustries } from './hooks/useIndustries';
import { useParentAccounts } from './hooks/useParentAccounts';
import { clientFormSchema } from '../../../../types/forms';
import type { ClientFormData } from '../../../../types/forms';

interface ClientFormProps {
  onSubmit: (data: ClientFormData) => Promise<void>;
  initialData?: Partial<ClientFormData>;
  isSubmitting?: boolean;
}

export const ClientForm: React.FC<ClientFormProps> = ({
  onSubmit,
  initialData,
  isSubmitting = false,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    control
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientFormSchema),
    defaultValues: initialData,
  });

  const { industries } = useIndustries();
  const { parentAccounts } = useParentAccounts();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-5xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Basic Info & Company Logo */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <BasicInformation
              register={register}
              watch={watch}
              control={control}
              errors={errors}
              industries={industries}
              initialData={initialData}
            />
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <RegistrationDetails
              register={register}
              errors={errors}
            />
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <OnlinePresence
              register={register}
              errors={errors}
            />
          </div>
        </div>

        {/* Right Column - Logo & Location */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <CompanyLogo
              watch={watch}
              setValue={setValue}
              error={errors.logo_file?.message}
            />
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <LocationInformation
              register={register}
              errors={errors}
              watch={watch}
              setValue={setValue}
              initialData={initialData}
            />
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <ParentAccounts
              register={register}
              setValue={setValue}
              errors={errors}
              parentAccounts={parentAccounts}
              initialData={initialData}
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-8 flex justify-end">
        <Button
          type="submit"
          loading={isSubmitting}
          disabled={isSubmitting}
          className="px-8"
        >
          {initialData ? 'Update Client' : 'Create Client'}
        </Button>
      </div>
    </form>
  );
};