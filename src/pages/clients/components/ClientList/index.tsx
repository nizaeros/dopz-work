import React from 'react';
import { ClientListHeader } from './ClientListHeader';
import { ClientListToolbar } from './ClientListToolbar';
import { ClientListContent } from './ClientListContent';
import { useClients } from '../../../../hooks/useClients';
import type { ClientFilter } from '../../../../hooks/useClients';
import type { FilterOptions, SearchOptions } from './types';

export const ClientList: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<ClientFilter>('active');
  const [searchOptions, setSearchOptions] = React.useState<SearchOptions>({
    query: '',
    filters: {
      parentAccount: null,
      entityType: null,
      industry: null,
      country: null,
      city: null,
    },
  });

  const clientsData = useClients(activeTab);

  const handleFilterChange = (key: keyof FilterOptions, value: string | null) => {
    setSearchOptions((prev) => ({
      ...prev,
      filters: {
        ...prev.filters,
        [key]: value,
      },
    }));
  };

  const handleSearchChange = (query: string) => {
    setSearchOptions((prev) => ({
      ...prev,
      query,
    }));
  };

  const handleClearFilters = () => {
    setSearchOptions((prev) => ({
      ...prev,
      filters: {
        parentAccount: null,
        entityType: null,
        industry: null,
        country: null,
        city: null,
      },
    }));
  };

  // Filter clients based on search options
  const filteredClients = React.useMemo(() => {
    return clientsData.clients.filter((client) => {
      // Search query filter
      if (searchOptions.query) {
        const searchLower = searchOptions.query.toLowerCase();
        const matchesSearch = 
          client.name.toLowerCase().includes(searchLower) ||
          client.registeredName.toLowerCase().includes(searchLower) ||
          client.gstin?.toLowerCase().includes(searchLower);
        
        if (!matchesSearch) return false;
      }

      // Apply filters
      const { filters } = searchOptions;
      
      if (filters.parentAccount && !client.parentAccounts?.includes(filters.parentAccount)) {
        return false;
      }
      
      if (filters.entityType && client.type !== filters.entityType.toLowerCase()) {
        return false;
      }
      
      if (filters.industry && client.industry !== filters.industry) {
        return false;
      }
      
      if (filters.country && client.country !== filters.country) {
        return false;
      }
      
      if (filters.city && client.city !== filters.city) {
        return false;
      }

      return true;
    });
  }, [clientsData.clients, searchOptions]);

  return (
    <div className="w-full space-y-3">
      <ClientListHeader />
      <ClientListToolbar 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        onSearch={handleSearchChange}
        searchQuery={searchOptions.query}
        counts={clientsData.counts} 
      />
      <ClientListContent 
        {...clientsData}
        clients={filteredClients}
        filters={searchOptions.filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
      />
    </div>
  );
};