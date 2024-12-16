import { Users, LayoutDashboard } from 'lucide-react';
import { MenuItem } from '../types/menu';
import { ROUTES } from './routes';

export const INTERNAL_MENU_ITEMS: MenuItem[] = [
  {
    title: 'Client Management',
    description: 'Manage client accounts and services',
    icon: Users,
    to: `${ROUTES.INTERNAL.CLIENTS}/list`
  },
  {
    title: 'Client Routine Inputs',
    description: 'Manage routine data for clients',
    icon: LayoutDashboard,
    to: ROUTES.INTERNAL.ROUTINE_INPUTS
  },
  {
    title: 'System Administrator',
    description: 'Administer system settings and roles',
    icon: Users,
    to: ROUTES.INTERNAL.ADMIN
  }
];

export const CLIENT_MANAGEMENT_MENU: MenuItem[] = [
  {
    title: 'Overview',
    icon: LayoutDashboard,
    to: '/internal/clients/overview'
  },
  {
    title: 'Clients',
    icon: Users,
    to: '/internal/clients/list'
  }
];