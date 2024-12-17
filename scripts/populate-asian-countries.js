import { createClient } from '@supabase/supabase-js';

// Create Supabase client using environment variables
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

// Asian countries data
const asianCountries = [
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
    name: 'Malaysia',
    iso2: 'MY',
    iso3: 'MYS',
    phone_code: '60',
    currency: 'MYR',
    currency_symbol: 'RM',
    tld: '.my',
    region: 'Asia'
  }
];

async function populateCountries() {
  try {
    const { data, error } = await supabase
      .from('countries')
      .upsert(asianCountries, {
        onConflict: 'iso2'
      });

    if (error) throw error;
    console.log('Successfully populated countries');
  } catch (error) {
    console.error('Error populating countries:', error);
  }
}

populateCountries();