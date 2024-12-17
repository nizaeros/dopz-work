export const AccountType = {
  Individual: 'individual',
  Business: 'business', 
  Government: 'government'
} as const;

export type AccountType = typeof AccountType[keyof typeof AccountType];