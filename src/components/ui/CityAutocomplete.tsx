import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { useDebounce } from '../../hooks/useDebounce';
import { locationService } from '../../services/location';
import { LoadingSpinner } from './LoadingSpinner';

interface CityAutocompleteProps {
  onCitySelect: (cityId: string | null, stateId: string | null, countryId: string | null) => void;
  countryId: string | null;
  disabled?: boolean;
}

interface SearchResult {
  id: string;
  name: string;
  state: {
    id: string;
    name: string;
    country: {
      id: string;
      name: string;
    };
  };
}

export const CityAutocomplete: React.FC<CityAutocompleteProps> = ({
  onCitySelect,
  countryId,
  disabled = false
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const debouncedQuery = useDebounce(query, 300);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleSearch = async () => {
      if (!debouncedQuery || debouncedQuery.length < 2 || !countryId) {
        setResults([]);
        setIsOpen(false);
        return;
      }

      try {
        setLoading(true);
        const searchResults = await locationService.searchCities(debouncedQuery, countryId);
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
  }, [debouncedQuery, countryId]);

  // Handle click outside to close dropdown
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
      onCitySelect(null, null, countryId);
      setSelectedLocation('');
      setResults([]);
      setIsOpen(false);
    }
  };

  const handleCitySelect = (result: SearchResult) => {
    const locationString = `${result.name}, ${result.state.name}`;
    setSelectedLocation(locationString);
    setQuery(locationString);
    setIsOpen(false);
    onCitySelect(result.id, result.state.id, countryId);
  };

  const handleClear = () => {
    setQuery('');
    setSelectedLocation('');
    setResults([]);
    setIsOpen(false);
    onCitySelect(null, null, countryId);
  };

  return (
    <div ref={wrapperRef} className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        City & State
        <span className="text-gray-400 text-xs ml-1">(Optional)</span>
      </label>
      
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => query.length >= 2 && results.length > 0 && setIsOpen(true)}
          placeholder={disabled ? "Select a country first" : "Start typing a city name..."}
          disabled={disabled}
          className={`
            w-full pl-10 pr-10 py-2 rounded-md border border-gray-300
            focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
            ${disabled ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'}
          `}
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
              onClick={() => handleCitySelect(result)}
              className="w-full px-4 py-2 text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
            >
              <div className="font-medium text-gray-900">{result.name}</div>
              <div className="text-sm text-gray-500">{result.state.name}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};