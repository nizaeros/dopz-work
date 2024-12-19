import type { Client } from '../../types/client';

export function mapClientData(data: any): Client {
  return {
    id: data.client_account_id,
    name: data.friendly_name || 'Unnamed Client',
    registeredName: data.registered_name || '',
    slug: data.slug || '',
    type: data.entity_type?.toLowerCase() || 'business',
    industry: data.industry_name || 'N/A',
    createdAt: data.created_at,
    isActive: data.is_active ?? true,
    logoUrl: data.logo_image_url || '',
    parentAccounts: data.parent_accounts ? data.parent_accounts.split('; ') : [],
    gstin: data.gstin || '',
    city: data.city_name || '',
    state: data.state_name || '',
    country: data.country_name || '',
    accountType: data.account_type || 'Standard',
  };
}