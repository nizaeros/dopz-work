import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
import { Button } from '../ui/Button';
import { ROUTES } from '../../constants/routes';

interface ErrorBoundaryProps {
  error: string | null;
  resetError?: () => void;
}

export const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ 
  error, 
  resetError 
}) => {
  const navigate = useNavigate();

  if (!error) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full">
          <AlertTriangle className="h-6 w-6 text-red-600" />
        </div>
        <div className="mt-4 text-center">
          <h3 className="text-lg font-medium text-gray-900">Error</h3>
          <p className="mt-2 text-sm text-gray-600">{error}</p>
          <div className="mt-6 flex gap-3 justify-center">
            {resetError && (
              <Button onClick={resetError}>
                Try Again
              </Button>
            )}
            <Button
              variant="secondary"
              onClick={() => navigate(ROUTES.INTERNAL.DASHBOARD)}
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};