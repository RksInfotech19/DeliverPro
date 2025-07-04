import styles from './HomePage.module.css';
import deliveryImage from '../../assets/images/shopowner-home.png';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { Icons } from '../../shared/icons';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const handleAddShopClick = () => {
    navigate('/add-shop');
  };

  return (
    <div className={styles.homepageContainer}>

      
      {/* Main Content */}
      <Container fluid className={styles.mainContent}>
        <Row className="align-items-center">
          {/* Left side content */}
          <Col lg={6} className={`${styles.contentText} order-lg-1 order-1`}>
            <div className={styles.textWrapper}>
              <div className={styles.contentInner}>
                <h1 className={styles.gradientText}>Welcome to DeliverPro!</h1>
                <div className={styles.featureList}>
                  <div className={styles.featureItem}>
                    <Icons.FaShieldAlt className={styles.featureIcon} />
                    <span>Secure & Reliable Deliveries</span>
                  </div>
                  <div className={styles.featureItem}>
                    <Icons.FaClock className={styles.featureIcon} />
                    <span>Fast Pickup & Delivery</span>
                  </div>
                  <div className={styles.featureItem}>
                    <Icons.FaChartLine className={styles.featureIcon} />
                    <span>Real-time Tracking</span>
                  </div>
                </div>
                
                <p className={`lead ${styles.leadText}`}>
                  You're just one step away from connecting with reliable drivers 
                  who will deliver your products quickly and efficiently. Register your
                  shop now to get started.
                </p>
                
                <div className={styles.ctaContainer}>
                  <Button className={styles.ctaGradientButton} onClick={handleAddShopClick}>
                    <Icons.FaPlus className={` me-2 ${styles.btnIcon}`} />
                    Add Your Shop
                  </Button>
                </div>
              </div>
            </div>
          </Col>

          {/* Right side image */}
          <Col lg={6} className={`${styles.contentImage} order-lg-2 order-2`}>
            <div className={styles.imageWrapper}>
              <div className={styles.imageContainer}>
                <img 
                  src={deliveryImage} 
                  alt="Happy shop owner using DeliverPro" 
                  className={`img-fluid ${styles.mainImage}`} 
                />
              </div>
              <div className={styles.imageDecoration}></div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;