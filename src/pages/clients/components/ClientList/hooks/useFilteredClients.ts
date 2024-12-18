import { useMemo } from 'react';
import type { Client } from '../../../../../types/client';
import type { SearchOptions } from '../types';

export const useFilteredClients = (clients: Client[], searchOptions: SearchOptions) => {
  return useMemo(() => {
    return clients.filter((client) => {
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
  }, [clients, searchOptions]);
};