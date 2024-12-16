import { Users, ClipboardList, Shield, FileText, MessageSquare, Clock } from 'lucide-react';
import { ROUTES } from './routes';

export const INTERNAL_MENU_ITEMS = [
  {
    title: 'Client Management',
    description: 'Manage client accounts and services',
    icon: Users,
    to: ROUTES.INTERNAL.CLIENTS
  },
  {
    title: 'Client Routine Inputs',
    description: 'Manage routine data for clients',
    icon: ClipboardList,
    to: ROUTES.INTERNAL.ROUTINE_INPUTS
  },
  {
    title: 'System Administrator',
    description: 'Administer system settings and roles',
    icon: Shield,
    to: ROUTES.INTERNAL.ADMIN
  }
];

export const CLIENT_MENU_ITEMS = [
  {
    title: 'My Documents',
    description: 'Access your documents and files',
    icon: FileText,
    to: ROUTES.CLIENT.DOCUMENTS
  },
  {
    title: 'Support',
    description: 'Get help and support',
    icon: MessageSquare,
    to: ROUTES.CLIENT.SUPPORT
  },
  {
    title: 'Activity',
    description: 'View recent activities',
    icon: Clock,
    to: ROUTES.CLIENT.ACTIVITY
  }
];