import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { ROUTES } from '../constants/routes';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h1 className="text-9xl font-bold text-gray-200">404</h1>
          <h2 className="mt-4 text-2xl font-semibold text-gray-800">Page Not Found</h2>
          <p className="mt-2 text-gray-600">Sorry, we couldn't find the page you're looking for.</p>
          
          <div className="mt-8 flex justify-center space-x-4">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Go Back
            </button>
            
            <button
              onClick={() => navigate(ROUTES.INTERNAL.DASHBOARD)}
              className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
            >
              <Home className="h-5 w-5 mr-2" />
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};