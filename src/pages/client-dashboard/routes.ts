import { LayoutDashboard, FileInput } from 'lucide-react';

export const CLIENT_DASHBOARD_ROUTES = {
  OVERVIEW: '/client/:clientId/dashboard',
  INPUT: {
    ROOT: '/client/:clientId/input',
    ROUTINE: '/client/:clientId/input/routine',
    ONETIME: '/client/:clientId/input/onetime'
  }
} as const;

export const CLIENT_DASHBOARD_MENU = [
  {
    title: 'Overview',
    icon: LayoutDashboard,
    path: '/dashboard',
    exact: true
  },
  {
    title: 'Input Data',
    icon: FileInput,
    path: '/input',
    isExpandable: true,
    submenu: [
      {
        title: 'Routine Input',
        path: '/input/routine'
      },
      {
        title: 'Onetime Inputs',
        path: '/input/onetime'
      }
    ]
  }
];