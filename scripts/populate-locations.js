import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

// Initial data for India
const indiaData = {
  country: {
    name: 'India',
    iso2: 'IN',
    iso3: 'IND',
    phone_code: '91',
    currency: 'INR',
    currency_symbol: '₹',
    tld: '.in',
    region: 'Asia'
  },
  states: [
    {
      name: 'Karnataka',
      state_code: 'KA',
      cities: ['Bengaluru', 'Mysuru', 'Hubli', 'Mangaluru', 'Belgaum']
    },
    {
      name: 'Tamil Nadu',
      state_code: 'TN',
      cities: ['Chennai', 'Coimbatore', 'Madurai', 'Salem', 'Trichy']
    },
    {
      name: 'Maharashtra',
      state_code: 'MH',
      cities: ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad']
    }
  ]
};

async function populateLocations() {
  try {
    // Insert country
    const { data: countryData, error: countryError } = await supabase
      .from('countries')
      .upsert([indiaData.country], { onConflict: 'iso2' })
      .select()
      .single();

    if (countryError) throw countryError;
    console.log('Country added:', countryData.name);

    // Insert states
    for (const state of indiaData.states) {
      const { data: stateData, error: stateError } = await supabase
        .from('states')
        .upsert([
          {
            name: state.name,
            state_code: state.state_code,
            country_id: countryData.country_id
          }
        ], { onConflict: 'state_code' })
        .select()
        .single();

      if (stateError) throw stateError;
      console.log('State added:', stateData.name);

      // Insert cities
      const cities = state.cities.map(cityName => ({
        name: cityName,
        state_id: stateData.state_id
      }));

      const { data: citiesData, error: citiesError } = await supabase
        .from('cities')
        .upsert(cities);

      if (citiesError) throw citiesError;
      console.log(`Added ${cities.length} cities for ${state.name}`);
    }

    console.log('Successfully populated location data');
  } catch (error) {
    console.error('Error populating locations:', error);
  }
}

populateLocations();