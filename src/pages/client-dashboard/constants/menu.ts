import { LayoutDashboard, FileInput, FileSpreadsheet, FileStack } from 'lucide-react';

export const CLIENT_DASHBOARD_MENU = [
  {
    title: 'Overview',
    icon: LayoutDashboard,
    path: 'dashboard',
    exact: true
  },
  {
    title: 'Input Data',
    icon: FileInput,
    path: 'input',
    isExpandable: true,
    submenu: [
      {
        title: 'Routine Input',
        path: 'input/routine',
        icon: FileSpreadsheet
      },
      {
        title: 'Onetime Inputs',
        path: 'input/onetime',
        icon: FileStack
      }
    ]
  }
] as const;