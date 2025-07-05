import { Icons } from "../icons";
import styles from "./AddShop.module.css";
import StoreImg from "../../assets/images/store-img.png";
import { LookupLabelService } from "../../service/lookupLabel.service";
import { ShopService } from "../../service/Shop.service";
import type { Shop } from "../../models/shop.model";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddShop = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [states, setStates] = useState<any[]>([]);
  const [showPan, setShowPan] = useState(false);
  const [showGst, setShowGst] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const navigate = useNavigate();

  const [shopData, setShopData] = useState<Shop>({
    shopId: 0,
    shopName: "",
    category: 0,
    shopAddress: "",
    city: "",
    state: 0,
    mobileNumber: "",
    pan: "",
    gstNumber: "",
    ownerName: "",
    ownerPhone: "",
  });

  useEffect(() => {
    const loadData = async () => {
      const service = LookupLabelService.getInstance();
      try {
        setCategories(service.getCategories());
        setStates(service.getStates());
      } catch (error) {
        console.error("Failed to load lookups:", error);
      }
    };

    loadData();
  }, []);

  //image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setShopData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const shopService = ShopService.getInstance();
      await shopService.addShop(shopData);
      navigate("/dashboard"); // Redirect to dashboard after saving
    } catch (error) {
      console.error("Error saving shop:", error);
    }
  };

  return (
    <>
      <div className={styles.pageWrapper}>
        <div className={`container ${styles.formCard}`}>
          <div className="text-center mb-3">
            <h4 className={`   ${styles.formTitle}`}>Shop Detail Form</h4>
          </div>
          {/* Upload + Store Image Section */}
          <div className={styles.uploadSection}>
            <div className={styles.uploadCircle}>
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Preview"
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <Icons.FaCamera />
              )}
            </div>
            <input
              type="file"
              id="shopPhoto"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />
            <label htmlFor="shopPhoto" className={`btn ${styles.uploadButton}`}>
              <Icons.FaCloudUploadAlt /> Upload Shop Photo
            </label>
            <img
              src={StoreImg}
              alt="Store"
              className={`${styles.storeImage} ${styles.loaded}`}
            />
          </div>
          <form onSubmit={handleSubmit}>
            <h5 className={styles.sectionHeading}>
              <Icons.FaStore className={styles.iconColor} /> Shop Information
            </h5>

            <div className="row g-3">
              <div className="col-md-6">
                <label
                  htmlFor="shopName"
                  className={`form-label ${styles.formLabel}`}
                >
                  Shop Name <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  className={`form-control ${styles.formControl}`}
                  id="shopName"
                  value={shopData.shopName}
                  onChange={handleChange}
                  placeholder="Enter Shop Name"
                />
              </div>
              <div className="col-md-6">
                <label
                  htmlFor="category"
                  className={`form-label ${styles.formLabel}`}
                >
                  Category <span className={styles.required}>*</span>
                </label>
                <select
                  className={`form-select ${styles.formSelect}`}
                  id="category"
                  value={Number(shopData.category)}
                  onChange={handleChange}
                >
                  <option value={0} disabled>
                    Select Category
                  </option>
                  {categories.map((category: any) => (
                    <option
                      key={category.categoryID}
                      value={category.categoryID}
                    >
                      {category.categoryName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-12">
                <label
                  htmlFor="shopAddress"
                  className={`form-label ${styles.formLabel}`}
                >
                  Shop Address <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  className={`form-control ${styles.formControl}`}
                  id="shopAddress"
                  value={shopData.shopAddress}
                  onChange={handleChange}
                  placeholder="Enter Shop Address"
                />
              </div>
              <div className="col-md-6">
                <label
                  htmlFor="city"
                  className={`form-label ${styles.formLabel}`}
                >
                  City <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  className={`form-control ${styles.formControl}`}
                  id="city"
                  value={shopData.city}
                  onChange={handleChange}
                  placeholder="Enter City"
                />
              </div>
              <div className="col-md-6">
                <label
                  htmlFor="state"
                  className={`form-label ${styles.formLabel}`}
                >
                  State <span className={styles.required}>*</span>
                </label>
                <select
                  className={`form-select ${styles.formSelect}`}
                  id="state"
                  value={Number(shopData.state)}
                  onChange={handleChange}
                >
                  <option value={0} disabled>
                    Select State
                  </option>
                  {states.map((state: any) => (
                    <option key={state.stateID} value={state.stateID}>
                      {state.stateName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-6">
                <label
                  htmlFor="mobileNumber"
                  className={`form-label ${styles.formLabel}`}
                >
                  Mobile Number <span className={styles.required}>*</span>
                </label>
                <input
                  type="tel"
                  className={`form-control ${styles.formControl}`}
                  id="mobileNumber"
                  value={shopData.mobileNumber}
                  onChange={handleChange}
                  placeholder="Enter Mobile Number"
                />
              </div>
              <div className="col-md-6">
                <label className={`form-label ${styles.formLabel}`}>
                  PAN or GST Number <span className={styles.required}>*</span>
                </label>

                <div className="form-check">
                  <input
                    className={`form-check-input ${styles.formCheckInput}`}
                    type="checkbox"
                    id="checkPan"
                    checked={showPan}
                    onChange={() => setShowPan(!showPan)}
                  />
                  <label
                    className={`form-check-label ${styles.formCheckLabel}`}
                    htmlFor="checkPan"
                  >
                    PAN
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className={`form-check-input ${styles.formCheckInput}`}
                    type="checkbox"
                    id="checkGst"
                    checked={showGst}
                    onChange={() => setShowGst(!showGst)}
                  />
                  <label
                    className={`form-check-label ${styles.formCheckLabel}`}
                    htmlFor="checkGst"
                  >
                    GST
                  </label>
                </div>

                {showPan && (
                  <input
                    type="text"
                    className={`form-control mt-2  ${styles.formControl}`}
                    id="pan"
                    value={shopData.pan}
                    onChange={handleChange}
                    placeholder="Enter PAN Number"
                  />
                )}

                {showGst && (
                  <input
                    type="text"
                    className={`form-control mt-2  ${styles.formControl}`}
                    id="gstNumber"
                    value={shopData.gstNumber}
                    onChange={handleChange}
                    placeholder="Enter GST Number"
                  />
                )}
              </div>
            </div>

            <h5 className={`mt-1 ${styles.sectionHeading}`}>
              <Icons.LucideUser className={styles.iconColor} /> Owner Information
            </h5>

            <div className="row g-3">
              <div className="col-md-6">
                <label
                  htmlFor="ownerName"
                  className={`form-label ${styles.formLabel}`}
                >
                  Owner Name <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  className={`form-control ${styles.formControl}`}
                  id="ownerName"
                  value={shopData.ownerName}
                  onChange={handleChange}
                  placeholder="Enter Owner Name"
                />
              </div>
              <div className="col-md-6">
                <label
                  htmlFor="ownerPhone"
                  className={`form-label ${styles.formLabel}`}
                >
                  Phone <span className={styles.required}>*</span>
                </label>
                <input
                  type="tel"
                  className={`form-control ${styles.formControl}`}
                  id="ownerPhone"
                  value={shopData.ownerPhone}
                  onChange={handleChange}
                  placeholder="Enter Phone"
                />
              </div>
            </div>

            <div className={`mt-4 ${styles.buttonGroup}`}>
             
              <button
                type="submit"
                className={`btn btn-success ${styles.saveButton}`}
              >
                Save Shop
              </button>
               <button
                type="button"
                onClick={() => navigate("/")}
                className={`btn btn-outline-secondary ${styles.cancelButton}`}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddShop;
