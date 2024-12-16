import React from 'react';
import { FileText, MessageSquare, Clock } from 'lucide-react';
import { MenuCard } from '../components/MenuCard';

interface ClientDashboardProps {
  clientName: string;
}

export const ClientDashboard: React.FC<ClientDashboardProps> = ({ clientName }) => {
  const menuItems = [
    {
      title: 'My Documents',
      description: 'Access your documents and files',
      icon: FileText,
      to: '/client/documents'
    },
    {
      title: 'Support',
      description: 'Get help and support',
      icon: MessageSquare,
      to: '/client/support'
    },
    {
      title: 'Activity',
      description: 'View recent activities',
      icon: Clock,
      to: '/client/activity'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-[#132490] mb-6">Welcome, {clientName}</h1>
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