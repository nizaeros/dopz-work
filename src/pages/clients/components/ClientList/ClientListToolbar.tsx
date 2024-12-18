import React, { useState } from 'react';
import { Search, Download, Plus, X } from 'lucide-react';
import { Tabs } from '../../../../components/ui/Tabs';
import { ClientFormModal } from '../ClientForm/ClientFormModal';
import { clientService } from '../../../../services/client';
import toast from 'react-hot-toast';
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClearSearch = () => {
    onSearch('');
  };

  const handleSubmit = async (data: ClientFormData) => {
    const toastId = toast.loading('Creating client...');
    
    try {
      setIsSubmitting(true);
      await clientService.createClient(data);
      toast.success('Client created successfully', { id: toastId });
      setIsModalOpen(false);
      // Refresh the page to show new client
      window.location.reload();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create client';
      toast.error(errorMessage, { id: toastId });
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const tabs = [
    { id: 'active', label: 'Active', count: counts.active, icon: 'check' },
    { id: 'inactive', label: 'Inactive', count: counts.inactive, icon: 'x' },
    { id: 'all', label: 'All', count: counts.all, icon: 'list' },
  ];

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
              className="w-full pl-9 pr-8 py-2 text-sm 
                border border-gray-300 rounded-md 
                transition-colors duration-200
                focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
                placeholder-gray-400"
            />
            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 
                  text-gray-400 hover:text-gray-600 transition-colors"
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