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
      className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
    >
      <div className="p-6">
        <div className="flex items-center space-x-4">
          <div className="bg-primary/10 p-3 rounded-full">
            <Building2 className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{client.name}</h3>
            <p className="text-sm text-gray-500">{client.industry}</p>
          </div>
        </div>
        
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="flex items-center text-sm text-gray-600">
            <Users className="h-4 w-4 mr-2" />
            <span>{client.employeeCount} Employees</span>
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