import React from 'react';
import { useNavigate } from 'react-router-dom';
import { config } from '../../config/environment';
import { ROUTES } from '../../constants/routes';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  showCaption?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  iconOnly = false,
  showCaption = true
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
        className={`${iconOnly ? 'h-6 w-6' : 'h-8 w-auto'}`}
      />
      {!iconOnly && showCaption && (
        <span className="ml-3 text-lg font-semibold text-gray-800">
          DOPZ
        </span>
      )}
    </div>
  );
};