import { Container, Row, Col, Card } from "react-bootstrap";
import RequestStyle from "./DeliveryRequest.module.css";
import { useState, useEffect } from "react";
import { LookupLabelService } from "../../service/lookupLabel.service";
import type { Order } from "../../models/order.model";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { OrderService } from "../../service/Order.service";
import SharedButton from "../../shared/SharedButton";
import { Icons } from "../../shared/icons";

const DeliveryRequest = () => {
  const [productType, setProductType] = useState<any[]>([]);
  const [orderDetails, setOrderDetails] = useState<Order>({
    orderId: 0,
    shopID: 0,
    productType: 0,
    productName: "",
    weight: 0,
    address: "",
    customerName: "",
    customerPhone: "",
    specialInstructions: "",
    deliveryDate: "",
    status: 0,
    createdBy: null,    
    updatedBy: null,
    createdDate: '',
    updatedDate: null
  });

  const navigate = useNavigate();
  const { id } = useParams();

  const handleCancel = () => {
    navigate("/dashboard");
  }

  useEffect(() => {
    const fetchProductTypes = async () => {
      const service = LookupLabelService.getInstance();
      const categories = await service.getCategories();
      setProductType(categories);
      if (id) {
        setOrderDetails((prev) => ({
          ...prev,
          shopID: Number(id)
        }));
      }
    };  
    fetchProductTypes();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | 
    HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setOrderDetails((prevDetails) => ({
      ...prevDetails,
      [id]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const service = OrderService.getInstance();
      service.addOrder(orderDetails);
      alert("Order request submitted successfully!");
    } catch (error) {
      console.error("Error submitting order:", error);
    }
    console.log("Order Details Submitted:", orderDetails);
  };
  
  return (
    <div className={RequestStyle.deliveryContainer}>
      
      <Container className={RequestStyle.container}>
        <Row className="justify-content-center">
          <Col xl={8} lg={10} md={12}>
            <Card className={RequestStyle.formCard}>
              <Card.Body className={RequestStyle.cardBody}>
                <div className="text-center mb-2">
                  <h1 className={RequestStyle.gradientTitle}> 
                    <Icons.FaPaperPlane className={`me-1 ${RequestStyle.paperPlane}`}/> Delivery Request
                  </h1>
                </div>
                <form onSubmit={handleSubmit}>
                  <Row className="gy-3">
                    <Col md={6}>
                      <label className={RequestStyle.inputLabel}>Product Type</label>
                      <select className={`form-select ${RequestStyle.formSelect}`} id="productType" value={orderDetails.productType ?? 0}
                        onChange={handleInputChange} required>
                        <option value="0" disabled>Select product type</option>
                        {productType.map((type:any) => (
                          <option key={type.categoryID} value={type.categoryID}>
                            {type.categoryName}
                          </option>
                        ))}
                      </select>
                    </Col>
                    <Col md={6}>
                      <label className={RequestStyle.inputLabel}>Product Name</label>
                      <input type="text" className={ ` form-control ${RequestStyle.formControl}`} id="productName" 
                        value={orderDetails.productName} onChange={handleInputChange} 
                        placeholder="e.g., Grocery Package" required />
                    </Col>

                    <Col md={6}>
                      <label className={RequestStyle.inputLabel}>Approx. Weight (kg)</label>
                      <input type="text" className={ ` form-control ${RequestStyle.formControl}`} id="weight" 
                        value={orderDetails.weight} onChange={handleInputChange} 
                        placeholder="e.g., 2.5" required />
                    </Col>
                    <Col md={6}>
                      <label className={RequestStyle.inputLabel}>Delivery Address</label>
                      <input type="text" className={ ` form-control ${RequestStyle.formControl}`} id="address" 
                        value={orderDetails.address} onChange={handleInputChange} 
                        placeholder="Customer's full address" required />
                    </Col>

                    <Col md={6}>
                      <label className={RequestStyle.inputLabel}>Customer Name</label>
                      <input type="text" className={ ` form-control ${RequestStyle.formControl}`} id="customerName" 
                        value={orderDetails.customerName} onChange={handleInputChange} 
                        placeholder="Customer's full name" required />
                    </Col>
                    <Col md={6}>
                      <label className={RequestStyle.inputLabel}>Customer Phone</label>
                      <input type="text" className={ ` form-control ${RequestStyle.formControl}`} id="customerPhone" 
                        value={orderDetails.customerPhone} onChange={handleInputChange} 
                        placeholder="Customer's phone number" required />
                    </Col>
                    <Col md={6}>
                      <label className={RequestStyle.inputLabel}>Delivery Date</label>
                      <input type="date" className={ ` form-control ${RequestStyle.formControl}`} id="deliveryDate" 
                        value={orderDetails.deliveryDate} onChange={handleInputChange} required />
                    </Col>
                    <Col md={6}>
                      <label className={RequestStyle.inputLabel}>Special Instructions</label>
                      <textarea rows={2} className={ ` form-control ${RequestStyle.formControl}`} id="specialInstructions" 
                        value={orderDetails.specialInstructions} onChange={handleInputChange} 
                        placeholder="Any special handling instructions" />
                    </Col>
                  </Row>

                  <div className={RequestStyle.buttonGroup}>
                    <SharedButton label="Submit" variant="primary" type="submit" />
                    <SharedButton label="Cancel" variant="cancel" onClick={handleCancel} />
                  </div>
                </form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default DeliveryRequest;