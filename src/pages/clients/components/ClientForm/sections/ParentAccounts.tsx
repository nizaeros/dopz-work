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
          <span className="text-sm text-gray-500 ml-1">(Hold Ctrl/Cmd to select multiple)</span>
        </label>
        <select
          multiple
          {...register('parent_account_ids')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary min-h-[120px]"
          size={5}
        >
          {parentAccounts.map((account) => (
            <option 
              key={account.id} 
              value={account.id}
              className="py-2 px-3 hover:bg-gray-100"
            >
              {account.code} - {account.name}
            </option>
          ))}
        </select>
        {errors.parent_account_ids?.message && (
          <p className="mt-1 text-sm text-red-600">{errors.parent_account_ids.message}</p>
        )}
        <p className="mt-2 text-sm text-gray-500">
          A client can be associated with multiple parent accounts (e.g., both DC and DCL)
        </p>
      </div>
    </div>
  );
};