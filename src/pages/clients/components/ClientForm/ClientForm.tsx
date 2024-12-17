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
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientFormSchema),
    defaultValues: initialData,
  });

  const { industries } = useIndustries();
  const { parentAccounts } = useParentAccounts();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <BasicInformation
        register={register}
        errors={errors}
        industries={industries}
      />

      <RegistrationDetails
        register={register}
        errors={errors}
      />

      <LocationInformation
        register={register}
        errors={errors}
        watch={watch}
        setValue={setValue}
      />

      <OnlinePresence
        register={register}
        errors={errors}
      />

      <ParentAccounts
        register={register}
        errors={errors}
        parentAccounts={parentAccounts}
      />

      <CompanyLogo
        watch={watch}
        setValue={setValue}
        error={errors.logo_file?.message}
      />

      <div className="flex justify-end space-x-4">
        <Button
          type="submit"
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          {initialData ? 'Update Client' : 'Create Client'}
        </Button>
      </div>
    </form>
  );
};