import React from 'react';
import { MenuCard } from '../components/MenuCard';
import { INTERNAL_MENU_ITEMS } from '../constants/menu-items';

export const InternalDashboard: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Operations Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {INTERNAL_MENU_ITEMS.map((item) => (
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