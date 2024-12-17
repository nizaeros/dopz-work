import { locationApi } from './api-client';
import { fetchCountries, fetchStates, fetchCities } from './api';
import { mapToLocationOption } from './mappers';
import type { LocationOption } from '../../types/forms';

export const locationService = {
  async getCountries(): Promise<LocationOption[]> {
    try {
      // Try to get from database first
      const dbCountries = await fetchCountries();
      
      if (dbCountries.length > 0) {
        return dbCountries.map(mapToLocationOption);
      }

      // If no data in DB, fetch from API and store
      const apiCountries = await locationApi.getCountries();
      // Store in database and return mapped data
      // Implementation in db-operations.ts
      return apiCountries.map(country => ({
        id: country.country_id,
        name: country.name
      }));
    } catch (error) {
      console.error('Error in getCountries:', error);
      return [];
    }
  },

  async getStates(countryId: string | null): Promise<LocationOption[]> {
    if (!countryId) return [];
    
    try {
      // Try database first
      const dbStates = await fetchStates(countryId);
      
      if (dbStates.length > 0) {
        return dbStates.map(mapToLocationOption);
      }

      // If no data, fetch from API, store, and return
      // Implementation in db-operations.ts
      return [];
    } catch (error) {
      console.error('Error in getStates:', error);
      return [];
    }
  },

  async getCities(stateId: string | null): Promise<LocationOption[]> {
    if (!stateId) return [];
    
    try {
      // Try database first
      const dbCities = await fetchCities(stateId);
      
      if (dbCities.length > 0) {
        return dbCities.map(mapToLocationOption);
      }

      // If no data, fetch from API, store, and return
      // Implementation in db-operations.ts
      return [];
    } catch (error) {
      console.error('Error in getCities:', error);
      return [];
    }
  }
};