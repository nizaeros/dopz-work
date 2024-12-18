import React, { useEffect } from 'react';
import { UseFormRegister, UseFormWatch, UseFormSetValue, FieldErrors } from 'react-hook-form';
import { MapPin } from 'lucide-react';
import { LocationSelect } from '../../../../../components/ui/LocationSelect';
import { useLocations } from '../hooks/useLocations';
import type { ClientFormData } from '../../../../../types/forms';

interface LocationInformationProps {
  register: UseFormRegister<ClientFormData>;
  watch: UseFormWatch<ClientFormData>;
  setValue: UseFormSetValue<ClientFormData>;
  errors: FieldErrors<ClientFormData>;
  initialData?: Partial<ClientFormData>;
}

export const LocationInformation: React.FC<LocationInformationProps> = ({
  register,
  watch,
  setValue,
  errors,
  initialData
}) => {
  const countryId = watch('country_id');
  const stateId = watch('state_id');
  const cityId = watch('city_id');
  
  const { countries, states, cities, loading } = useLocations(countryId, stateId);

  // Set initial values when component mounts
  useEffect(() => {
    if (initialData) {
      if (initialData.country_id) {
        setValue('country_id', initialData.country_id, { shouldValidate: true });
      }
      if (initialData.state_id) {
        setValue('state_id', initialData.state_id, { shouldValidate: true });
      }
      if (initialData.city_id) {
        setValue('city_id', initialData.city_id, { shouldValidate: true });
      }
    }
  }, [initialData, setValue]);

  // Clear dependent fields when parent selection changes
  useEffect(() => {
    if (!countryId) {
      setValue('state_id', '');
      setValue('city_id', '');
    }
  }, [countryId, setValue]);

  useEffect(() => {
    if (!stateId) {
      setValue('city_id', '');
    }
  }, [stateId, setValue]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <MapPin className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold text-gray-900">Location Information</h3>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <LocationSelect
          label="Country"
          name="country_id"
          register={register}
          options={countries}
          error={errors.country_id?.message}
          disabled={loading}
          value={countryId}
        />

        <LocationSelect
          label="State"
          name="state_id"
          register={register}
          options={states}
          error={errors.state_id?.message}
          disabled={!countryId || loading}
          value={stateId}
        />

        <LocationSelect
          label="City"
          name="city_id"
          register={register}
          options={cities}
          error={errors.city_id?.message}
          disabled={!stateId || loading}
          value={cityId}
        />
      </div>
    </div>
  );
};