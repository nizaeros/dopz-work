import React from 'react';
import type { LocationOption } from '../../types/forms';

interface LocationSelectProps {
  label: string;
  value: string | null;
  options: LocationOption[];
  onChange: (value: string | null) => void;
  disabled?: boolean;
  optional?: boolean;
}

export const LocationSelect: React.FC<LocationSelectProps> = ({
  label,
  value,
  options,
  onChange,
  disabled = false,
  optional = false,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value || null;
    onChange(newValue);
  };

  // Generate a unique identifier for this select component
  const selectId = React.useMemo(() => 
    `location-select-${label.toLowerCase().replace(/\s+/g, '-')}`,
    [label]
  );

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {optional && <span className="text-gray-400 text-xs ml-1">(Optional)</span>}
      </label>
      <select
        id={selectId}
        value={value || ''}
        onChange={handleChange}
        className={`
          mt-1 block w-full rounded-md shadow-sm
          ${disabled ? 'bg-gray-50' : 'bg-white'}
          border-gray-300 focus:border-primary focus:ring-primary
          disabled:cursor-not-allowed disabled:opacity-50
        `}
        disabled={disabled}
      >
        <option key={`${selectId}-placeholder`} value="">
          Select {label}
        </option>
        {options.map((option) => (
          <option key={`${selectId}-${option.id}`} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};