import React from 'react';
import { Logo } from './Logo';

interface ClientHeaderProps {
  clientName?: string;
  clientLogo?: string;
}

export const ClientHeader: React.FC<ClientHeaderProps> = ({ clientName, clientLogo }) => {
  return (
    <div className="flex items-center space-x-2">
      {clientLogo ? (
        <img src={clientLogo} alt={clientName} className="h-8 w-auto" />
      ) : (
        <Logo />
      )}
      {clientName && (
        <span className="text-lg font-semibold text-gray-800">
          {clientName}
        </span>
      )}
    </div>
  );
};