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
  value?: string;
}

export const LocationSelect: React.FC<LocationSelectProps> = ({
  label,
  name,
  register,
  options,
  error,
  disabled = false,
  value
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        <span className="text-gray-400 text-xs ml-1">(Optional)</span>
      </label>
      <select
        {...register(name)}
        value={value || ""}
        disabled={disabled}
        className={`
          mt-1 block w-full rounded-md shadow-sm
          border border-gray-300
          ${disabled ? 'bg-gray-50' : 'bg-white'}
          transition-colors duration-200
          focus:outline-none
          ${error 
            ? 'border-error focus:ring-2 focus:ring-error/20 focus:border-error' 
            : 'focus:ring-2 focus:ring-primary/20 focus:border-primary'
          }
          disabled:cursor-not-allowed disabled:opacity-50
        `}
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option 
            key={`${name}-${option.id}`} 
            value={option.id}
          >
            {option.name}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-error">{error}</p>}
    </div>
  );
};