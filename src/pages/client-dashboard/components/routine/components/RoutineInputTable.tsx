import React from 'react';
import { CheckCircle2, Clock, AlertCircle, XCircle } from 'lucide-react';
import { formatDate } from '../../../../../utils/date';
import { formatCurrency } from '../../../../../utils/format';
import type { RoutineInput } from '../../../../../types/routine-input';

interface RoutineInputTableProps {
  inputs: RoutineInput[];
  onView?: (input: RoutineInput) => void;
}

export const RoutineInputTable: React.FC<RoutineInputTableProps> = ({ inputs, onView }) => {
  const getStatusStyles = (status: string) => {
    const styles = {
      verified: {
        bg: 'bg-green-50',
        text: 'text-green-700',
        icon: <CheckCircle2 className="h-4 w-4 text-green-500" />
      },
      review: {
        bg: 'bg-yellow-50',
        text: 'text-yellow-700',
        icon: <Clock className="h-4 w-4 text-yellow-500" />
      },
      suspense: {
        bg: 'bg-orange-50',
        text: 'text-orange-700',
        icon: <AlertCircle className="h-4 w-4 text-orange-500" />
      },
      cancelled: {
        bg: 'bg-red-50',
        text: 'text-red-700',
        icon: <XCircle className="h-4 w-4 text-red-500" />
      }
    };
    return styles[status as keyof typeof styles] || styles.review;
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
              Date
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
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {inputs.map((input) => {
            const statusStyle = getStatusStyles(input.input_status);
            return (
              <tr 
                key={input.input_id} 
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => onView?.(input)}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary">
                  {input.input_code}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(input.created_at)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(input.dated_on)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {input.doc_categories?.doc_category_name || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${statusStyle.bg} ${statusStyle.text}`}>
                    {statusStyle.icon}
                    {input.input_status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {input.party_name || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {input.amount ? formatCurrency(input.amount) : '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {input.notes || '-'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};