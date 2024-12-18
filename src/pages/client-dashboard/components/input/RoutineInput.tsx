import React from 'react';
import { FileSpreadsheet } from 'lucide-react';

export const RoutineInput: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Routine Input</h1>
          <p className="mt-1 text-sm text-gray-500">Manage your routine data inputs</p>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-center h-64 text-gray-400">
          <div className="text-center">
            <FileSpreadsheet className="h-12 w-12 mx-auto mb-4" />
            <p className="text-lg">Routine Input Form Coming Soon</p>
          </div>
        </div>
      </div>
    </div>
  );
};