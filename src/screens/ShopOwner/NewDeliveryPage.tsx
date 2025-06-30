import { Container, Row, Col, Card } from "react-bootstrap";
import NewDeliveryStyle from "./NewDeliveryPage.module.css";
import { useState, useEffect } from "react";
import { LookupLabelService } from "../../service/lookupLabel.service";
import type { Order } from "../../models/order.model";
const NewDeliveryPage = () => {
  const [productType, setProductType] = useState<any[]>([]);
  const [orderDetails, setOrderDetails] = useState <Order>({
    orderID: 0,
    shopID: 0,
    productType: 0,
    productName: "",
    weight: 0,
    address: "",
    customerName: "",
    customerPhone: "",
    specialInstructions: "",
    deliveryDate: ""
  });

  useEffect(() => {
    const fetchProductTypes = async () => {
      const service = LookupLabelService.getInstance();
      const categories = await service.getCategories();
      setProductType(categories);
    };  
    fetchProductTypes();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setOrderDetails((prevDetails) => ({
      ...prevDetails,
      [id]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Here you would typically send the orderDetails to your backend
    console.log("Order Details Submitted:", orderDetails);
  };

  return (
    <div className={NewDeliveryStyle.deliveryContainer}>
      <h1 className={NewDeliveryStyle.gradientTitle}>New Delivery Request</h1>
      <Container className="p-4">
        <Row>
          <Col md={12}>
            <Card className={NewDeliveryStyle.formCard}>
              <div className={NewDeliveryStyle.cardBody}>
                {/* <h6 className={NewDeliveryStyle.formTitle}>
                  Fill in the details to schedule a pickup and delivery
                </h6> */}
                <form className={NewDeliveryStyle.formSection} onSubmit={handleSubmit}>
                <Row className="gy-4">
                    <Col md={6}>
                    <label className={NewDeliveryStyle.inputLabel}>Product Type</label>
                    <select className="form-control" id="productType" value={Number(orderDetails.productType)} onChange={handleInputChange} required>
                        <option value="0" disabled>Select product type</option>
                        {productType.map((type:any)=>(
                            <option key={type.categoryID} value={type.categoryID}>
                                {type.categoryName}
                            </option>
                        ))}
                    </select>
                    </Col>
                    <Col md={6}>
                    <label className={NewDeliveryStyle.inputLabel}>Product Name</label>
                    <input type="text" className="form-control" id="productName" value={orderDetails.productName} onChange={handleInputChange} placeholder="e.g., Grocery Package" required />
                    </Col>

                    <Col md={6}>
                    <label className={NewDeliveryStyle.inputLabel}>Approx. Weight (kg)</label>
                    <input type="text" className="form-control" id="weight" value={orderDetails.weight} onChange={handleInputChange} placeholder="e.g., 2.5" required />
                    </Col>
                    <Col md={6}>
                    <label className={NewDeliveryStyle.inputLabel}>Delivery Address</label>
                    <input type="text" className="form-control" id="address" value={orderDetails.address} onChange={handleInputChange} placeholder="Customer's full address" required />
                    </Col>

                    <Col md={6}>
                    <label className={NewDeliveryStyle.inputLabel}>Customer Name</label>
                    <input type="text" className="form-control" id="customerName" value={orderDetails.customerName} onChange={handleInputChange} placeholder="Customer's full name" required />
                    </Col>
                    <Col md={6}>
                    <label className={NewDeliveryStyle.inputLabel}>Customer Phone</label>
                    <input type="text" className="form-control" id="customerPhone" value={orderDetails.customerPhone} onChange={handleInputChange} placeholder="Customer's phone number" required />
                    </Col>
                    <Col md={6}>
                    <label className={NewDeliveryStyle.inputLabel}>Delivery Date</label>
                    <input type="date" className="form-control" id="deliveryDate" value={orderDetails.deliveryDate} onChange={handleInputChange} required />
                    </Col>
                    <Col md={6}>
                    <label className={NewDeliveryStyle.inputLabel}>Special Instructions</label>
                    <textarea rows={2} className="form-control" id="specialInstructions" value={orderDetails.specialInstructions} onChange={handleInputChange} placeholder="Any special handling instructions" />
                    </Col>
                </Row>

                <div className={NewDeliveryStyle.buttonGroup}>
                    <button type="submit" className={NewDeliveryStyle.submitBtn}>Submit Request</button>
                    <button type="button" className={NewDeliveryStyle.cancelBtn}>Cancel</button>
                </div>
                </form>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default NewDeliveryPage;
