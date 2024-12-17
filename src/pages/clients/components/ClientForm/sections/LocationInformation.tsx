import React from 'react';
import { UseFormRegister, FieldErrors, UseFormWatch, UseFormSetValue } from 'react-hook-form';
import { LoadingSpinner } from '../../../../../components/ui/LoadingSpinner';
import { LocationSelect } from '../../../../../components/ui/LocationSelect';
import type { ClientFormData, LocationOption } from '../../../../../types/forms';

interface LocationInformationProps {
  register: UseFormRegister<ClientFormData>;
  errors: FieldErrors<ClientFormData>;
  watch: UseFormWatch<ClientFormData>;
  setValue: UseFormSetValue<ClientFormData>;
  countries: LocationOption[];
  states: LocationOption[];
  cities: LocationOption[];
  loading?: boolean;
}

export const LocationInformation: React.FC<LocationInformationProps> = ({
  register,
  errors,
  watch,
  setValue,
  countries,
  states,
  cities,
  loading = false,
}) => {
  const selectedCountry = watch('country_id');
  const selectedState = watch('state_id');

  // Reset dependent fields when parent field changes
  React.useEffect(() => {
    if (!selectedCountry) {
      setValue('state_id', null);
      setValue('city_id', null);
    }
  }, [selectedCountry, setValue]);

  React.useEffect(() => {
    if (!selectedState) {
      setValue('city_id', null);
    }
  }, [selectedState, setValue]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Location</h3>
        {loading && <LoadingSpinner size="small" />}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <LocationSelect
          label="Country"
          value={selectedCountry}
          options={countries}
          onChange={(value) => setValue('country_id', value)}
          disabled={loading}
          optional
        />

        <LocationSelect
          label="State"
          value={selectedState}
          options={states}
          onChange={(value) => setValue('state_id', value)}
          disabled={!selectedCountry || loading}
          optional
        />

        <LocationSelect
          label="City"
          value={watch('city_id')}
          options={cities}
          onChange={(value) => setValue('city_id', value)}
          disabled={!selectedState || loading}
          optional
        />
      </div>
    </div>
  );
};