import React, { useState } from 'react';
import { Search, Download, Plus, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { Tabs } from '../../../../components/ui/Tabs';
import { ClientFormModal } from '../ClientForm/ClientFormModal';
import { clientService } from '../../../../services/client';
import type { ClientFilter } from '../../../../hooks/useClients';
import type { ClientFormData } from '../../../../types/forms';

interface ClientListToolbarProps {
  activeTab: ClientFilter;
  onTabChange: (tab: ClientFilter) => void;
  onSearch: (query: string) => void;
  searchQuery: string;
  counts: {
    active: number;
    inactive: number;
    all: number;
  };
}

export const ClientListToolbar: React.FC<ClientListToolbarProps> = ({
  activeTab,
  onTabChange,
  onSearch,
  searchQuery,
  counts,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const tabs = [
    { id: 'active', label: 'Active', count: counts.active, icon: 'check' },
    { id: 'inactive', label: 'Inactive', count: counts.inactive, icon: 'x' },
    { id: 'all', label: 'All', count: counts.all, icon: 'list' },
  ];

  const handleClearSearch = () => {
    onSearch('');
  };

  const handleSubmit = async (data: ClientFormData) => {
    const toastId = toast.loading('Creating client...');
    setIsSubmitting(true);

    try {
      setError(null);
      await clientService.createClient(data);
      toast.success('Client created successfully', { id: toastId });
      setIsModalOpen(false);
      window.location.reload();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create client';
      setError(errorMessage);
      toast.error(errorMessage, { id: toastId });
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="space-y-3">
        <div className="flex items-center gap-4">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="Search clients..."
              className="w-full pl-9 pr-8 py-2 text-sm border rounded-md focus:ring-primary"
            />
            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <div className="flex gap-2 ml-auto">
            <button className="flex items-center px-3 py-1.5 text-sm border rounded bg-gray-50 hover:bg-gray-100">
              <Download className="h-4 w-4 mr-1" />
              Download
            </button>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center px-3 py-1.5 text-sm bg-primary text-white rounded hover:bg-primary-dark"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Client
            </button>
          </div>
        </div>
        <Tabs 
          tabs={tabs} 
          activeTab={activeTab} 
          onTabChange={(id) => onTabChange(id as ClientFilter)} 
        />
        {error && (
          <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
            {error}
          </div>
        )}
      </div>

      <ClientFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </>
  );
};