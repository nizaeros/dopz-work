import { z } from 'zod';

export const RoutineInputStatus = {
  Review: 'Review',
  Suspense: 'Suspense',
  Verified: 'Verified',
  BookKeeping: 'Book-Keeping',
  Cancelled: 'Cancelled'
} as const;

export type RoutineInputStatus = typeof RoutineInputStatus[keyof typeof RoutineInputStatus];

export const routineInputSchema = z.object({
  id: z.string().uuid(),
  docCode: z.string(),
  createdAt: z.string(),
  month: z.string(),
  datedOn: z.string(),
  category: z.string(),
  status: z.nativeEnum(RoutineInputStatus),
  partyName: z.string(),
  amount: z.number(),
  bookKeeping: z.boolean(),
  notes: z.string().optional()
});

export type RoutineInput = z.infer<typeof routineInputSchema>;

export interface RoutineInputFilters {
  status: RoutineInputStatus | 'all';
  month?: string;
  category?: string;
  search?: string;
}