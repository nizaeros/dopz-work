import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Download, Filter } from 'lucide-react';
import { ClientCard } from './ClientCard';
import { Breadcrumb } from '../../../components/clients/Breadcrumb';
import { Tabs, type Tab } from '../../../components/ui/Tabs';
import { useClients, type ClientFilter } from '../../../hooks/useClients';

export const ClientList: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ClientFilter>('active');
  const { clients, counts, loading, error } = useClients(activeTab);

  const tabs: Tab[] = [
    { id: 'active', label: 'Active', count: counts.active, icon: 'check' },
    { id: 'inactive', label: 'Inactive', count: counts.inactive, icon: 'x' },
    { id: 'all', label: 'All', count: counts.all, icon: 'list' }
  ];

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId as ClientFilter);
  };

  const breadcrumbItems = [{ label: 'Clients' }];

  return (
    <div className="w-full space-y-3">
      {/* Breadcrumb */}
      <div className="py-1">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      {/* Search and Actions */}
      <div className="flex items-center gap-4">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search clients..."
            className="w-full pl-9 pr-9 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <Filter className="h-4 w-4 text-gray-400 hover:text-gray-600" />
          </button>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <button className="inline-flex items-center px-3 py-2 text-sm border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50">
            <Download className="h-4 w-4 mr-2" />
            Download
          </button>
          <Link
            to="../create"
            className="inline-flex items-center px-3 py-2 text-sm bg-primary text-white rounded-md hover:bg-primary-dark"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Client
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      {/* Client Cards */}
      {loading ? (
        <div className="text-center py-4">Loading clients...</div>
      ) : error ? (
        <div className="text-center py-4 text-red-600">Error loading clients: {error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {clients?.map((client) => (
            <ClientCard key={client.id} client={client} />
          ))}
        </div>
      )}
    </div>
  );
};