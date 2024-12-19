export const RoutineInputStatus = {
  Review: 'Review',
  Suspense: 'Suspense',
  Verified: 'Verified',
  BookKeeping: 'Book-Keeping',
  Cancelled: 'Cancelled'
} as const;

export type RoutineInputStatus = typeof RoutineInputStatus[keyof typeof RoutineInputStatus];

export interface Document {
  id: string;
  url: string;
  name: string;
  type: string;
}

export interface RoutineInput {
  id: string;
  docCode: string;
  createdAt: string;
  month: string;
  datedOn: string;
  category: string;
  status: RoutineInputStatus;
  partyName: string;
  amount: number;
  bookKeeping: boolean;
  notes?: string;
  documents: Document[];
}

export interface RoutineInputFilters {
  status: RoutineInputStatus | 'all';
  month?: string;
  category?: string;
  search?: string;
}