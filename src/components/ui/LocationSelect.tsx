import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import type { ClientFormData } from '../../types/forms';

interface LocationSelectProps {
  label: string;
  name: keyof ClientFormData;
  register: UseFormRegister<ClientFormData>;
  options: Array<{ id: string; name: string }>;
  error?: string;
  disabled?: boolean;
}

export const LocationSelect: React.FC<LocationSelectProps> = ({
  label,
  name,
  register,
  options,
  error,
  disabled = false
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        <span className="text-gray-400 text-xs ml-1">(Optional)</span>
      </label>
      <select
        {...register(name)}
        disabled={disabled}
        className={`
          mt-1 block w-full rounded-md shadow-sm
          ${disabled ? 'bg-gray-50' : 'bg-white'}
          border-gray-300 focus:border-primary focus:ring-primary
          disabled:cursor-not-allowed disabled:opacity-50
        `}
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={`${name}-${option.id}`} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};