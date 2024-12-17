import { fetchClients } from './api';
import { createClient } from './create-client';
import { mapClientData } from './map-client-data';

export const clientService = {
  async getClients() {
    try {
      const data = await fetchClients();
      return data.map(mapClientData);
    } catch (error) {
      console.error('Error in getClients:', error);
      throw error;
    }
  },
  createClient,
  mapClientData,
};