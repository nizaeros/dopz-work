export interface Client {
  id: string;
  name: string;
  registeredName: string;
  type: 'business' | 'government' | 'individual';
  industry: string;
  createdAt: string;
  isActive: boolean;
  logoUrl?: string;
  parentAccounts?: string[];
  gstin?: string;
  city?: string;
  state?: string;
  country?: string;
}