import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface MenuCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  to: string;
}

export const MenuCard: React.FC<MenuCardProps> = ({ title, description, icon: Icon, to }) => {
  return (
    <Link
      to={to}
      className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
    >
      <div className="flex items-center space-x-4">
        <div className="bg-[#c1cbf7] p-3 rounded-full">
          <Icon className="h-6 w-6 text-[#132490]" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
    </Link>
  );
};