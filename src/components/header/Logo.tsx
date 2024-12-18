import React from 'react';
import { useNavigate } from 'react-router-dom';
import { config } from '../../config/environment';
import { ROUTES } from '../../constants/routes';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  showBrandName?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  iconOnly = false,
  showBrandName = true
}) => {
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
      {!iconOnly && showBrandName && (
        <span className="text-xl font-medium text-gray-800 ml-3">DOPZ</span>
      )}
    </div>
  );
};