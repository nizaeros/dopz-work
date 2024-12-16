import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Users, Calendar } from 'lucide-react';
import type { Client } from '../../../types/client';

interface ClientCardProps {
  client: Client;
}

export const ClientCard: React.FC<ClientCardProps> = ({ client }) => {
  return (
    <Link
      to={`../${client.id}`}
      className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      <div className="p-4">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-full">
            <Building2 className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-800">{client.name}</h3>
            <p className="text-sm text-gray-500">{client.industry}</p>
          </div>
        </div>
        
        <div className="mt-3 grid grid-cols-2 gap-3">
          <div className="flex items-center text-sm text-gray-600">
            <Users className="h-4 w-4 mr-2" />
            <span>Employees</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            <span>Since {new Date(client.createdAt).getFullYear()}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};