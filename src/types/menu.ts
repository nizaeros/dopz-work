import { LucideIcon } from 'lucide-react';

export interface MenuItem {
  title: string;
  icon: LucideIcon;
  to: string;
}

export interface MenuSection {
  title: string;
  items: MenuItem[];
}