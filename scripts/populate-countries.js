import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

const countries = [
  {
    name: 'India',
    iso2: 'IN',
    iso3: 'IND',
    phone_code: '91',
    currency: 'INR',
    currency_symbol: '₹',
    tld: '.in',
    region: 'Asia'
  },
  {
    name: 'United States',
    iso2: 'US',
    iso3: 'USA',
    phone_code: '1',
    currency: 'USD',
    currency_symbol: '$',
    tld: '.us',
    region: 'Americas'
  },
  {
    name: 'United Kingdom',
    iso2: 'GB',
    iso3: 'GBR',
    phone_code: '44',
    currency: 'GBP',
    currency_symbol: '£',
    tld: '.uk',
    region: 'Europe'
  },
  {
    name: 'Singapore',
    iso2: 'SG',
    iso3: 'SGP',
    phone_code: '65',
    currency: 'SGD',
    currency_symbol: 'S$',
    tld: '.sg',
    region: 'Asia'
  },
  {
    name: 'Australia',
    iso2: 'AU',
    iso3: 'AUS',
    phone_code: '61',
    currency: 'AUD',
    currency_symbol: 'A$',
    tld: '.au',
    region: 'Oceania'
  }
];

async function populateCountries() {
  try {
    const { data, error } = await supabase
      .from('countries')
      .upsert(countries, { 
        onConflict: 'iso2',
        ignoreDuplicates: false 
      });

    if (error) throw error;
    console.log('Successfully populated countries:', data);
  } catch (error) {
    console.error('Error populating countries:', error);
  }
}

populateCountries();