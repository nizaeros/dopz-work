import React from 'react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  const logoUrl = import.meta.env.VITE_LOGO_URL;

  return (
    <div className={`flex items-center ${className}`}>
      <img
        src={logoUrl}
        alt="DOPZ"
        className="h-8 w-auto mr-3"
      />
      <div className="flex items-center whitespace-nowrap">
        <span className="text-xl font-bold text-gray-800">DOPZ</span>
        <span className="text-gray-400 mx-2">|</span>
        <span className="text-gray-500">Duru Operations Hub</span>
      </div>
    </div>
  );
};