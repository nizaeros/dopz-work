// Centralize database queries
export const CLIENT_LIST_QUERY = `
  client_account_id,
  parent_accounts,
  friendly_name,
  registered_name,
  slug,
  account_type,
  industry_name,
  gstin,
  entity_type,
  logo_image_url,
  is_active,
  created_at,
  city_name,
  state_name,
  country_name
`;

export const CLIENT_DETAIL_QUERY = `
  client_account_id,
  friendly_name,
  registered_name,
  slug,
  account_type,
  industry_name,
  gstin,
  entity_type,
  logo_image_url,
  is_active,
  created_at,
  city_name,
  state_name,
  country_name,
  parent_accounts
`;

export const CLIENT_EDIT_QUERY = `
  client_account_id,
  friendly_name,
  registered_name,
  account_type,
  industry_id,
  entity_type,
  gstin,
  tan,
  icn,
  linkedin_url,
  website_url,
  country_id,
  state_id,
  city_id,
  client_parent_association (
    parent_account_id
  )
`;