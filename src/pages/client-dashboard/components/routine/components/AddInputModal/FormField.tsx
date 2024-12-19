import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FormFieldProps {
  label: string;
  error?: string;
  children: React.ReactNode;
  icon?: LucideIcon;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  children,
  icon: Icon
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}
        {children}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};