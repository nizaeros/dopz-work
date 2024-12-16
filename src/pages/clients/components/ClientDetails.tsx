import React from 'react';
import { useParams } from 'react-router-dom';
import { Building2, Mail, Phone, MapPin } from 'lucide-react';

export const ClientDetails: React.FC = () => {
  const { clientId } = useParams();

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Building2 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Client Details</h2>
              <p className="text-sm text-gray-500">ID: {clientId}</p>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <span className="text-gray-600">contact@example.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gray-400" />
                <span className="text-gray-600">+1 234 567 890</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-gray-400" />
                <span className="text-gray-600">123 Business Street, City, Country</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};