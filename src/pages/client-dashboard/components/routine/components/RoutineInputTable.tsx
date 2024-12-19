import React from 'react';
import { CheckCircle2, Clock, AlertCircle, XCircle, Eye } from 'lucide-react';
import { formatDate } from '../../../../../utils/date';
import { formatCurrency } from '../../../../../utils/format';
import { Button } from '../../../../../components/ui/Button';
import type { RoutineInput, RoutineInputStatus } from '../types';

interface RoutineInputTableProps {
  inputs: RoutineInput[];
  onView: (input: RoutineInput) => void;
}

export const RoutineInputTable: React.FC<RoutineInputTableProps> = ({ inputs, onView }) => {
  const getStatusStyles = (status: RoutineInputStatus) => {
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
      },
      'Book-Keeping': {
        bg: 'bg-blue-50',
        text: 'text-blue-700',
        icon: <CheckCircle2 className="h-4 w-4 text-blue-500" />
      }
    };
    return styles[status];
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Doc Code
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Created At
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Month
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Category
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Party Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Notes
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {inputs.map((input) => {
            const statusStyle = getStatusStyles(input.status);
            return (
              <tr key={input.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary">
                  {input.docCode}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(input.createdAt)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {input.month}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {input.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${statusStyle.bg} ${statusStyle.text}`}>
                    {statusStyle.icon}
                    {input.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {input.partyName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatCurrency(input.amount)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {input.notes}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => onView(input)}
                    className="inline-flex items-center gap-1.5"
                  >
                    <Eye className="h-4 w-4" />
                    View
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};