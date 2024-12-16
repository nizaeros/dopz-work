import React, { useState } from 'react';
import { Search, Download, Plus, Copy, ExternalLink } from 'lucide-react';
import { Breadcrumb } from '../../../components/clients/Breadcrumb';
import { Tabs } from '../../../components/ui/Tabs';
import { useClients, type ClientFilter } from '../../../hooks/useClients';
import { formatDate } from '../../../utils/date';
import { LoadingSpinner } from '../../../components/ui/LoadingSpinner';
import { ErrorMessage } from '../../../components/ui/ErrorMessage';

export const ClientList: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ClientFilter>('active');
  const { clients, counts, loading, error } = useClients(activeTab);

  const breadcrumbItems = [{ label: 'Clients' }];

  const tabs = [
    { id: 'active', label: 'Active', count: counts.active, icon: 'check' },
    { id: 'inactive', label: 'Inactive', count: counts.inactive, icon: 'x' },
    { id: 'all', label: 'All', count: counts.all, icon: 'list' },
  ];

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      console.log('Copied to clipboard:', text);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="w-full space-y-3">
      {/* Breadcrumb */}
      <Breadcrumb items={breadcrumbItems} />

      {/* Search and Actions */}
      <div className="flex items-center gap-4">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search clients..."
            className="w-full pl-9 pr-4 py-2 text-sm border rounded focus:ring-primary"
          />
        </div>
        <div className="flex gap-2 ml-auto">
          <button className="flex items-center px-3 py-1.5 text-sm border rounded bg-gray-50 hover:bg-gray-100">
            <Download className="h-4 w-4 mr-1" />
            Download
          </button>
          <button className="flex items-center px-3 py-1.5 text-sm bg-primary text-white rounded hover:bg-primary-dark">
            <Plus className="h-4 w-4 mr-1" />
            Add Client
          </button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={(id) => setActiveTab(id as ClientFilter)} />

      {/* Client List */}
      <div className="space-y-2">
        {loading ? (
          <div className="text-center py-6">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <ErrorMessage message={error} />
        ) : clients?.length === 0 ? (
          <div className="text-center py-6 text-gray-500">No clients found</div>
        ) : (
          clients.map((client) => (
            <div
              key={client.id}
              className="flex items-center bg-white border rounded p-3 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Logo */}
              <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded bg-gray-50">
                {client.logoUrl ? (
                  <img src={client.logoUrl} alt="" className="h-10 w-10 object-cover rounded" />
                ) : (
                  <span className="text-gray-500 text-sm font-medium">
                    {client.name.charAt(0)}
                  </span>
                )}
              </div>

              {/* Client Details */}
              <div className="flex-1 ml-4">
                <div className="font-medium text-gray-900 flex items-center gap-2">
                  {client.name}
                  {client.parentAccounts?.map((code) => (
                    <span
                      key={code}
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        code === 'DC' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {code}
                    </span>
                  ))}
                </div>
                <div className="text-sm text-gray-600 flex items-center">
                  <span>{client.registeredName}</span>
                  <button
                    onClick={() => copyToClipboard(client.registeredName)}
                    className="ml-2 text-gray-400 hover:text-gray-600"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Entity Type + Location */}
              <div className="text-sm text-gray-600 w-1/5">
                <div>{client.type}</div>
                <div>{[client.city, client.state, client.country].filter(Boolean).join(', ')}</div>
              </div>

              {/* Industry + Account Type */}
              <div className="text-sm text-gray-600 w-1/5">
                <div>{client.industry}</div>
                <div>{client.accountType}</div>
              </div>

              {/* GSTN + Created At */}
              <div className="text-sm text-gray-600 w-1/5">
                <div className="flex items-center">
                  <span>{client.gstin}</span>
                  <button
                    onClick={() => copyToClipboard(client.gstin)}
                    className="ml-2 text-gray-400 hover:text-gray-600"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
                <div>{formatDate(client.createdAt)}</div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 ml-auto">
                <button className="text-gray-400 hover:text-gray-600">
                  <ExternalLink className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
