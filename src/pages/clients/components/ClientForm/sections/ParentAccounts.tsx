import React, { useState, useEffect } from 'react';
import { UseFormRegister, UseFormSetValue, FieldErrors } from 'react-hook-form';
import { Users } from 'lucide-react';
import { Toggle } from '../../../../../components/ui/Toggle';
import type { ClientFormData, ParentAccountOption } from '../../../../../types/forms';

interface ParentAccountsProps {
  register: UseFormRegister<ClientFormData>;
  setValue: UseFormSetValue<ClientFormData>;
  errors: FieldErrors<ClientFormData>;
  parentAccounts: ParentAccountOption[];
  initialData?: Partial<ClientFormData>;
}

export const ParentAccounts: React.FC<ParentAccountsProps> = ({
  setValue,
  errors,
  parentAccounts,
  initialData
}) => {
  // Track selected parent accounts locally
  const [selectedParents, setSelectedParents] = useState<string[]>(
    initialData?.parent_account_ids || []
  );

  // Update form value when selections change
  useEffect(() => {
    setValue('parent_account_ids', selectedParents);
  }, [selectedParents, setValue]);

  const handleToggle = (parentId: string, checked: boolean) => {
    setSelectedParents(prev => {
      if (checked) {
        return [...prev, parentId];
      } else {
        return prev.filter(id => id !== parentId);
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Users className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold text-gray-900">Parent Accounts</h3>
      </div>

      <div className="space-y-4">
        {parentAccounts.map((account) => (
          <Toggle
            key={account.id}
            label={`${account.code} - ${account.name}`}
            checked={selectedParents.includes(account.id)}
            onChange={(checked) => handleToggle(account.id, checked)}
          />
        ))}
      </div>

      {errors.parent_account_ids?.message && (
        <p className="mt-1 text-sm text-red-600">{errors.parent_account_ids.message}</p>
      )}
    </div>
  );
};