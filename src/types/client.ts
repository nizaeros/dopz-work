export interface Client {
  id: string;
  name: string;
  registeredName: string;
  type: 'business' | 'government' | 'individual';
  industry: string;
  createdAt: string;
  isActive: boolean;
}