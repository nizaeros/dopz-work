import React from 'react';
import { Circle } from 'lucide-react';

export interface Tab {
  id: string;
  label: string;
  count?: number;
  icon?: 'check' | 'x' | 'list';
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const TabIcon = ({ type }: { type?: string }) => {
  switch (type) {
    case 'check':
      return (
        <div className="relative">
          <Circle className="h-3 w-3 text-green-500 fill-current animate-pulse" />
        </div>
      );
    case 'x':
      return (
        <div className="relative">
          <Circle className="h-3 w-3 text-red-500 fill-current animate-pulse" />
        </div>
      );
    case 'list':
      return (
        <div className="relative">
          <Circle className="h-3 w-3 text-gray-400" />
        </div>
      );
    default:
      return null;
  }
};

export const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex gap-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              group inline-flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors
              ${activeTab === tab.id
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
            `}
          >
            {tab.icon && <TabIcon type={tab.icon} />}
            <span>{tab.label}</span>
            {typeof tab.count === 'number' && (
              <span className={`
                rounded-full px-2 py-0.5 text-xs font-medium
                ${activeTab === tab.id
                  ? 'bg-primary/10 text-primary'
                  : 'bg-gray-100 text-gray-600 group-hover:text-gray-700'}
              `}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
};