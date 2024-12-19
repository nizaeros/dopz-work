import React, { useState } from 'react';
import { Search, Plus, X } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { RoutineInputTable } from './components/RoutineInputTable';
import { RoutineInputViewer } from './components/RoutineInputViewer/RoutineInputViewer';
import { AddInputModal } from './components/AddInputModal';
import { useRoutineInputs } from './hooks/useRoutineInputs';
import { useClient } from '../../hooks/useClient';
import { Tabs } from '../../../../components/ui/Tabs';
import { routineInputService } from '../../../../services/routine-input/routine-input.service';
import { Button } from '../../../../components/ui/Button';
import toast from 'react-hot-toast';
import type { RoutineInput } from '../../../../types/routine-input';
import type { RoutineInputFormData } from './components/AddInputModal/types';

export const RoutineInputPage: React.FC = () => {
  const { clientId: clientSlug } = useParams<{ clientId: string }>();
  const { client, loading: clientLoading } = useClient(clientSlug);
  const [activeTab, setActiveTab] = useState<'all' | 'review' | 'suspense' | 'verified' | 'cancelled'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInput, setSelectedInput] = useState<RoutineInput | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { inputs, loading, error, refetch } = useRoutineInputs(client?.id);

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

  const handleSubmit = async (data: RoutineInputFormData) => {
    if (!client?.id) {
      toast.error('Client ID not found');
      return;
    }

    const toastId = toast.loading('Creating input...');
    setIsSubmitting(true);

    try {
      await routineInputService.createRoutineInput({
        clientId: client.id,
        ...data
      });

      toast.success('Input created successfully', { id: toastId });
      setIsAddModalOpen(false);
      
      // Refetch inputs after successful creation
      if (refetch) {
        await refetch();
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create input';
      toast.error(errorMessage, { id: toastId });
      console.error('Error creating input:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const tabs = [
    { id: 'all', label: 'All', count: inputs.length },
    { 
      id: 'review', 
      label: 'Review', 
      count: inputs.filter(i => i.input_status === 'review').length,
      icon: 'clock'
    },
    { 
      id: 'suspense', 
      label: 'Suspense', 
      count: inputs.filter(i => i.input_status === 'suspense').length,
      icon: 'alert'
    },
    { 
      id: 'verified', 
      label: 'Verified', 
      count: inputs.filter(i => i.input_status === 'verified').length,
      icon: 'check'
    },
    { 
      id: 'cancelled', 
      label: 'Cancelled', 
      count: inputs.filter(i => i.input_status === 'cancelled').length,
      icon: 'x'
    }
  ];

  const filteredInputs = inputs.filter(input => {
    // Filter by status
    if (activeTab !== 'all' && input.input_status !== activeTab) {
      return false;
    }

    // Filter by search query
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      return (
        input.input_code.toLowerCase().includes(searchLower) ||
        input.party_name?.toLowerCase().includes(searchLower) ||
        input.notes?.toLowerCase().includes(searchLower)
      );
    }

    return true;
  });

  if (loading || clientLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="h-4 w-4 mr-1" />
          Add New
        </Button>
      </div>

      {/* Tabs */}
      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={(id) => setActiveTab(id as typeof activeTab)}
      />

      {/* Table */}
      <RoutineInputTable
        inputs={filteredInputs}
        onView={handleView}
      />

      {/* Add Input Modal */}
      <AddInputModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />

      {/* Input Viewer Modal */}
      {selectedInput && (
        <RoutineInputViewer
          input={selectedInput}
          onClose={handleCloseViewer}
        />
      )}
    </div>
  );
};