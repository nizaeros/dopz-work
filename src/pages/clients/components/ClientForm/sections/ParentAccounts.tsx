import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import type { ClientFormData, ParentAccountOption } from '../../../../../types/forms';

interface ParentAccountsProps {
  register: UseFormRegister<ClientFormData>;
  errors: FieldErrors<ClientFormData>;
  parentAccounts: ParentAccountOption[];
}

export const ParentAccounts: React.FC<ParentAccountsProps> = ({
  register,
  errors,
  parentAccounts,
}) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Parent Accounts</h3>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Associated Parent Accounts
        </label>
        <select
          multiple
          {...register('parent_account_ids')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
        >
          {parentAccounts.map((account) => (
            <option key={account.id} value={account.id}>
              {account.code} - {account.name}
            </option>
          ))}
        </select>
        {errors.parent_account_ids?.message && (
          <p className="mt-1 text-sm text-red-600">{errors.parent_account_ids.message}</p>
        )}
      </div>
    </div>
  );
};