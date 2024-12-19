import { LucideIcon } from 'lucide-react';

export interface Activity {
  id: string;
  description: string;
  timestamp: string;
  user: string;
  icon: LucideIcon;
  type: 'status_change' | 'document_upload' | 'document_delete' | 'comment';
}