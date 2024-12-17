import { v4 as uuidv4 } from 'uuid';
import type { ApiCountry, ApiState, ApiCity, DbCountry, DbState, DbCity } from './types';
import type { LocationOption } from '../../types/forms';

export function mapApiCountry(apiCountry: ApiCountry): DbCountry {
  return {
    country_id: uuidv4(),
    name: apiCountry.name,
    iso2: apiCountry.iso2,
    iso3: apiCountry.iso3,
    phone_code: apiCountry.phonecode,
    currency: apiCountry.currency,
    currency_symbol: apiCountry.currency_symbol,
    tld: apiCountry.tld,
    region: apiCountry.region
  };
}

export function mapApiState(apiState: ApiState, countryId: string): DbState {
  return {
    state_id: uuidv4(),
    name: apiState.name,
    state_code: apiState.state_code || apiState.iso2,
    country_id: countryId
  };
}

export function mapApiCity(apiCity: ApiCity, stateId: string): DbCity {
  return {
    city_id: uuidv4(),
    name: apiCity.name,
    state_id: stateId
  };
}

export function mapToLocationOption(data: { id: string; name: string }): LocationOption {
  return {
    id: data.id,
    name: data.name
  };
}