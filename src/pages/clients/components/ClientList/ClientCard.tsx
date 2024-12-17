import React from 'react';
import { Copy, ExternalLink, Edit2, MapPin, Briefcase, Building, Calendar, Users } from 'lucide-react';
import { formatDate } from '../../../../utils/date';
import type { Client } from '../../../../types/client';
import { useClipboard } from '../../../../hooks/useClipboard';
import { ClientDetailItem } from './ClientDetailItem';

interface ClientCardProps {
  client: Client;
}

export const ClientCard: React.FC<ClientCardProps> = ({ client }) => {
  const { copyToClipboard } = useClipboard();

  const getParentAccountColor = (code: string) => {
    const colors = {
      'DC': {
        background: 'bg-gradient-to-r from-blue-500/10 to-indigo-500/10',
        text: 'text-blue-700',
        border: 'border-blue-200',
      },
      'DCL': {
        background: 'bg-gradient-to-r from-purple-500/10 to-pink-500/10',
        text: 'text-purple-700',
        border: 'border-purple-200',
      },
    };
    return colors[code as keyof typeof colors] || colors.DC;
  };

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
      {/* Header Section */}
      <div className="flex items-start gap-6">
        {/* Logo */}
        <div className="w-16 h-16 flex-shrink-0 flex items-center justify-center bg-gray-50 rounded-lg">
          {client.logoUrl ? (
            <img 
              src={client.logoUrl} 
              alt={client.name} 
              className="w-full h-full object-contain p-2" 
            />
          ) : (
            <Building className="h-8 w-8 text-gray-400" />
          )}
        </div>

        {/* Main Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              {/* Title and Parent Account Tags */}
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-xl font-semibold text-gray-900 truncate">
                  {client.name}
                </h3>
                <div className="flex gap-2">
                  {client.parentAccounts?.map((code) => {
                    const colors = getParentAccountColor(code);
                    return (
                      <span
                        key={code}
                        className={`
                          inline-flex items-center px-2.5 py-0.5 text-xs font-medium
                          rounded-full border backdrop-blur-sm
                          ${colors.background}
                          ${colors.text}
                          ${colors.border}
                        `}
                      >
                        {code}
                      </span>
                    );
                  })}
                </div>
              </div>
              
              {/* Location */}
              <div className="flex items-center gap-1.5 text-sm text-gray-600">
                <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <span className="truncate">
                  {[client.city, client.state, client.country].filter(Boolean).join(', ')}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 flex-shrink-0">
              <button 
                className="p-1.5 text-gray-400 hover:text-primary hover:bg-gray-50 rounded-md transition-colors"
                title="Edit client"
              >
                <Edit2 className="h-5 w-5" />
              </button>
              <button 
                className="p-1.5 text-gray-400 hover:text-primary hover:bg-gray-50 rounded-md transition-colors"
                title="View details"
              >
                <ExternalLink className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-100 my-5" />

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-x-8 gap-y-4">
        {/* Company Details */}
        <div className="space-y-3">
          <ClientDetailItem
            label="Registered Name"
            value={client.registeredName}
            copyable
            onCopy={() => copyToClipboard(client.registeredName)}
            className="text-gray-900"
          />
          <ClientDetailItem
            label="GSTIN"
            value={client.gstin || 'N/A'}
            copyable={!!client.gstin}
            onCopy={() => client.gstin && copyToClipboard(client.gstin)}
            className="font-mono text-gray-700"
          />
        </div>

        {/* Business Details */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-3">
            <ClientDetailItem
              label="Entity Type"
              value={client.type}
              icon={Briefcase}
              className="capitalize"
            />
            <ClientDetailItem
              label="Industry"
              value={client.industry || 'N/A'}
              icon={Building}
            />
          </div>
          <div className="space-y-3">
            <ClientDetailItem
              label="Account Type"
              value={client.accountType}
              icon={Users}
              className="capitalize"
            />
            <ClientDetailItem
              label="Created"
              value={formatDate(client.createdAt)}
              icon={Calendar}
            />
          </div>
        </div>
      </div>
    </div>
  );
};