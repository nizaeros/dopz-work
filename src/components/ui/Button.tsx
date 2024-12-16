import React, { ButtonHTMLAttributes } from 'react';
import { Loader } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'link';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  loading,
  variant = 'primary',
  className = '',
  ...props
}) => {
  const baseStyles = 'flex justify-center items-center px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50';
  
  const variantStyles = {
    primary: 'bg-primary hover:bg-primary-dark text-white border border-transparent rounded-md shadow-sm focus:ring-primary',
    secondary: 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded-md shadow-sm focus:ring-primary',
    link: 'text-primary hover:text-primary-dark underline bg-transparent'
  };

  return (
    <button
      {...props}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      disabled={loading || props.disabled}
    >
      {loading ? (
        <Loader className="h-5 w-5 animate-spin" />
      ) : (
        children
      )}
    </button>
  );
};