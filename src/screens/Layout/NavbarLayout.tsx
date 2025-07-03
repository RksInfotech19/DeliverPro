import { Outlet, useLocation } from 'react-router-dom';
import DeliverProNavbar from '../Navbar/Navbar';
import { ROLE_BASED_NAVIGATION } from '../Navbar/NavbarConfig';
import type { NavigationMenuItem } from '../Navbar/NavbarConfig';

const Layout = () => {
  const location = useLocation();
  const userRole = 'ShopOwner'; // This can be dynamic later
  const currentPath = location.pathname;

  const noNavItemPaths = ['/', '/add-shop'];
  const shouldHideNavItems = noNavItemPaths.includes(currentPath);

  const baseNavItems = ROLE_BASED_NAVIGATION[userRole].navItems;

  const navItems: NavigationMenuItem[] = shouldHideNavItems
    ? []
    : baseNavItems.map((item) => ({
        ...item,
        isActive: currentPath.startsWith(item.path), // ← dynamic active status
      }));

  return (
    <>
      <DeliverProNavbar
        userRole={userRole}
        userName="Priya"
        navItems={navItems}
      />
      <main className='pageContent'>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
