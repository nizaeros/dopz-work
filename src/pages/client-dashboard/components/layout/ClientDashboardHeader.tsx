import React from 'react';
import { Building2 } from 'lucide-react';
import { UserMenu } from '../../../../components/ui/UserMenu';
import { useUser } from '../../../../hooks/useUser';
import { useClientData } from '../../hooks/useClientData';
import { LoadingSpinner } from '../../../../components/ui/LoadingSpinner';

export const ClientDashboardHeader: React.FC = () => {
  const { user } = useUser();
  const { client, loading } = useClientData();

  return (
    <header className="h-14 bg-white border-b border-gray-200">
      <div className="h-full w-full px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {loading ? (
            <LoadingSpinner size="small" />
          ) : (
            <>
              {client?.logoUrl ? (
                <img 
                  src={client.logoUrl} 
                  alt={client.name} 
                  className="h-8 w-8 object-contain"
                />
              ) : (
                <div className="h-8 w-8 bg-primary/10 rounded flex items-center justify-center">
                  <Building2 className="h-5 w-5 text-primary" />
                </div>
              )}
              <h1 className="text-base font-medium text-gray-800">
                {client?.name || 'Loading...'}
              </h1>
            </>
          )}
        </div>

        {user && (
          <UserMenu
            name={`${user.first_name} ${user.last_name}`}
            email={user.email}
            imageUrl={user.profile_image_url}
          />
        )}
      </div>
    </header>
  );
};