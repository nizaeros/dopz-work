import React, { ButtonHTMLAttributes } from 'react';
import { Loader } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'link';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  loading,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex justify-center items-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  const variantStyles = {
    primary: `bg-primary hover:bg-primary-dark text-white border border-transparent rounded-md shadow-sm focus:ring-primary/20 ${disabled ? 'hover:bg-primary' : ''}`,
    secondary: `bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded-md shadow-sm focus:ring-primary/20 ${disabled ? 'hover:bg-white' : ''}`,
    link: 'text-primary hover:text-primary-dark underline bg-transparent focus:ring-primary/20'
  };

  return (
    <button
      {...props}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={loading || disabled}
    >
      {loading ? (
        <Loader className="h-5 w-5 animate-spin" />
      ) : (
        children
      )}
    </button>
  );
};