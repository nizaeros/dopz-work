import type { LocationOption } from '../../types/forms';

export function mapLocationData(data: any[]): LocationOption[] {
  return data.map(item => ({
    id: item.country_id || item.state_id || item.city_id,
    name: item.name
  }));
}