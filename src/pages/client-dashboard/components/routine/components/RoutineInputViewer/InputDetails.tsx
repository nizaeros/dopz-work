import React from 'react';
import { formatDate } from '../../../../../../utils/date';
import { formatCurrency } from '../../../../../../utils/format';
import type { RoutineInput } from '../../types';

interface InputDetailsProps {
  input: RoutineInput;
}

export const InputDetails: React.FC<InputDetailsProps> = ({ input }) => {
  return (
    <div className="p-6 space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Doc Code</label>
          <p className="mt-1 text-sm text-gray-900">{input.docCode}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Created At</label>
          <p className="mt-1 text-sm text-gray-900">{formatDate(input.createdAt)}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Month</label>
          <p className="mt-1 text-sm text-gray-900">{input.month}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <p className="mt-1 text-sm text-gray-900">{input.category}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Party Name</label>
          <p className="mt-1 text-sm text-gray-900">{input.partyName}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Amount</label>
          <p className="mt-1 text-sm text-gray-900">{formatCurrency(input.amount)}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Notes</label>
          <p className="mt-1 text-sm text-gray-900">{input.notes || '-'}</p>
        </div>
      </div>
    </div>
  );
};