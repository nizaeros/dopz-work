export interface ApiCountry {
  name: string;
  iso2: string;
  iso3: string;
  phonecode: string;
  currency: string;
  currency_symbol: string;
  tld: string;
  region: string;
}

export interface ApiState {
  name: string;
  iso2: string;
  state_code: string;
}

export interface ApiCity {
  name: string;
}

export interface DbCountry {
  country_id: string;
  name: string;
  iso2: string;
  iso3: string;
  phone_code: string;
  currency: string;
  currency_symbol: string;
  tld: string;
  region: string;
}

export interface DbState {
  state_id: string;
  name: string;
  state_code: string;
  country_id: string;
}

export interface DbCity {
  city_id: string;
  name: string;
  state_id: string;
}