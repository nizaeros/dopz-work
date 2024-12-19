import React from 'react';
import { FileInput } from 'lucide-react';

export const OnetimeInput: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">One-time Input</h1>
          <p className="mt-1 text-sm text-gray-500">Submit one-time data inputs</p>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-center h-64 text-gray-400">
          <div className="text-center">
            <FileInput className="h-12 w-12 mx-auto mb-4" />
            <p className="text-lg">One-time Input Form Coming Soon</p>
          </div>
        </div>
      </div>
    </div>
  );
};