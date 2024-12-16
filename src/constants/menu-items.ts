import { Users, ClipboardList, Shield } from 'lucide-react';
import { MenuItem } from '../types/menu';
import { ROUTES } from './routes';

export const INTERNAL_MENU_ITEMS: MenuItem[] = [
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

export const CLIENT_MANAGEMENT_MENU: MenuItem[] = [
  {
    title: 'Overview',
    icon: Users,
    to: ROUTES.INTERNAL.CLIENTS
  },
  {
    title: 'Analytics',
    icon: ClipboardList,
    to: '/internal/clients/analytics'
  },
  {
    title: 'Settings',
    icon: Shield,
    to: '/internal/clients/settings'
  }
];