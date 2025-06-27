import type { Icons } from "../shared/icons";
export type DeliverProUserRole = 'admin' | 'shop_owner' | 'driver';
export interface NavigationMenuItem {
  path: string;
  label: string;
  icon?: keyof typeof Icons;
  isActive?: boolean;
}

export interface DeliverProNavbarProps {
  role: DeliverProUserRole;
  username: string;
  initials?: string;
  menuItems: NavigationMenuItem[];
}