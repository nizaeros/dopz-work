import { supabase } from '../../lib/supabase';
import { locationApi } from './api-client';
import { mapApiCountry, mapApiState, mapApiCity } from './mappers';
import type { LocationOption } from '../../types/forms';

export async function getOrFetchCountries(): Promise<LocationOption[]> {
  // First try to get from database
  const { data: dbCountries, error: dbError } = await supabase
    .from('countries')
    .select('country_id, name, iso2')
    .order('name');

  if (dbError) throw dbError;

  // If we have data in DB, return it
  if (dbCountries && dbCountries.length > 0) {
    return dbCountries.map(country => ({
      id: country.country_id,
      name: country.name
    }));
  }

  // If no data in DB, fetch from API
  try {
    const apiCountries = await locationApi.getCountries();
    
    // Map API data to our schema
    const mappedCountries = apiCountries.map(mapApiCountry);
    
    // Insert into database
    const { error: insertError } = await supabase
      .from('countries')
      .insert(mappedCountries);

    if (insertError) throw insertError;

    // Return mapped data
    return mappedCountries.map(country => ({
      id: country.country_id,
      name: country.name
    }));
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw error;
  }
}

export async function getOrFetchStates(countryId: string): Promise<LocationOption[]> {
  // Get country ISO code first
  const { data: country, error: countryError } = await supabase
    .from('countries')
    .select('iso2')
    .eq('country_id', countryId)
    .single();

  if (countryError) throw countryError;
  if (!country?.iso2) throw new Error('Country not found');

  // Check database first
  const { data: dbStates, error: dbError } = await supabase
    .from('states')
    .select('state_id, name')
    .eq('country_id', countryId)
    .order('name');

  if (dbError) throw dbError;

  // Return if we have data
  if (dbStates && dbStates.length > 0) {
    return dbStates.map(state => ({
      id: state.state_id,
      name: state.name
    }));
  }

  // Fetch from API if no data
  try {
    const apiStates = await locationApi.getStates(country.iso2);
    
    // Map and store states
    const mappedStates = apiStates.map(state => 
      mapApiState(state, countryId)
    );

    const { error: insertError } = await supabase
      .from('states')
      .insert(mappedStates);

    if (insertError) throw insertError;

    return mappedStates.map(state => ({
      id: state.state_id,
      name: state.name
    }));
  } catch (error) {
    console.error('Error fetching states:', error);
    throw error;
  }
}

export async function getOrFetchCities(stateId: string): Promise<LocationOption[]> {
  // Get state and country codes first
  const { data: state, error: stateError } = await supabase
    .from('states')
    .select(`
      state_code,
      countries!inner(
        iso2
      )
    `)
    .eq('state_id', stateId)
    .single();

  if (stateError) throw stateError;
  if (!state?.state_code || !state.countries?.iso2) {
    throw new Error('State or country not found');
  }

  // Check database first
  const { data: dbCities, error: dbError } = await supabase
    .from('cities')
    .select('city_id, name')
    .eq('state_id', stateId)
    .order('name');

  if (dbError) throw dbError;

  // Return if we have data
  if (dbCities && dbCities.length > 0) {
    return dbCities.map(city => ({
      id: city.city_id,
      name: city.name
    }));
  }

  // Fetch from API if no data
  try {
    const apiCities = await locationApi.getCities(
      state.countries.iso2,
      state.state_code
    );
    
    // Map and store cities
    const mappedCities = apiCities.map(city => 
      mapApiCity(city, stateId)
    );

    const { error: insertError } = await supabase
      .from('cities')
      .insert(mappedCities);

    if (insertError) throw insertError;

    return mappedCities.map(city => ({
      id: city.city_id,
      name: city.name
    }));
  } catch (error) {
    console.error('Error fetching cities:', error);
    throw error;
  }
}