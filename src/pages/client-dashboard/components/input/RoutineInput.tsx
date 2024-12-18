import React, { useState } from 'react';
import { Search, Plus, X, Filter, Circle, CheckCircle2, AlertCircle, Clock, XCircle } from 'lucide-react';
import { Button } from '../../../../components/ui/Button';
import { Tabs } from '../../../../components/ui/Tabs';

interface RoutineInputData {
  docCode: string;
  createdAt: string;
  month: string;
  datedOn: string;
  category: string;
  status: 'Review' | 'Suspense' | 'Verified' | 'Book-Keeping' | 'Cancelled';
  partyName: string;
  amount: number;
  bookKeeping: boolean;
  notes: string;
}

const MOCK_DATA: RoutineInputData[] = [
  {
    docCode: 'D000738',
    createdAt: '09-Dec-24 11:17',
    month: 'Nov',
    datedOn: '30-Nov-24',
    category: 'Stock Report',
    status: 'Verified',
    partyName: 'Closing Stock Report',
    amount: 18036,
    bookKeeping: true,
    notes: 'Closing Stock Report_November\'24'
  },
  // Add more mock data as needed
];

export const RoutineInput: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedYear, setSelectedYear] = useState('2024');

  const tabs = [
    { 
      id: 'all', 
      label: 'All', 
      count: 738,
      icon: 'list'
    },
    { 
      id: 'review', 
      label: 'Review', 
      count: 2,
      icon: 'clock'
    },
    { 
      id: 'suspense', 
      label: 'Suspense', 
      count: 0,
      icon: 'alert'
    },
    { 
      id: 'verified', 
      label: 'Verified', 
      count: 735,
      icon: 'check'
    },
    { 
      id: 'cancelled', 
      label: 'Cancelled', 
      count: 1,
      icon: 'x'
    }
  ];

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const getStatusStyles = (status: string) => {
    const styles = {
      Verified: {
        bg: 'bg-green-50',
        text: 'text-green-700',
        icon: <CheckCircle2 className="h-4 w-4 text-green-500" />
      },
      Review: {
        bg: 'bg-yellow-50',
        text: 'text-yellow-700',
        icon: <Clock className="h-4 w-4 text-yellow-500" />
      },
      Suspense: {
        bg: 'bg-orange-50',
        text: 'text-orange-700',
        icon: <AlertCircle className="h-4 w-4 text-orange-500" />
      },
      Cancelled: {
        bg: 'bg-red-50',
        text: 'text-red-700',
        icon: <XCircle className="h-4 w-4 text-red-500" />
      }
    };
    return styles[status as keyof typeof styles] || styles.Review;
  };

  return (
    <div className="space-y-6">
      {/* Header with Financial Year Selection */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Routine Input</h1>
          <p className="mt-1 text-sm text-gray-500">Manage your routine data inputs</p>
        </div>
        <div className="flex items-center gap-4">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-3 py-1.5 border border-gray-300 rounded-md text-sm 
              focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
              bg-white"
          >
            <option value="2024">FY 2024-25</option>
            <option value="2023">FY 2023-24</option>
          </select>
        </div>
      </div>

      {/* Search and Actions Bar */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search documents..."
            className="w-full pl-9 pr-8 py-2 text-sm border border-gray-300 rounded-md 
              focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
              transition-colors duration-200"
          />
          {searchQuery && (
            <button
              onClick={handleClearSearch}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-1" />
          Add New
        </Button>
      </div>

      {/* Tabs */}
      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Doc code
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created at
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Month
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dated on
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Party name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Book-Keeping
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {MOCK_DATA.map((item) => {
                const statusStyle = getStatusStyles(item.status);
                return (
                  <tr key={item.docCode} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary">
                      {item.docCode}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.createdAt}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.month}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.datedOn}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${statusStyle.bg} ${statusStyle.text}`}>
                        {statusStyle.icon}
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.partyName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.bookKeeping && (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.notes}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};