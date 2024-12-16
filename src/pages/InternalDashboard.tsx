import React from 'react';
import { Users, FileText, Settings, Building } from 'lucide-react';
import { MenuCard } from '../components/MenuCard';

export const InternalDashboard: React.FC = () => {
  const menuItems = [
    {
      title: 'Client Management',
      description: 'Manage client accounts and services',
      icon: Users,
      to: '/internal/clients'
    },
    {
      title: 'Documents',
      description: 'Access and manage documentation',
      icon: FileText,
      to: '/internal/documents'
    },
    {
      title: 'Operations',
      description: 'View and manage operations',
      icon: Building,
      to: '/internal/operations'
    },
    {
      title: 'Settings',
      description: 'Configure system settings',
      icon: Settings,
      to: '/internal/settings'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-[#132490] mb-6">Operations Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item) => (
          <MenuCard
            key={item.title}
            title={item.title}
            description={item.description}
            icon={item.icon}
            to={item.to}
          />
        ))}
      </div>
    </div>
  );
};