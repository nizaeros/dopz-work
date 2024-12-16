import React from 'react';
import { useNavigate } from 'react-router-dom';
import { config } from '../../config/environment';
import { ROUTES } from '../../constants/routes';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', iconOnly = false }) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate(ROUTES.INTERNAL.DASHBOARD);
  };

  return (
    <div 
      className={`flex items-center cursor-pointer ${className}`}
      onClick={handleLogoClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleLogoClick()}
    >
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