import DeliverProNavbar from './Navbar/Navbar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <DeliverProNavbar userRole="ShopOwner" userName="Priya" navItems={[]} />
      <main className='pageContent'>{children}</main>
    </>
  );
};

export default Layout;
