import { Icons } from '../icons';
import styles from './AddShop.module.css';
import StoreImg from '../../assets/images/store-img.png';
import { LookupLabelService } from '../../service/lookupLabel.service';
import { ShopService } from '../../service/Shop.service';
import type { Shop } from '../../models/shop.model';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddShop = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [states, setStates] = useState<any[]>([]);
  const [showPan, setShowPan] = useState(false);
  const [showGst, setShowGst] = useState(false);
  const navigate = useNavigate();

  const [shopData, setShopData] = useState<Shop>({
    shopId: 0,
    shopName: '',
    category: 0,
    shopAddress: '',
    city: '',
    state: 0,
    mobileNumber: '',
    pan: '',
    gstNumber: '',
    ownerName: '',
    ownerPhone: '',
  });

  useEffect(() => {
    const loadData = async () => {
      const service = LookupLabelService.getInstance();
      try {
        await service.getLookupLabel();
        setCategories(service.getCategories());
        setStates(service.getStates());
      } catch (error) {
        console.error('Failed to load lookups:', error);
      }
    };

    loadData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setShopData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const shopService = ShopService.getInstance();
      await shopService.addShop(shopData);
      navigate('/dashboard'); // Redirect to dashboard after saving
    } catch (error) {
      console.error('Error saving shop:', error);
    }
  };

return (
  <>

  <div className={styles.pageWrapper}>
    <div className={`container ${styles.formCard}`}>
  
  <div className="text-center mb-3">
  <h4 className={`   ${styles.formTitle}` }>Shop Detail Form</h4>
  </div>
      {/* Upload + Store Image Section */}
      <div className={styles.uploadSection}>
        <div className={styles.uploadCircle}>
          <Icons.FaCamera />
        </div>
        <button className={`btn ${styles.uploadButton}`}>
          <Icons.FaCloudUploadAlt /> Upload Shop Photo
        </button>
        <img src={StoreImg} alt="Store" className={styles.storeImage} />
      </div>
            <form onSubmit={handleSubmit}>
              <h5 className={styles.sectionHeading}><Icons.FaStore className={styles.iconColor} /> Shop Information</h5>

              <div className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="shopName" className="form-label">
                    Shop Name <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="shopName"
                    value={shopData.shopName}
                    onChange={handleChange}
                    placeholder="Enter Shop Name"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="category" className="form-label">
                    Category <span className={styles.required}>*</span>
                  </label>
                  <select
                    className="form-select"
                    id="category"
                    value={Number(shopData.category)}
                    onChange={handleChange}
                  >
                    <option value={0} disabled>Select Category</option>
                    {categories.map((category: any) => (
                      <option key={category.categoryID} value={category.categoryID}>
                        {category.categoryName}
                      </option>
                    ))}
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
                    value={shopData.shopAddress}
                    onChange={handleChange}
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
                    value={shopData.city}
                    onChange={handleChange}
                    placeholder="Enter City"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="state" className="form-label">
                    State <span className={styles.required}>*</span>
                  </label>
                  <select
                    className="form-select"
                    id="state"
                    value={Number(shopData.state)}
                    onChange={handleChange}
                  >
                    <option value={0} disabled>Select State</option>
                    {states.map((state: any) => (
                      <option key={state.stateID} value={state.stateID}>
                        {state.stateName}
                      </option>
                    ))}
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
                    value={shopData.mobileNumber}
                    onChange={handleChange}
                    placeholder="Enter Mobile Number"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">
                    PAN or GST Number <span className={styles.required}>*</span>
                  </label>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="checkPan"
                      checked={showPan}
                      onChange={() => setShowPan(!showPan)}
                    />
                    <label className="form-check-label" htmlFor="checkPan">
                      PAN
                    </label>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="checkGst"
                      checked={showGst}
                      onChange={() => setShowGst(!showGst)}
                    />
                    <label className="form-check-label" htmlFor="checkGst">
                      GST
                    </label>
                  </div>

                  {showPan && (
                    <input
                      type="text"
                      className="form-control mt-2"
                      id="pan"
                      value={shopData.pan}
                      onChange={handleChange}
                      placeholder="Enter PAN Number"
                    />
                  )}

                  {showGst && (
                    <input
                      type="text"
                      className="form-control mt-2"
                      id="gstNumber"
                      value={shopData.gstNumber}
                      onChange={handleChange}
                      placeholder="Enter GST Number"
                    />
                  )}
                </div>
              </div>

              <h5 className={`mt-4 ${styles.sectionHeading}`}><Icons.FaUser className={styles.iconColor}  /> Owner Information</h5>

              <div className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="ownerName" className="form-label">
                    Owner Name <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="ownerName"
                    value={shopData.ownerName}
                    onChange={handleChange}
                    placeholder="Enter Owner Name"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="ownerPhone" className="form-label">
                    Phone <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="ownerPhone"
                    value={shopData.ownerPhone}
                    onChange={handleChange}
                    placeholder="Enter Phone"
                  />
                </div>
              </div>

              <div className={styles.buttonGroup}>
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className={`btn btn-outline-secondary ${styles.cancelButton}`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`btn btn-primary ${styles.saveButton}`}
                >
                  Save Shop
                </button>
              </div>
            </form>
          </div>

       
        </div>
   </>
  );
};

export default AddShop;
