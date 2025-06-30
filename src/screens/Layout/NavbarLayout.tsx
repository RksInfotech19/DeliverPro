import { Outlet } from 'react-router-dom';
import DeliverProNavbar from '../Navbar/Navbar';

const Layout = () => {
  return (
    <>
      <DeliverProNavbar userRole="ShopOwner" userName="Priya" navItems={[]} />
      <main className='pageContent'>
        <Outlet /> {/* This will render nested routes */}
      </main>
    </>
  );
};

export default Layout;
