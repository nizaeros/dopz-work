import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { useDebounce } from '../../hooks/useDebounce';
import { locationService } from '../../services/location';
import { LoadingSpinner } from './LoadingSpinner';
import type { LocationSearchResult } from '../../services/location/types';

interface CitySearchProps {
  onSelect: (cityId: string | null, stateId: string | null, countryId: string | null) => void;
  className?: string;
}

export const CitySearch: React.FC<CitySearchProps> = ({ onSelect, className = '' }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<LocationSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const debouncedQuery = useDebounce(query, 300);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleSearch = async () => {
      if (!debouncedQuery || debouncedQuery.length < 2) {
        setResults([]);
        setIsOpen(false);
        return;
      }

      try {
        setLoading(true);
        const searchResults = await locationService.searchCities(debouncedQuery);
        console.log('Search results:', searchResults);
        setResults(searchResults);
        setIsOpen(searchResults.length > 0);
      } catch (error) {
        console.error('Error searching cities:', error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    handleSearch();
  }, [debouncedQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (!value) {
      onSelect(null, null, null);
      setSelectedLocation('');
    }
  };

  const handleSelect = (result: LocationSearchResult) => {
    const locationString = `${result.name}, ${result.state.name}, ${result.state.country.name}`;
    setSelectedLocation(locationString);
    setQuery(locationString);
    setIsOpen(false);
    onSelect(result.id, result.state.id, result.state.country.id);
  };

  const handleClear = () => {
    setQuery('');
    setSelectedLocation('');
    setResults([]);
    setIsOpen(false);
    onSelect(null, null, null);
  };

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => query.length >= 2 && results.length > 0 && setIsOpen(true)}
          placeholder="Search for a city..."
          className="w-full pl-10 pr-10 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {loading ? (
            <LoadingSpinner size="small" />
          ) : (
            <Search className="h-5 w-5 text-gray-400" />
          )}
        </div>
        {query && (
          <button
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            type="button"
          >
            <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200 max-h-60 overflow-auto">
          {results.map((result) => (
            <button
              key={result.id}
              onClick={() => handleSelect(result)}
              className="w-full px-4 py-2 text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
            >
              <div className="font-medium text-gray-900">{result.name}</div>
              <div className="text-sm text-gray-500">
                {result.state.name}, {result.state.country.name}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};