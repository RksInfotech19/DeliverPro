import { Popover } from "react-bootstrap";
import { Icons } from "../../shared/icons";
import styles from "./UserPopover.module.css";

interface UserPopoverProps {
  userName: string;
  userRole: string;
  initials: string;
  onSettingsClick: () => void;
  onLogoutClick: () => void;
}

// Reusable component for action items
const ActionItem = ({ 
  icon: Icon, 
  label, 
  onClick 
}: { 
  icon: React.ElementType; 
  label: string; 
  onClick: () => void 
}) => (
  <div className={styles.popoverItem} onClick={(e) => { e.stopPropagation(); onClick(); }}>
    <Icon className={styles.popoverIcon} />
    <span>{label}</span>
  </div>
);

export const UserPopover = ({ 
  userName, 
  userRole, 
  initials, 
  onSettingsClick, 
  onLogoutClick 
}: UserPopoverProps) => (
  <Popover id="popover-user-actions" className={styles.userPopover}>
    <Popover.Header as="h3" className={styles.popoverHeader}>
      <div className="d-flex align-items-center">
        <div className={styles.popoverUserAvatar}>{initials}</div>
        <div className="ms-2">
          <div className={styles.popoverUserName}>{userName}</div>
          <div className={styles.popoverUserRole}>{userRole}</div>
        </div>
      </div>
    </Popover.Header>
    <Popover.Body className={styles.popoverBody}>
      <ActionItem 
        icon={Icons.FaCog} 
        label="Account Settings" 
        onClick={onSettingsClick} 
      />
      <ActionItem 
        icon={Icons.FaSignOutAlt} 
        label="Logout" 
        onClick={onLogoutClick} 
      />
    </Popover.Body>
  </Popover>
);