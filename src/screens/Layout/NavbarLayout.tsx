import { Outlet, useLocation } from 'react-router-dom';
import DeliverProNavbar from '../Navbar/Navbar';
import { ROLE_BASED_NAVIGATION } from '../Navbar/NavbarConfig';

const Layout = () => {
  const location = useLocation();

  // Paths where the navbar should NOT show navItems
  const noNavItemPaths = ['/', '/add-shop'];

  // Check if current path should hide navItems
  const shouldHideNavItems = noNavItemPaths.includes(location.pathname);

  const userRole = 'ShopOwner'; // You can get this dynamically if needed

  return (
    <>
      <DeliverProNavbar
        userRole={userRole}
        userName="Priya"
        navItems={shouldHideNavItems ? [] : ROLE_BASED_NAVIGATION[userRole].navItems}
      />
      <main className='pageContent'>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
