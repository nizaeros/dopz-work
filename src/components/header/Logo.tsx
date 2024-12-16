import React from 'react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <img
        src="/rocket.png"
        alt="DOPZ"
        className="h-8 w-8 mr-3"
      />
      <div className="flex items-center whitespace-nowrap">
        <span className="text-xl font-bold text-gray-800">DOPZ</span>
        <span className="text-gray-400 mx-2">|</span>
        <span className="text-gray-500">Duru Operations Hub</span>
      </div>
    </div>
  );
};