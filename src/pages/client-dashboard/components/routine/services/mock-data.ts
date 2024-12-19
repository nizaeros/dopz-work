import type { RoutineInput } from '../types';

export const MOCK_INPUTS: RoutineInput[] = [
  {
    id: '1',
    docCode: 'D000738',
    createdAt: '2024-02-09T11:17:00Z',
    month: 'Nov',
    datedOn: '2024-11-30',
    category: 'Stock Report',
    status: 'Verified',
    partyName: 'Closing Stock Report',
    amount: 18036,
    bookKeeping: true,
    notes: "Closing Stock Report_November'24",
    documents: [
      {
        id: '1',
        url: 'https://example.com/sample.pdf',
        name: 'Stock Report.pdf',
        type: 'pdf'
      }
    ]
  },
  {
    id: '2',
    docCode: 'D000739',
    createdAt: '2024-02-09T11:18:00Z',
    month: 'Nov',
    datedOn: '2024-11-30',
    category: 'Expense Bill',
    status: 'Review',
    partyName: 'Office Supplies Ltd',
    amount: 5200,
    bookKeeping: false,
    notes: 'Monthly office supplies',
    documents: [
      {
        id: '2',
        url: 'https://example.com/invoice.pdf',
        name: 'Invoice.pdf',
        type: 'pdf'
      }
    ]
  }
];