import React, { useState } from 'react';
import { LocationSelect } from './LocationSelect';
import { CityAutocomplete } from './CityAutocomplete';
import { useLocations } from '../../hooks/useLocations';

interface LocationSelectionProps {
  onLocationSelect: (cityId: string | null, stateId: string | null, countryId: string | null) => void;
  className?: string;
}

export const LocationSelection: React.FC<LocationSelectionProps> = ({
  onLocationSelect,
  className = ''
}) => {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const { countries, loading } = useLocations();

  const handleCountryChange = (countryId: string | null) => {
    setSelectedCountry(countryId);
    // Clear city and state when country changes
    onLocationSelect(null, null, countryId);
  };

  const handleCitySelect = (cityId: string | null, stateId: string | null, countryId: string | null) => {
    onLocationSelect(cityId, stateId, countryId);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Country Selection */}
      <LocationSelect
        label="Country"
        value={selectedCountry}
        options={countries}
        onChange={handleCountryChange}
        disabled={loading}
        optional
      />

      {/* City Search with State Auto-population */}
      <CityAutocomplete
        onCitySelect={handleCitySelect}
        countryId={selectedCountry}
        disabled={!selectedCountry}
      />
    </div>
  );
};