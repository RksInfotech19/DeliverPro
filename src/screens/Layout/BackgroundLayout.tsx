import { useLocation } from 'react-router-dom';
import styles from './Background.module.css';

interface BackgroundLayoutProps {
  children: React.ReactNode;
}

const BackgroundLayout: React.FC<BackgroundLayoutProps> = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className={isHomePage ? styles.homeLayout : styles.mainLayout}>
      {/* Always show background shapes */}
      <div className={styles.topLeftShape}></div>
      <div className={styles.bottomRightShape}></div>

      {children}
    </div>
  );
};

export default BackgroundLayout;
