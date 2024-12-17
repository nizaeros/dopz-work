export const ReceivableStatus = {
  Draft: 'draft',
  ForReview: 'for_review',
  Suspense: 'suspense',
  Verified: 'verified'
} as const;

export type ReceivableStatus = typeof ReceivableStatus[keyof typeof ReceivableStatus];