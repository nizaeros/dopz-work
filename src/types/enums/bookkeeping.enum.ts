export const BookkeepingStatus = {
  Yes: 'yes',
  No: 'no'
} as const;

export type BookkeepingStatus = typeof BookkeepingStatus[keyof typeof BookkeepingStatus];