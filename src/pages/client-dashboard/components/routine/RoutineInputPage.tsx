import React, { useState } from 'react';
import { Search, Plus, X } from 'lucide-react';
import { RoutineInputTable } from './components/RoutineInputTable';
import { RoutineInputViewer } from './components/RoutineInputViewer/RoutineInputViewer';
import { useRoutineInputs } from './hooks/useRoutineInputs';
import { Tabs } from '../../../../components/ui/Tabs';
import type { RoutineInput, RoutineInputStatus } from './types';

export const RoutineInputPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<RoutineInputStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInput, setSelectedInput] = useState<RoutineInput | null>(null);

  const { inputs, loading } = useRoutineInputs({
    status: activeTab,
    search: searchQuery
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleView = (input: RoutineInput) => {
    setSelectedInput(input);
  };

  const handleCloseViewer = () => {
    setSelectedInput(null);
  };

  const handleNext = () => {
    if (!selectedInput) return;
    const currentIndex = inputs.findIndex(input => input.id === selectedInput.id);
    if (currentIndex < inputs.length - 1) {
      setSelectedInput(inputs[currentIndex + 1]);
    }
  };

  const handlePrevious = () => {
    if (!selectedInput) return;
    const currentIndex = inputs.findIndex(input => input.id === selectedInput.id);
    if (currentIndex > 0) {
      setSelectedInput(inputs[currentIndex - 1]);
    }
  };

  const tabs = [
    { id: 'all', label: 'All', count: inputs.length },
    { id: 'Review', label: 'Review', count: inputs.filter(i => i.status === 'Review').length },
    { id: 'Suspense', label: 'Suspense', count: inputs.filter(i => i.status === 'Suspense').length },
    { id: 'Verified', label: 'Verified', count: inputs.filter(i => i.status === 'Verified').length },
    { id: 'Cancelled', label: 'Cancelled', count: inputs.filter(i => i.status === 'Cancelled').length }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Routine Input</h1>
          <p className="mt-1 text-sm text-gray-500">Manage your routine data inputs</p>
        </div>
      </div>

      {/* Search and Actions */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search documents..."
            className="w-full pl-9 pr-8 py-2 text-sm border border-gray-300 rounded-md 
              focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
          {searchQuery && (
            <button
              onClick={handleClearSearch}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <button className="flex items-center px-3 py-2 text-sm bg-primary text-white rounded-md hover:bg-primary-dark">
          <Plus className="h-4 w-4 mr-1" />
          Add New
        </button>
      </div>

      {/* Tabs */}
      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={(id) => setActiveTab(id as RoutineInputStatus | 'all')}
      />

      {/* Table */}
      <RoutineInputTable
        inputs={inputs}
        onView={handleView}
      />

      {/* Viewer Modal */}
      {selectedInput && (
        <RoutineInputViewer
          input={selectedInput}
          onClose={handleCloseViewer}
          onNext={handleNext}
          onPrevious={handlePrevious}
          hasNext={inputs.findIndex(i => i.id === selectedInput.id) < inputs.length - 1}
          hasPrevious={inputs.findIndex(i => i.id === selectedInput.id) > 0}
        />
      )}
    </div>
  );
};