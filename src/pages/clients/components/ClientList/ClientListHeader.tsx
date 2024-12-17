import React from 'react';
import { Breadcrumb } from '../../../../components/clients/Breadcrumb';

export const ClientListHeader: React.FC = () => {
  const breadcrumbItems = [{ label: 'Clients' }];

  return (
    <div className="space-y-1">
      <Breadcrumb items={breadcrumbItems} />
      <h1 className="text-2xl font-bold text-gray-900">Clients</h1>
    </div>
  );
};