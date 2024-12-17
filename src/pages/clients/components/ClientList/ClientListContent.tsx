import React from 'react';
import { ClientCard } from './ClientCard';
import { ClientFilterPanel } from './ClientFilterPanel';
import { LoadingSpinner } from '../../../../components/ui/LoadingSpinner';
import { ErrorMessage } from '../../../../components/ui/ErrorMessage';
import type { Client } from '../../../../types/client';
import type { FilterOptions } from './types';

interface ClientListContentProps {
  clients: Client[];
  loading: boolean;
  error: string | null;
  filters: FilterOptions;
  onFilterChange: (key: keyof FilterOptions, value: string | null) => void;
  onClearFilters: () => void;
}

export const ClientListContent: React.FC<ClientListContentProps> = ({
  clients,
  loading,
  error,
  filters,
  onFilterChange,
  onClearFilters,
}) => {
  if (loading) {
    return (
      <div className="text-center py-6">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="flex gap-6">
      {/* Client Cards */}
      <div className="flex-1">
        {clients?.length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            No clients found
          </div>
        ) : (
          <div className="space-y-2">
            {clients.map((client) => (
              <ClientCard key={client.id} client={client} />
            ))}
          </div>
        )}
      </div>

      {/* Filter Panel */}
      <div className="w-72 flex-shrink-0">
        <div className="sticky top-4">
          <ClientFilterPanel
            filters={filters}
            onFilterChange={onFilterChange}
            onClearFilters={onClearFilters}
          />
        </div>
      </div>
    </div>
  );
};