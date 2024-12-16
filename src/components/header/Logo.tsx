import React from 'react';
import { config } from '../../config/environment';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', iconOnly = false }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <img
        src={config.logoUrl}
        alt="DOPZ"
        className="h-8 w-auto"
      />
      {!iconOnly && (
        <div className="flex items-center whitespace-nowrap ml-3">
          <span className="text-xl font-bold text-gray-800">DOPZ</span>
          <span className="text-gray-400 mx-2">|</span>
          <span className="text-gray-500">Duru Operations Hub</span>
        </div>
      )}
    </div>
  );
};