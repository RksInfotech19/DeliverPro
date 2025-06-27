import { Icons } from '../icons';
import styles from './AddShop.module.css';
import StoreImg from '../../assets/images/store-img.png';

const AddShop = () => {
  return (
    <div className={`d-flex justify-content-center align-items-center ${styles.mainContainer}`}>
      <div className={`container ${styles.formContainer}`}>
        <h3 className={`text-center mb-4 ${styles.formTitle}`}>Shop Detail Form</h3>
        
        <div className="row">
          {/* Form Column - takes full width on mobile, 7/12 on lg+ */}
          <div className="col-lg-7">
            <form>
              {/* Shop Information Section */}
              <h5 className={styles.sectionHeading}><Icons.FaStore /> Shop Information</h5>
              
              {/* Shop Details - matches the exact layout from your image */}
              <div className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="shopName" className="form-label">
                    Shop Name <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="shopName"
                    placeholder="Enter Shop Name"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="category" className="form-label">
                    Category <span className={styles.required}>*</span>
                  </label>
                  <select className="form-select" id="category">
                    <option value="">Select Category</option>
                    <option value="retail">Retail</option>
                    <option value="restaurant">Restaurant</option>
                    <option value="service">Service</option>
                  </select>
                </div>
                <div className="col-12">
                  <label htmlFor="shopAddress" className="form-label">
                    Shop Address <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="shopAddress"
                    placeholder="Enter Shop Address"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="city" className="form-label">
                    City <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="city"
                    placeholder="Enter City"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="state" className="form-label">
                    State <span className={styles.required}>*</span>
                  </label>
                  <select className="form-select" id="state">
                    <option value="">Select State</option>
                    <option value="california">California</option>
                    <option value="new-york">New York</option>
                    <option value="texas">Texas</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label htmlFor="mobileNumber" className="form-label">
                    Mobile Number <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="mobileNumber"
                    placeholder="Enter Mobile Number"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="panGst" className="form-label">
                    PAN or GST Number <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="panGst"
                    placeholder="Enter PAN or GST Number"
                  />
                </div>
              </div>

              {/* Owner Information Section */}
              <h5 className={`mt-4 ${styles.sectionHeading}`}><Icons.FaUser /> Owner Information</h5>
              
              <div className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="ownerName" className="form-label">
                    Owner Name <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="ownerName"
                    placeholder="Enter Owner Name"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="phone" className="form-label">
                    Phone <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    placeholder="Enter Phone"
                  />
                </div>
              </div>

              {/* Form Buttons */}
              <div className={styles.buttonGroup}>
                <button type="button" className={`btn btn-outline-secondary ${styles.cancelButton}`}>
                  Cancel
                </button>
                <button type="submit" className={`btn btn-primary ${styles.saveButton}`}>
                  Save Shop
                </button>
              </div>
            </form>
          </div>

          {/* Image Column - only shows on lg screens and above */}
          <div className="col-lg-5 d-none d-lg-flex align-items-center justify-content-center">
            <img src={StoreImg} alt="store" className={styles.storeImage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddShop;