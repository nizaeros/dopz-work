import { config } from '../../config/environment';
import type { ApiCountry, ApiState, ApiCity } from './types';

const API_URL = 'https://api.countrystatecity.in/v1';
const API_KEY = config.locationApiKey;

async function fetchFromApi<T>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        'X-CSCAPI-KEY': API_KEY
      }
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

export const locationApi = {
  async getCountries(): Promise<ApiCountry[]> {
    return fetchFromApi<ApiCountry[]>('/countries');
  },

  async getStates(countryCode: string): Promise<ApiState[]> {
    return fetchFromApi<ApiState[]>(`/countries/${countryCode}/states`);
  },

  async getCities(countryCode: string, stateCode: string): Promise<ApiCity[]> {
    return fetchFromApi<ApiCity[]>(`/countries/${countryCode}/states/${stateCode}/cities`);
  }
};