import React, { useState } from 'react';
import { searchCities } from '../../services/location/search';
import { LoadingSpinner } from '../ui/LoadingSpinner';

export const CitySearchDebug: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [debugLogs, setDebugLogs] = useState<string[]>([]);

  const addDebugLog = (message: string) => {
    setDebugLogs(prev => [...prev, `${new Date().toISOString()}: ${message}`]);
  };

  const handleSearch = async () => {
    if (!searchTerm) return;

    setLoading(true);
    setError(null);
    addDebugLog(`Starting search for: "${searchTerm}"`);

    try {
      const searchResults = await searchCities(searchTerm);
      setResults(searchResults);
      addDebugLog(`Found ${searchResults.length} results`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      addDebugLog(`Error: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Type a city name..."
          className="flex-1 px-4 py-2 border rounded-md"
        />
        <button
          onClick={handleSearch}
          disabled={loading || !searchTerm}
          className="px-4 py-2 bg-primary text-white rounded-md disabled:opacity-50"
        >
          {loading ? <LoadingSpinner size="small" /> : 'Search'}
        </button>
      </div>

      {/* Debug Logs */}
      <div className="mt-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Debug Logs</h4>
        <div className="bg-gray-50 p-4 rounded-md h-40 overflow-auto">
          {debugLogs.map((log, index) => (
            <div key={index} className="text-xs font-mono mb-1">
              {log}
            </div>
          ))}
        </div>
      </div>

      {/* Results */}
      {error ? (
        <div className="text-red-600 text-sm">{error}</div>
      ) : results.length > 0 ? (
        <div className="space-y-2">
          {results.map((result, index) => (
            <div key={index} className="p-2 bg-gray-50 rounded">
              <div>{result.name}</div>
              <div className="text-sm text-gray-600">
                {result.state?.name}, {result.state?.country?.name}
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};