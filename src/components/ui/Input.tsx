import React, { forwardRef, InputHTMLAttributes } from 'react';
import { LucideIcon } from 'lucide-react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: LucideIcon;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, icon: Icon, error, className = '', ...props }, ref) => {
    return (
      <div>
        <label htmlFor={props.id} className="block text-sm font-medium text-gray-700">
          {label}
          {props.required && <span className="text-error ml-1">*</span>}
        </label>
        <div className="mt-1 relative">
          {Icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon className="h-5 w-5 text-gray-400" />
            </div>
          )}
          <input
            ref={ref}
            {...props}
            className={`
              appearance-none block w-full 
              ${Icon ? 'pl-10' : 'pl-3'} 
              pr-3 py-2 
              border border-gray-300 
              rounded-md 
              shadow-sm 
              placeholder-gray-400
              transition-colors
              duration-200
              focus:outline-none
              ${error 
                ? 'border-error focus:ring-2 focus:ring-error/20 focus:border-error' 
                : 'focus:ring-2 focus:ring-primary/20 focus:border-primary'
              }
              ${props.disabled ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'}
              ${className}
            `}
          />
        </div>
        {error && <p className="mt-1 text-sm text-error">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';