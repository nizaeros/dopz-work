import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { ROUTES } from '../../constants/routes';

interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="flex items-center space-x-2 text-sm">
      <Link to={ROUTES.INTERNAL.DASHBOARD} className="text-gray-500 hover:text-gray-700">
        Home
      </Link>
      {items.map((item, index) => (
        <React.Fragment key={item.label}>
          <ChevronRight className="h-4 w-4 text-gray-400" />
          {item.to && index < items.length - 1 ? (
            <Link to={item.to} className="text-gray-500 hover:text-gray-700">
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-900 font-medium">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};