import { Container, Navbar, Nav } from 'react-bootstrap';
import { Icons } from '../../shared/icons';
import logo from '../../assets/images/logo.png';
import styles from './Navbar.module.css';
import type { DeliverProUserRole, NavigationMenuItem } from './NavbarConfig'; 

interface DeliverProNavbarProps {
  userRole: DeliverProUserRole;
  userName: string;
  userInitials?: string;
  navItems: NavigationMenuItem[];
}

const DeliverProNavbar = ({
  userRole,
  userName,
  userInitials,
  navItems,
}: DeliverProNavbarProps) => {
  return (
    <Navbar expand="lg" fixed="top" className={styles.navbarCustom}>
      <Container fluid>
      <Navbar.Brand href="/" className={`d-flex align-items-center ${styles.brandBox}`}>
        <img
          src={logo}
          alt="DeliverPro Logo"
          className={`${styles.logo} me-2`}
        />
        <span className={styles.appName}>DELIVERPRO</span>
      </Navbar.Brand>


        <Navbar.Toggle aria-controls="deliverpro-navbar" />

<Navbar.Collapse id="deliverpro-navbar" className="justify-content-between">
  <Nav className="ms-auto">
    {navItems.map((item, index) => {
      const IconComponent = item.icon ? Icons[item.icon] : null;
      return (
        <Nav.Link
          key={index}
          href={item.path}
          className={`${styles.navLink} ${item.isActive ? styles.active : ''}`}
        >
          {IconComponent && <IconComponent className="me-1" />}
          {item.label}
        </Nav.Link>
      );
    })}
  </Nav>

  <Nav className="align-items-center ms-3">
    <div className={styles.userInfoContainer}>
      <div className={`d-flex align-items-center ${styles.userInfo}`}>
        <div className={`${styles.userAvatarInitials} me-2`}>
          {userInitials || userName.substring(0, 2).toUpperCase()}
        </div>
        <div className={styles.userDetails}>
          <span className={styles.userRoleBadge}>{userRole}</span>
        </div>
      </div>
    </div>
  </Nav>
</Navbar.Collapse>

      </Container>
    </Navbar>

    
  );
};

export default DeliverProNavbar;