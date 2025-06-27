import { useState, useEffect } from 'react';
import './LandingScreen.css';
import logo from '../../assets/images/logo.png';
import HomeBanner from '../../assets/images/home-banner.png';
import { Icons } from '../../shared/icons';
import { motion } from "framer-motion";
import DriverDispatch from '../../assets/images/driver-dispatch.png';
import ShopDetail from '../../assets/images/shop-detail.png';
import RealDelivery from '../../assets/images/delivery.png';
import AboutUs from '../../assets/images/about-us.png';


const DeliverPro = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scrolling
  const handleLinkClick = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="deliver-pro-app">
      {/* Navigation */}
      <nav className={`navbar navbar-expand-lg fixed-top ${scrolled ? 'navbar-scrolled' : ''}`}>
        <div className="container-fluid">
     
          <a className="navbar-brand" href="#">
            <img src={logo} alt="Logo" className="logo_img" /><span className="gradient-texts ms-2">DELIVER PRO</span>
          </a>
          <button 
            className="navbar-toggler" 
            type="button" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <Icons.FaTimes /> : <Icons.FaBars />}
          </button>
          <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`}>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
             <li className="nav-item">
            <a className="nav-link" href="#home" onClick={(e) => handleLinkClick(e, 'home')}>
                <Icons.FaHome className="me-2" /> Home
            </a>
            </li>
            <li className="nav-item">
            <a className="nav-link" href="#about" onClick={(e) => handleLinkClick(e, 'about')}>
                <Icons.FaInfoCircle className="me-2" /> About
            </a>
            </li>
            <li className="nav-item">
            <a className="nav-link" href="#contact" onClick={(e) => handleLinkClick(e, 'contact')}>
                <Icons.FaAddressBook className="me-2" /> Contact
            </a>
            </li>
            <li className="nav-item">
            <a className="nav-link" href="#services" onClick={(e) => handleLinkClick(e, 'services')}>
                <Icons.FaCog className="me-2" /> Our Services
            </a>
            </li>
            <li className="nav-item">
            <a className="nav-link" href="#signup" onClick={(e) => handleLinkClick(e, 'signup')}>
                <Icons.FaUserPlus className="me-2" /> Signup
            </a>
            </li>

             
            </ul>
          </div>
        </div>
      </nav>


    {/* Hero Section */}
    <section id="home" className="hero-section py-5">
    <div className="container">
        <div className="row align-items-center">
        {/* Left: Text Content */}
        <div className="col-md-6 text-center text-md-start">
            <h1 className="display-5 fw-bold mb-4">
            Fast & Reliable Delivery Service for Your Shop
            </h1>
            <p className="lead mb-4">
            Connect with professional drivers to deliver your products quickly and efficiently.
            Focus on your business while we handle the logistics.
            </p>
            <div className="d-flex justify-content-center justify-content-md-start gap-3">
            <a href="enter_address.html" className="btn btn-primary btn-lg">
                Get Start
            </a>
            <a
                href="#about"
                className="btn btn-outline-primary btn-lg"
                onClick={(e) => handleLinkClick(e, "about")}
            >
                Learn More
            </a>
            </div>
        </div>

        {/* Right: Animated Image */}
        <div className="col-md-6 text-center mt-4 mt-md-0">
            <motion.img
            src={HomeBanner}
            alt="Delivery Truck"
            className="img-fluid"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            />
        </div>
        </div>
    </div>
    </section>


    {/* Features Section */}
    <section id="features" className="py-5 bg-light">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10 col-xl-8">
            <div className="text-center mb-5">
              <h2 className="fw-bold">How It Works</h2>
              <p className="text-muted">Seamless deliveries in 3 dynamic steps</p>
            </div>
            <div className="row text-center g-5 features-border">
              {/* Step 1 */}
              <div className="col-md-4">
                <div className="mb-3">
                  <div className="rounded-circle bg-primary text-white d-inline-block fw-bold" style={{ width: "40px", height: "40px", lineHeight: "40px" }}>
                    1
                  </div>
                </div>
                <img src={ShopDetail} alt="Enter Shop Details" className="img-home mb-3" />
                <h3 className="h5">Enter Shop Details</h3>
                <p className="text-muted">Provide your location and contact information to initiate the delivery process.</p>
              </div>

              {/* Step 2 */}
              <div className="col-md-4">
                <div className="mb-3">
                  <div className="rounded-circle bg-secondary text-white d-inline-block fw-bold" style={{ width: "40px", height: "40px", lineHeight: "40px" }}>
                    2
                  </div>
                </div>
                <img src={DriverDispatch} alt="Driver Dispatch" className="img-home  mb-3" />
                <h3 className="h5">Driver Dispatch</h3>
                <p className="text-muted">We auto-assign the nearest delivery agent in real-time for fastest pickup.</p>
              </div>

              {/* Step 3 */}
              <div className="col-md-4">
                <div className="mb-3">
                  <div className="rounded-circle bg-primary text-white d-inline-block fw-bold" style={{ width: "40px", height: "40px", lineHeight: "40px" }}>
                    3
                  </div>
                </div>
                <img src={RealDelivery} alt="Real-Time Delivery" className="img-home  mb-3" />
                <h3 className="h5">Real-Time Delivery</h3>
                <p className="text-muted">Track your package live with interactive map and real-time notifications.</p>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </section>


      {/* About Section */}
      <section id="about" className="py-5">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10 col-xl-8">
              <div className="text-center mb-5">
                <h2 className="fw-bold">About Deliver Pro</h2>
                <p className="text-muted">Our mission is to revolutionize last-mile delivery for small businesses</p>
              </div>
              <div className="row align-items-center">
                <div className="col-lg-6 mb-4 mb-lg-0">
                  <h3 className="fw-bold mb-3">Our Story</h3>
                  <p>
                    Founded in 2023, Deliver Pro started with a simple idea: to make delivery services accessible 
                    and affordable for every shop owner. We noticed that small businesses were struggling with 
                    expensive and unreliable delivery options.
                  </p>
                  <p>
                    Today, we operate in over 50 cities with a network of 5,000+ trusted drivers, helping thousands 
                    of shops deliver their products every day.
                  </p>
                  <div className="row mt-4">
                    <div className="col-4">
                      <div className="stat-card text-center">
                        <div className="stat-number">50+</div>
                        <div className="stat-label">Cities Served</div>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="stat-card text-center">
                        <div className="stat-number">5K+</div>
                        <div className="stat-label">Drivers</div>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="stat-card text-center">
                        <div className="stat-number">98%</div>
                        <div className="stat-label">On-Time</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <img 
                    src={AboutUs}
                    alt="Our Team" 
                    className="img-fluid rounded"
                  />
                </div>
              </div>
            </div>
          </div>
               <div className="row justify-content-center">
            <div className="col-12 col-lg-10 col-xl-8">
     
              <div className="row g-4">
                <div className="col-md-4">
                  <div className="card feature-card h-100">
                    <div className="card-body text-center p-4">
                      <div className="feature-icon mb-3">
                        <Icons.FaBolt />
                      </div>
                      <h3 className="h4">Fast Delivery</h3>
                      <p className="text-muted">
                        Average pickup time under 15 minutes in urban areas with our optimized driver network
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card feature-card h-100">
                    <div className="card-body text-center p-4">
                      <div className="feature-icon mb-3">
                        <Icons.FaMapMarkedAlt />
                      </div>
                      <h3 className="h4">Real-Time Tracking</h3>
                      <p className="text-muted">
                        Monitor your delivery from pickup to destination with live GPS updates
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card feature-card h-100">
                    <div className="card-body text-center p-4">
                      <div className="feature-icon mb-3">
                        <Icons.FaShieldAlt />
                      </div>
                      <h3 className="h4">Secure Handling</h3>
                      <p className="text-muted">
                        All drivers are verified and trained professionals with quality assurance
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-5 contact-section">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10 col-xl-8">
              <div className="text-center mb-5">
                <h2 className="fw-bold">Get In Touch</h2>
                <p className="text-muted">We'd love to hear from you</p>
              </div>
              <div className="row g-4">
                <div className="col-lg-5">
                  <div className="contact-info">
                    <div className="d-flex mb-4">
                      <div className="contact-icon me-3">
                        <Icons.FaMapMarkerAlt />
                      </div>
                      <div>
                        <h3 className="h5">Our Office</h3>
                        <p className="text-muted mb-0">123 Delivery Street, Suite 100<br />San Francisco, CA 94107</p>
                      </div>
                    </div>
                    <div className="d-flex mb-4">
                      <div className="contact-icon me-3">
                        <Icons.FaPhoneAlt />
                      </div>
                      <div>
                        <h3 className="h5">Phone</h3>
                        <p className="text-muted mb-0"><a href="tel:+18005551234" className="text-decoration-none">+1 (800) 555-1234</a></p>
                      </div>
                    </div>
                    <div className="d-flex mb-4">
                      <div className="contact-icon me-3">
                        <Icons.FaEnvelope />
                      </div>
                      <div>
                        <h3 className="h5">Email</h3>
                        <p className="text-muted mb-0"><a href="mailto:hello@deliverpro.com" className="text-decoration-none">hello@deliverpro.com</a></p>
                      </div>
                    </div>
                    <div className="d-flex">
                      <div className="contact-icon me-3">
                        <Icons.FaClock />
                      </div>
                      <div>
                        <h3 className="h5">Hours</h3>
                        <p className="text-muted mb-0">Monday - Friday: 8am - 6pm<br />Saturday: 9am - 3pm</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-7">
                  <form className="contact-form">
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label htmlFor="name" className="form-label">Your Name</label>
                        <input type="text" className="form-control" id="name" required />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="email" className="form-label">Email Address</label>
                        <input type="email" className="form-control" id="email" required />
                      </div>
                      <div className="col-12">
                        <label htmlFor="subject" className="form-label">Subject</label>
                        <input type="text" className="form-control" id="subject" required />
                      </div>
                      <div className="col-12">
                        <label htmlFor="message" className="form-label">Message</label>
                        <textarea className="form-control" id="message" rows={5} required></textarea>
                      </div>
                      <div className="col-12">
                        <button type="submit" className="btn btn-primary">Send Message</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="mt-5">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.158572329503!2d-122.4194155846823!3d37.77492997975938!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
                  className="w-100 border-0"
                  height="450"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
     {/* Features Section */}
      <section id="features" className="py-5 bg-light">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10 col-xl-8">
              <div className="text-center mb-5">
                <h2 className="fw-bold">How Its Works</h2>
                <p className="text-muted">Seamless deliveries in 3 dynamic steps</p>
              </div>
              <div className="row g-4">
                <div className="col-md-4">
                  <div className="card feature-card h-100">
                    <div className="card-body text-center p-4">
                      <div className="feature-icon mb-3">
                        <Icons.FaBolt />
                      </div>
                      <h3 className="h4">Fast Delivery</h3>
                      <p className="text-muted">
                        Average pickup time under 15 minutes in urban areas with our optimized driver network
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card feature-card h-100">
                    <div className="card-body text-center p-4">
                      <div className="feature-icon mb-3">
                        <Icons.FaMapMarkedAlt />
                      </div>
                      <h3 className="h4">Real-Time Tracking</h3>
                      <p className="text-muted">
                        Monitor your delivery from pickup to destination with live GPS updates
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card feature-card h-100">
                    <div className="card-body text-center p-4">
                      <div className="feature-icon mb-3">
                        <Icons.FaShieldAlt />
                      </div>
                      <h3 className="h4">Secure Handling</h3>
                      <p className="text-muted">
                        All drivers are verified and trained professionals with quality assurance
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-dark text-white pt-5 pb-3">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10 col-xl-8">
              <div className="row g-4">
                <div className="col-lg-4">
                  <h3 className="h5 mb-3 gradient-heading">DELIVER PRO</h3>
                  <p className="text-white">
                    Deliver Pro connects shop owners with reliable drivers for fast, affordable delivery services across the country.
                  </p>
                  <div className="social-links mt-4">
                    <a href="#" className="text-white me-3"><Icons.FaFacebookF /></a>
                    <a href="#" className="text-white me-3"><Icons.FaTwitter /></a>
                    <a href="#" className="text-white me-3"><Icons.FaInstagram /></a>
                    <a href="#" className="text-white"><Icons.FaLinkedin /></a>
                  </div>
                </div>
                <div className="col-lg-2 col-md-6">
                  <h3 className="h5 mb-3">Quick Links</h3>
                  <ul className="list-unstyled">
                    <li className="mb-2"><a href="#home" className="text-decoration-none text-white" onClick={(e) => handleLinkClick(e, 'home')}>Home</a></li>
                    <li className="mb-2"><a href="#about" className="text-decoration-none text-white" onClick={(e) => handleLinkClick(e, 'about')}>About Us</a></li>
                    <li className="mb-2"><a href="#contact" className="text-decoration-none text-white" onClick={(e) => handleLinkClick(e, 'contact')}>Contact</a></li>
                    <li className="mb-2"><a href="enter_address.html" className="text-decoration-none text-white">Get Started</a></li>
                    <li><a href="#" className="text-decoration-none text-muted">Privacy Policy</a></li>
                  </ul>
                </div>
                <div className="col-lg-3 col-md-6">
                  <h3 className="h5 mb-3">Contact Us</h3>
                  <ul className="list-unstyled text-white">
                    <li className="mb-2"><Icons.FaMapMarkerAlt className="me-2" /> 123 Delivery Street, San Francisco, CA</li>
                    <li className="mb-2"><Icons.FaPhoneAlt className="me-2" /> +1 (800) 555-1234</li>
                    <li><Icons.FaEnvelope className="me-2" /> hello@deliverpro.com</li>
                  </ul>
                </div>
                <div className="col-lg-3">
                  <h3 className="h5 mb-3">Newsletter</h3>
                  <p className="text-white">Subscribe to our newsletter for the latest updates.</p>
                  <form>
                    <div className="input-group mb-3">
                      <input type="email" className="form-control" placeholder="Your Email" />
                      <button className="btn btn-primary" type="button">Subscribe</button>
                    </div>
                  </form>
                </div>
              </div>
              <hr className="my-4" />
              <div className="text-center text-light">
                <p className="mb-0">&copy; 2023 Deliver Pro. All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DeliverPro;