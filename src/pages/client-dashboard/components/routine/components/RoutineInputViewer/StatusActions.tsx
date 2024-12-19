import React from 'react';
import { CheckCircle2, AlertCircle, XCircle, RotateCcw } from 'lucide-react';
import { Toggle } from '../../../../../../components/ui/Toggle';
import type { RoutineInput, RoutineInputStatus } from '../../types';

interface StatusActionsProps {
  input: RoutineInput;
  onStatusChange?: (status: RoutineInputStatus) => void;
  onBookKeepingChange?: (value: boolean) => void;
}

export const StatusActions: React.FC<StatusActionsProps> = ({
  input,
  onStatusChange,
  onBookKeepingChange
}) => {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <button
          onClick={() => onStatusChange?.('Verified')}
          className={`p-1.5 rounded ${
            input.status === 'Verified'
              ? 'bg-green-50 text-green-600'
              : 'text-gray-400 hover:text-green-600'
          }`}
          title="Verify"
        >
          <CheckCircle2 className="h-5 w-5" />
        </button>
        <button
          onClick={() => onStatusChange?.('Suspense')}
          className={`p-1.5 rounded ${
            input.status === 'Suspense'
              ? 'bg-orange-50 text-orange-600'
              : 'text-gray-400 hover:text-orange-600'
          }`}
          title="Mark as Suspense"
        >
          <AlertCircle className="h-5 w-5" />
        </button>
        <button
          onClick={() => onStatusChange?.('Review')}
          className={`p-1.5 rounded ${
            input.status === 'Review'
              ? 'bg-yellow-50 text-yellow-600'
              : 'text-gray-400 hover:text-yellow-600'
          }`}
          title="Send for Review"
        >
          <RotateCcw className="h-5 w-5" />
        </button>
        <button
          onClick={() => onStatusChange?.('Cancelled')}
          className={`p-1.5 rounded ${
            input.status === 'Cancelled'
              ? 'bg-red-50 text-red-600'
              : 'text-gray-400 hover:text-red-600'
          }`}
          title="Cancel"
        >
          <XCircle className="h-5 w-5" />
        </button>
      </div>

      <div className="h-6 w-px bg-gray-200" />

      <Toggle
        label="Book-keeping"
        checked={input.bookKeeping}
        onChange={onBookKeepingChange}
      />
    </div>
  );
};