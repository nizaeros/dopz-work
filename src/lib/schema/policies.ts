// RLS Policies Definitions
export const rlsPolicies = {
  client_accounts: {
    internal_users_all_access: {
      using: `EXISTS (
        SELECT 1 FROM users
        WHERE users.auth_id = auth.uid()
        AND users.role_type_name = 'internal'
      )`
    },
    external_users_view_own: {
      using: `EXISTS (
        SELECT 1 FROM users
        WHERE users.auth_id = auth.uid()
        AND users.role_type_name = 'external'
        AND users.client_id = client_accounts.client_account_id
      )`
    }
  },

  client_inputs: {
    internal_users_all_access: {
      using: `EXISTS (
        SELECT 1 FROM users
        WHERE users.auth_id = auth.uid()
        AND users.role_type_name = 'internal'
      )`
    },
    external_users_view_own: {
      using: `EXISTS (
        SELECT 1 FROM users
        WHERE users.auth_id = auth.uid()
        AND users.role_type_name = 'external'
        AND users.client_id = client_inputs.client_account_id
      )`
    }
  },

  documents: {
    internal_users_all_access: {
      using: `EXISTS (
        SELECT 1 FROM users
        WHERE users.auth_id = auth.uid()
        AND users.role_type_name = 'internal'
      )`
    },
    external_users_view_own: {
      using: `EXISTS (
        SELECT 1 FROM users u
        JOIN client_inputs ci ON ci.client_account_id = u.client_id
        WHERE u.auth_id = auth.uid()
        AND u.role_type_name = 'external'
        AND ci.input_id = documents.entity_id
        AND documents.entity_type = 'client_input'
      )`
    }
  }
};