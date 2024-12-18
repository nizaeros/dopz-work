import React from 'react';
import { ClientListHeader } from './ClientListHeader';
import { ClientListToolbar } from './ClientListToolbar';
import { ClientListContent } from './ClientListContent';
import { ClientEditModal } from './ClientEditModal';
import { useClientEdit } from './hooks/useClientEdit';
import { useClientSearch } from './hooks/useClientSearch';
import { useFilteredClients } from './hooks/useFilteredClients';
import { useClients } from '../../../../hooks/useClients';
import type { ClientFilter } from '../../../../hooks/useClients';

export const ClientList: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<ClientFilter>('active');
  
  const {
    searchOptions,
    handleSearchChange,
    handleFilterChange,
    handleClearFilters
  } = useClientSearch();

  const {
    isEditModalOpen,
    selectedClient,
    clientFormData,
    isSubmitting,
    isLoading,
    error,
    openEditModal,
    closeEditModal,
    handleEditSubmit
  } = useClientEdit();

  const clientsData = useClients(activeTab);
  const filteredClients = useFilteredClients(clientsData.clients, searchOptions);

  return (
    <div className="w-full space-y-3">
      <ClientListHeader />
      <ClientListToolbar 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        onSearch={handleSearchChange}
        searchQuery={searchOptions.query}
        counts={clientsData.counts} 
      />
      <ClientListContent 
        {...clientsData}
        clients={filteredClients}
        filters={searchOptions.filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        onEditClient={openEditModal}
      />

      <ClientEditModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        onSubmit={handleEditSubmit}
        client={selectedClient}
        clientFormData={clientFormData}
        isSubmitting={isSubmitting}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
};