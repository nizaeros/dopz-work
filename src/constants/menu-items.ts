import { Users, FileText, Settings, Building, MessageSquare, Clock } from 'lucide-react';

export const INTERNAL_MENU_ITEMS = [
  {
    title: 'Client Management',
    description: 'Manage client accounts and services',
    icon: Users,
    to: '/internal/clients'
  },
  {
    title: 'Documents',
    description: 'Access and manage documentation',
    icon: FileText,
    to: '/internal/documents'
  },
  {
    title: 'Operations',
    description: 'View and manage operations',
    icon: Building,
    to: '/internal/operations'
  },
  {
    title: 'Settings',
    description: 'Configure system settings',
    icon: Settings,
    to: '/internal/settings'
  }
];

export const CLIENT_MENU_ITEMS = [
  {
    title: 'My Documents',
    description: 'Access your documents and files',
    icon: FileText,
    to: '/client/documents'
  },
  {
    title: 'Support',
    description: 'Get help and support',
    icon: MessageSquare,
    to: '/client/support'
  },
  {
    title: 'Activity',
    description: 'View recent activities',
    icon: Clock,
    to: '/client/activity'
  }
];