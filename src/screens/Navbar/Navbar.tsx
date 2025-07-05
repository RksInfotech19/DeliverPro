import React from "react";
import { Container, Navbar, Nav, OverlayTrigger, Popover } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Icons } from "../../shared/icons";
import logo from "../../assets/images/logo.png";
import styles from "./Navbar.module.css";
import type { DeliverProUserRole, NavigationMenuItem } from "./NavbarConfig";
import AlertService from "../../service/alert.service"; // ✅ import AlertService

interface DeliverProNavbarProps {
  userRole: DeliverProUserRole;
  userName: string;
  userInitials?: string;
  navItems: NavigationMenuItem[];
  onLogout: () => void;
}

const DeliverProNavbar = ({
  userRole,
  userName,
  userInitials,
  navItems,
  onLogout,
}: DeliverProNavbarProps) => {
  const navigate = useNavigate();
  const initials = userInitials || userName.substring(0, 2).toUpperCase();

  // ✅ Logout confirmation using AlertService
  const handleLogout = async () => {
    const confirmed = await AlertService.confirmLogout();
    if (confirmed) {
      onLogout();
    }
  };

  // Handles both account settings & logout
  const handleAction = (action: "settings" | "logout") => {
    if (action === "settings") {
      navigate("/account-settings");
    } else {
      handleLogout();
    }
  };

  // Action Item Component
  const ActionItem = ({
    icon: Icon,
    label,
    action,
  }: {
    icon: React.ElementType;
    label: string;
    action: "settings" | "logout";
  }) => (
    <div
      className={styles.popoverItem}
      onClick={(e) => {
        e.stopPropagation();
        handleAction(action);
      }}
    >
      <Icon className={styles.popoverIcon} />
      <span>{label}</span>
    </div>
  );

  // User Popover Content
  const renderUserPopover = () => (
    <Popover id="popover-user-actions" className={styles.userPopover}>
      <Popover.Header as="h3" className={styles.popoverHeader}>
        <div className="d-flex align-items-center">
          <div className={styles.popoverUserAvatar}>
            <Icons.FaUserIcon />
          </div>
          <div className="ms-2">
            <div className={styles.popoverUserName}>{userName}</div>
            <div className={styles.popoverUserRole}>{userRole}</div>
          </div>
        </div>
      </Popover.Header>
      <Popover.Body className={styles.popoverBody}>
        <ActionItem icon={Icons.FaCog} label="Account Settings" action="settings" />
        <ActionItem icon={Icons.FaSignOutAlt} label="Logout" action="logout" />
      </Popover.Body>
    </Popover>
  );

  return (
    <Navbar expand="lg" sticky="top" className={styles.navbarCustom}>
      <Container fluid>
        {/* Brand logo */}
        <Navbar.Brand href="/" className={`d-flex align-items-center ${styles.brandBox}`}>
          <img src={logo} alt="DeliverPro Logo" className={`${styles.logo} me-2`} />
          <span className={styles.appName}>DELIVERPRO</span>
        </Navbar.Brand>

        {/* Desktop User Avatar with Popover */}
        <div className={`d-none d-lg-flex align-items-center ${styles.userInfoContainer}`}>
          <OverlayTrigger trigger="click" placement="bottom-end" overlay={renderUserPopover()} rootClose>
            <div className={styles.userInfo}>
              <div className={styles.userAvatarInitials}>{initials}</div>
            </div>
          </OverlayTrigger>
        </div>

        {/* Toggle button (mobile) */}
        <Navbar.Toggle aria-controls="deliverpro-navbar" className={styles.customToggle}>
          <Icons.FaBars className={styles.menuIcon} />
        </Navbar.Toggle>

        {/* Collapse content */}
        <Navbar.Collapse id="deliverpro-navbar">
          <Nav className="ms-auto">
            {/* Menu links */}
            {navItems
              .filter((item) => item.path !== "/settings")
              .map(({ path, label, icon, isActive }, i) => {
                const Icon = icon ? Icons[icon] : null;
                return (
                  <Nav.Link key={i} href={path} className={`${styles.navLink} ${isActive ? styles.active : ""}`}>
                    {Icon && <Icon />} <span>{label}</span>
                  </Nav.Link>
                );
              })}

            {/* Mobile-only settings and logout */}
            <div className="d-lg-none">
              {["settings", "logout"].map((action, i) => {
                const Icon = action === "settings" ? Icons.FaCog : Icons.FaSignOutAlt;
                const label = action === "settings" ? "Account Settings" : "Logout";
                return (
                  <Nav.Link
                    key={i}
                    href={`#${action}`}
                    className={styles.navLink}
                    onClick={(e) => {
                      e.preventDefault();
                      handleAction(action as "settings" | "logout");
                    }}
                  >
                    <Icon />
                    <span>{label}</span>
                  </Nav.Link>
                );
              })}
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default DeliverProNavbar;
