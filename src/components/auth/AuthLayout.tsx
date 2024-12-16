import React, { ReactNode } from 'react';
import { config } from '../../config/environment';

interface AuthLayoutProps {
  children: ReactNode;
  title?: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex flex-col items-center">
          <img
            src={config.logoUrl}
            alt="DOPZ"
            className="h-12 w-auto"
          />
          <div className="flex items-center mt-4">
            <span className="text-xl font-bold text-gray-800">DOPZ</span>
            <span className="text-gray-400 mx-2">|</span>
            <span className="text-gray-500">Duru Operations Hub</span>
          </div>
        </div>
        {title && (
          <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">
            {title}
          </h2>
        )}
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {children}
        </div>
      </div>
    </div>
  );
};