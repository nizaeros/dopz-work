import React from 'react';
import { Filter, X } from 'lucide-react';
import type { FilterOptions } from './types';

interface ClientFilterPanelProps {
  filters: FilterOptions;
  onFilterChange: (key: keyof FilterOptions, value: string | null) => void;
  onClearFilters: () => void;
}

export const ClientFilterPanel: React.FC<ClientFilterPanelProps> = ({
  filters,
  onFilterChange,
  onClearFilters,
}) => {
  const filterOptions = {
    parentAccount: ['DC', 'DCL'],
    entityType: ['Business', 'Government', 'Individual'],
    industry: ['Technology', 'Healthcare', 'Finance', 'Manufacturing', 'Retail'],
    country: ['India', 'USA', 'UK', 'Singapore'],
    city: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai']
  };

  const hasActiveFilters = Object.values(filters).some(Boolean);

  return (
    <div className="bg-white border rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between border-b pb-3">
        <div className="flex items-center gap-2 text-gray-700">
          <Filter className="h-4 w-4" />
          <span className="font-medium">Filters</span>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
          >
            <X className="h-3 w-3" />
            Clear all
          </button>
        )}
      </div>

      {/* Filter Sections */}
      <div className="space-y-4">
        {Object.entries(filterOptions).map(([key, options]) => (
          <div key={key} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 capitalize">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </label>
            <select
              value={filters[key as keyof FilterOptions] || ''}
              onChange={(e) => onFilterChange(
                key as keyof FilterOptions,
                e.target.value || null
              )}
              className="w-full text-sm border-gray-300 rounded-md focus:ring-primary focus:border-primary"
            >
              <option value="">All</option>
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};