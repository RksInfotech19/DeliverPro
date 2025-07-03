import type { Icons } from "../../shared/icons";

export type DeliverProUserRole = 'Admin' | 'ShopOwner' | 'Driver';

export interface NavigationMenuItem {
  path: string;
  label: string;
  icon?: keyof typeof Icons;
  isActive?: boolean;
}

export const ROLE_BASED_NAVIGATION: Record<DeliverProUserRole, { navItems: NavigationMenuItem[] }> = {
  Admin: {
    navItems: [
      { path: '/dashboard', label: 'Dashboard', icon: 'FaTachometerAlt', isActive: true },
      { path: '/users', label: 'Users', icon: 'FaUsers' },
      { path: '/orders', label: 'Orders', icon: 'FaClipboardList' },
      { path: '/analytics', label: 'Analytics', icon: 'FaChartLine' },
      { path: '/settings', label: 'Settings', icon: 'FaCog' }
    ]
  },
  ShopOwner: {
    navItems: [
      { path: '/dashboard', label: 'Dashboard', icon: 'FaStore', isActive: true },
      // { path: '/delivery-request/:id', label: 'Deliver Requests', icon: 'FaBoxes' },
      { path: '/order-list', label: 'Orders', icon: 'FaClipboardList' },
      { path: '/deliveries', label: 'Payment', icon: 'FaTruck' }
    ]
  },
  Driver: {
    navItems: [
      { path: '/available-orders', label: 'Available Orders', icon: 'FaListAlt', isActive: true },
      { path: '/my-deliveries', label: 'My Deliveries', icon: 'FaClipboardCheck' },
      { path: '/earnings', label: 'Earnings', icon: 'FaMoneyBillWave' },
      { path: '/ratings', label: 'Ratings', icon: 'FaStar' }
    ]
  }
};
