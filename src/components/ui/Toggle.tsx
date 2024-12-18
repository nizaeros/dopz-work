import React from 'react';

interface ToggleProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export const Toggle: React.FC<ToggleProps> = ({
  label,
  checked,
  onChange,
  disabled = false
}) => {
  return (
    <label className="flex items-center cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
        />
        <div className={`
          block w-14 h-8 rounded-full transition-colors duration-200
          ${checked ? 'bg-primary' : 'bg-gray-200'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `} />
        <div className={`
          absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-200
          ${checked ? 'translate-x-6' : 'translate-x-0'}
        `} />
      </div>
      <span className={`ml-3 text-sm ${disabled ? 'text-gray-400' : 'text-gray-700'}`}>
        {label}
      </span>
    </label>
  );
};