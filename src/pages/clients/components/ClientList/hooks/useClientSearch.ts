import { useState, useCallback } from 'react';
import type { FilterOptions, SearchOptions } from '../types';

export const useClientSearch = () => {
  const [searchOptions, setSearchOptions] = useState<SearchOptions>({
    query: '',
    filters: {
      parentAccount: null,
      entityType: null,
      industry: null,
      country: null,
      city: null,
    },
  });

  const handleSearchChange = useCallback((query: string) => {
    setSearchOptions(prev => ({
      ...prev,
      query
    }));
  }, []);

  const handleFilterChange = useCallback((key: keyof FilterOptions, value: string | null) => {
    setSearchOptions(prev => ({
      ...prev,
      filters: {
        ...prev.filters,
        [key]: value,
      },
    }));
  }, []);

  const handleClearFilters = useCallback(() => {
    setSearchOptions(prev => ({
      ...prev,
      filters: {
        parentAccount: null,
        entityType: null,
        industry: null,
        country: null,
        city: null,
      },
    }));
  }, []);

  return {
    searchOptions,
    handleSearchChange,
    handleFilterChange,
    handleClearFilters
  };
};