import { config } from '../../config/environment';

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
      const error = await response.text();
      throw new Error(`API request failed: ${error}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

export const locationApi = {
  async searchCities(query: string) {
    try {
      // Get all Indian states first (limiting to India for now)
      const states = await fetchFromApi<any[]>('/countries/IN/states');
      const results = [];

      // For each state, get its cities
      for (const state of states) {
        const cities = await fetchFromApi<any[]>(
          `/countries/IN/states/${state.iso2}/cities`
        );

        const matchedCities = cities.filter(city => 
          city.name.toLowerCase().includes(query.toLowerCase())
        );

        results.push(...matchedCities.map(city => ({
          id: city.id,
          name: city.name,
          state: {
            id: state.id,
            name: state.name,
            country: {
              id: 'IN',
              name: 'India'
            }
          }
        })));

        if (results.length >= 10) break; // Limit to 10 results
      }

      return results;
    } catch (error) {
      console.error('Error searching cities:', error);
      throw error;
    }
  }
};