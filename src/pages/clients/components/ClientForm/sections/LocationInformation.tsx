import React from 'react';
import { UseFormRegister, UseFormWatch, UseFormSetValue, FieldErrors } from 'react-hook-form';
import { LocationSelect } from '../../../../../components/ui/LocationSelect';
import { useLocations } from '../hooks/useLocations';
import type { ClientFormData } from '../../../../../types/forms';

interface LocationInformationProps {
  register: UseFormRegister<ClientFormData>;
  watch: UseFormWatch<ClientFormData>;
  setValue: UseFormSetValue<ClientFormData>;
  errors: FieldErrors<ClientFormData>;
}

export const LocationInformation: React.FC<LocationInformationProps> = ({
  register,
  watch,
  setValue,
  errors
}) => {
  const { countries, states, cities, loading } = useLocations(watch);

  // Clear dependent fields when parent selection changes
  React.useEffect(() => {
    if (!watch('country_id')) {
      setValue('state_id', '');
      setValue('city_id', '');
    }
  }, [watch('country_id'), setValue]);

  React.useEffect(() => {
    if (!watch('state_id')) {
      setValue('city_id', '');
    }
  }, [watch('state_id'), setValue]);

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Location Information</h3>
      <div className="grid grid-cols-1 gap-6">
        <LocationSelect
          label="Country"
          name="country_id"
          register={register}
          options={countries}
          error={errors.country_id?.message}
          disabled={loading}
        />

        <LocationSelect
          label="State"
          name="state_id"
          register={register}
          options={states}
          error={errors.state_id?.message}
          disabled={!watch('country_id') || loading}
        />

        <LocationSelect
          label="City"
          name="city_id"
          register={register}
          options={cities}
          error={errors.city_id?.message}
          disabled={!watch('state_id') || loading}
        />
      </div>
    </div>
  );
};