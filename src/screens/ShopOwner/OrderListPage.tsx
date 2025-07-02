import React, { useEffect, useState } from 'react';
import {
  Package,
  MapPin,
  Clock,
  Eye,
  X,
  Truck,
  CreditCard,
  CheckCircle,
  Search,
  Filter,
} from 'lucide-react';
import styles from './OrderListPage.module.css';
import { OrderService } from '../../service/Order.service';
import type { Order } from '../../models/order.model';
import { Card, CardBody, Col, Row, Container, Badge, Button, Form, InputGroup } from 'react-bootstrap';

type OrderCardProps = {
  order: Order;
  index: number;
};

type OrdersResponse = {
  inProgress: Order[];
  completed: Order[];
};

type OrderDetailsModalProps = {
  order: Order;
  onClose: () => void;
};

type OrderStatusText = 'In Transit' | 'Order Placed' | 'Cancelled'| 'Driver Assigned'| 'Delivered';

const OrdersList: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'In Transit' | 'Pending Pickup' | 'Delivered'>('All');
  const [activeTab, setActiveTab] = useState<'inProgress' | 'completed'>('inProgress');
  const [orders, setOrders] = useState<OrdersResponse>({ inProgress: [], completed: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const orderService = OrderService.getInstance();
        const data = await orderService.getOrders();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusText = (status: number): OrderStatusText => {
    switch (status) {
      case 0:
        return 'Order Placed';
      case 1:
        return 'Driver Assigned';
      case 2:
        return 'In Transit';
      case 3:
        return 'Cancelled';
      case 4:  
        return 'Delivered';
      default:
        return 'Order Placed';
    }
  };

  const filteredOrders = {
    inProgress: orders.inProgress.filter(
      (order) =>
        order.productName.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (statusFilter === 'All' || getStatusText(order.status) === statusFilter)
    ),
    completed: orders.completed.filter(
      (order) =>
        order.productName.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (statusFilter === 'All' || getStatusText(order.status) === statusFilter)
    ),
  };

  const getStatusVariant = (status: string): string => {
    switch (status) {
      case 'In Transit':
        return 'primary';
      case 'Order Placed':
        return 'warning';
      case 'Delivered':
        return 'success';
      default:
        return 'secondary';
    }
  };

  const ordersIcons: Record<OrderStatusText, React.ElementType> = {
    'In Transit': Truck,
    'Order Placed': Package,
    'Delivered': CheckCircle,
    'Driver Assigned': Truck,
    'Cancelled': X,
  };

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({ order, onClose }) => {
  const statusText = getStatusText(order.status);
  const IconComponent = ordersIcons[statusText] || Package;
  
  // Mock timeline data - replace with your actual timeline data
  const timelineSteps = [
    {
      id: 1,
      status: 'Order Placed',
      date: new Date(order.createdDate),
      completed: true,
      active: false
    },
    {
      id: 2,
      status: 'Processing',
      date: new Date(order.createdDate), // +1 day
      completed: order.status > 0,
      active: order.status === 0
    },
    {
      id: 3,
      status: 'Shipped',
      date: order.deliveryDate ? new Date(order.deliveryDate) : null,
      completed: order.status > 1,
      active: order.status === 1
    },
    {
      id: 4,
      status: 'Delivered',
      date: order.deliveryDate ? new Date(order.deliveryDate) : null,
      completed: order.status === 4,
      active: false
    }
  ];

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Order Details</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        
        <div className={styles.modalBody}>          
          <div className={styles.orderDetailsGrid}>
            {/* Order Information */}
            <div className={styles.detailCard}>
              <h3 className={styles.detailTitle}>Order Information</h3>
              <p className={styles.detailValue}>#{order.orderId}</p>
              <p className={styles.detailValue}>{order.productName}</p>
              <p className={styles.detailValue}>Quantity: 1</p>
              <p className={styles.detailValue}>Total: 200000</p>
              <div className="d-flex align-items-center mt-2">
                <div className={`${styles.iconContainer} ${styles[`icon${statusText.replace(' ', '')}`]} me-2`}>
                  <IconComponent className={styles.statusIcon} />
                </div>
                <Badge bg={getStatusVariant(statusText)}>
                  {statusText}
                </Badge>
              </div>
            </div>
            
            {/* Customer Information */}
            <div className={styles.detailCard}>
              <h3 className={styles.detailTitle}>Customer Details</h3>
              <p className={styles.detailValue}>{order.customerName}</p>
              <p className={styles.detailValue}>{order.customerPhone}</p>
              <div className="d-flex align-items-start mt-2">
                <MapPin size={16} className="me-2 mt-1" />
                <p className={styles.detailValue}>{order.address}</p>
              </div>
            </div>
            
            {/* Shipping Information */}
            <div className={styles.detailCard}>
              <h3 className={styles.detailTitle}>Shipping Details</h3>
              <p className={styles.detailValue}>{'Standard Shipping'}</p>
              <p className={styles.detailValue}>Tracking #: {order.orderId || 'Not available'}</p>
              <p className={styles.detailValue}>Carrier: { 'Not specified'}</p>
              <p className={styles.detailValue}>
                Estimated Delivery: {order.deliveryDate ? new Date(order.deliveryDate).toLocaleDateString() : 'Not specified'}
              </p>
            </div>
            
            {/* Payment Information */}
            <div className={styles.detailCard}>
              <h3 className={styles.detailTitle}>Payment Information</h3>
              <p className={styles.detailValue}>Method: { 'Credit Card'}</p>
              <p className={styles.detailValue}>Status: {'Paid'}</p>
              <p className={styles.detailValue}>Transaction ID: { 'N/A'}</p>
              <p className={styles.detailValue}>Date: {new Date(order?.deliveryDate).toLocaleDateString()}</p>
            </div>
          </div>
          
          {/* Order Timeline */}
          <h3 className="mt-4 mb-3">Order Timeline</h3>
          <div className={styles.timeline}>
            {timelineSteps.map((step) => (
              <div key={step.id} className={styles.timelineItem}>
                <div className={`${styles.timelineDot} ${
                  step.completed ? styles.timelineDotCompleted : 
                  step.active ? styles.timelineDotActive : ''
                }`}>
                  {step.completed ? <CheckCircle size={12} /> : <Clock size={12} />}
                </div>
                <div className={styles.timelineDate}>
                  {step.date ? step.date.toLocaleDateString() : 'Pending'}
                </div>
                <div className={styles.timelineText}>
                  {step.status}
                  {step.active && <span className="ms-2 badge bg-primary">Current</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className={styles.modalFooter}>
          <Button variant="outline-secondary" onClick={onClose}>
            Close
          </Button>
          {statusText === 'In Transit' && (
            <Button variant="primary">
              <Truck size={16} className="me-2" />
              Track Package
            </Button>
          )}
          {statusText === 'Delivered' && (
            <Button variant="success">
              <CreditCard size={16} className="me-2" />
              View Invoice
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

  const OrderCard: React.FC<OrderCardProps> = ({ order, index }) => {
    const statusText = getStatusText(order.status);
    console.log('OrderCard', order, statusText);
    const isHovered = hoveredCard === `${order.orderId}-${index}`;
    const IconComponent = ordersIcons[statusText] || Package;

    const actions: string[] = ['View Details'];
    if (statusText === 'In Transit') actions.push('Track Order');
    if (statusText === 'Delivered') actions.push('Invoice');
    if (statusText === 'Order Placed') actions.push('Cancel');

    return (
      <Card 
        className={`${styles.orderCard} ${isHovered ? styles.orderCardHovered : ''} mb-3`}
        onMouseEnter={() => setHoveredCard(`${order.orderId}-${index}`)}
        onMouseLeave={() => setHoveredCard(null)}
      >
        <div className={styles.cardGlow} />
        <CardBody className={styles.cardBody}>
          <Row className="align-items-center">
            {/* Order Info Section */}
            <Col xs={12} md={4} lg={3} className="mb-3 mb-md-0">
              <div className="d-flex align-items-center">
                <div className={`${styles.iconContainer} ${styles[`icon${statusText.replace(' ', '')}`]} me-3`}>
                  <IconComponent className={styles.statusIcon} />
                </div>
                <div>
                  <h6 className={`${styles.orderTitle} mb-1`}>{order.productName}</h6>
                  <small className={`${styles.orderId} text-muted`}>#{order.orderId}</small>
                </div>
              </div>
            </Col>

            {/* Customer Section */}
            <Col xs={12} md={4} lg={3} className="mb-3 mb-md-0">
              <div className="d-flex align-items-center">
                <div className={`${styles.customerAvatar} me-2`}>
                  <span className={styles.avatarText}>
                    {order.customerName?.split(' ').map((n: string) => n[0]).join('')}
                  </span>
                </div>
                <div className="flex-grow-1">
                  <div className={`${styles.customerName} mb-1`}>{order.customerName}</div>
                  <div className={`${styles.customerAddress} d-flex align-items-center`}>
                    <MapPin size={12} className="me-1" />
                    <small className="text-muted text-truncate">{order.address}</small>
                  </div>
                </div>
              </div>
            </Col>

            {/* Status & Time Section */}
            <Col xs={12} md={2} lg={2} className="mb-3 mb-md-0">
              <div className="text-center">
                <Badge 
                  bg={getStatusVariant(statusText)} 
                  className={`${styles.statusBadge} mb-2`}
                >
                  {statusText}
                </Badge>
                <div className={`${styles.timeInfo} d-flex align-items-center justify-content-center`}>
                  <Clock size={12} className="me-1" />
                  <small className="text-muted">
                    {new Date(order.deliveryDate).toLocaleDateString()}
                  </small>
                </div>
              </div>
            </Col>

            {/* Actions Section */}
            <Col xs={12} md={2} lg={4} className="text-end">
              <div className={`${styles.actionsContainer} d-flex flex-wrap gap-2 justify-content-end`}>
                {actions.map((action, actionIndex) => (
                  <Button
                    key={actionIndex}
                    size="sm"
                    variant={actionIndex === 0 ? 'primary' : 'outline-secondary'}
                    className={styles.actionButton}
                    onClick={() => action === 'View Details' && setSelectedOrder(order)}
                  >
                    {action === 'View Details' && <Eye size={14} className="me-1" />}
                    {action === 'Cancel' && <X size={14} className="me-1" />}
                    {action === 'Track Order' && <Truck size={14} className="me-1" />}
                    {action === 'Invoice' && <CreditCard size={14} className="me-1" />}
                    {action}
                  </Button>
                ))}
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    );
  };

  if (isLoading) {
    return (
      <Container fluid className={styles.container}>
        <div className="d-flex justify-content-center align-items-center min-vh-100">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <>
      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
      <Container fluid className={styles.container}>
        <div className={styles.wrapper}>
          {/* Header */}
          <div className={`${styles.header} text-center mb-5`}>
            <h1 className={styles.pageTitle}>Orders List</h1>
          </div>

        {/* Controls */}
        <Card className={`${styles.controlsCard} mb-4`}>
          <CardBody>
            <Row className="align-items-center">
              <Col xs={12} md={6} className="mb-3 mb-md-0">
                <InputGroup>
                  <InputGroup.Text className={styles.searchIcon}>
                    <Search size={16} />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Search orders by product name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={styles.searchInput}
                  />
                </InputGroup>
              </Col>
              <Col xs={12} md={3} className="mb-3 mb-md-0">
                <InputGroup>
                  <InputGroup.Text className={styles.filterIcon}>
                    <Filter size={16} />
                  </InputGroup.Text>
                  <Form.Select
                    value={statusFilter}
                    onChange={(e) => {
                      const newStatusFilter = e.target.value as any;
                      setStatusFilter(newStatusFilter);
                      if (newStatusFilter === 'Delivered') {
                        setActiveTab('completed');
                      }else{
                        setActiveTab('inProgress');
                      }
                    }}
                    className={styles.filterSelect}
                  >
                    <option value="All">All Status</option>
                    <option value="In Transit">In Transit</option>
                    <option value="Pending Pickup">Pending Pickup</option>
                    <option value="Delivered">Delivered</option>
                  </Form.Select>
                </InputGroup>
              </Col>
              <Col xs={12} md={3}>
                <div className="d-flex gap-2">
                  <Button
                    variant={activeTab === 'inProgress' ? 'primary' : 'outline-primary'}
                    onClick={() => setActiveTab('inProgress')}
                    className="flex-fill"
                  >
                    In Progress ({filteredOrders.inProgress.length})
                  </Button>
                  <Button
                    variant={activeTab === 'completed' ? 'success' : 'outline-success'}
                    onClick={() => setActiveTab('completed')}
                    className="flex-fill"
                  >
                    Completed ({filteredOrders.completed.length})
                  </Button>
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>

        {/* Orders Section */}
        {activeTab === 'inProgress' && (
          <Card className={styles.sectionCard}>
            <div className={`${styles.sectionHeader} ${styles.sectionHeaderProgress}`}>
              <div className={styles.sectionHeaderContent}>
                <div className={styles.sectionIcon}>
                  <Clock className={styles.sectionIconSvg} />
                </div>
                <div>
                  <h2 className={styles.sectionTitle}>Progress</h2>
                  <p className={styles.sectionSubtitle}>Orders currently being processed</p>
                </div>
                <Badge bg="light" text="dark" className={styles.orderCount}>
                  {filteredOrders.inProgress.length} Orders
                </Badge>
              </div>
            </div>
            <CardBody className={styles.sectionContent}>
              {filteredOrders.inProgress.length === 0 ? (
                <div className={`${styles.emptyState} text-center py-5`}>
                  <Package size={48} className="text-muted mb-3" />
                  <h5 className="text-muted">No active orders found</h5>
                  <p className="text-muted">Try adjusting your search or filter criteria</p>
                </div>
              ) : (
                filteredOrders.inProgress.map((order, index) => (
                  <OrderCard key={order.orderId} order={order} index={index} />
                ))
              )}
            </CardBody>
          </Card>
        )}

        {activeTab === 'completed' && (
          <Card className={styles.sectionCard}>
            <div className={`${styles.sectionHeader} ${styles.sectionHeaderCompleted}`}>
              <div className={styles.sectionHeaderContent}>
                <div className={styles.sectionIcon}>
                  <CheckCircle className={styles.sectionIconSvg} />
                </div>
                <div>
                  <h2 className={styles.sectionTitle}>Completed Orders</h2>
                  <p className={styles.sectionSubtitle}>Successfully delivered orders</p>
                </div>
                <Badge bg="light" text="dark" className={styles.orderCount}>
                  {filteredOrders.completed.length} Orders
                </Badge>
              </div>
            </div>
            <CardBody className={styles.sectionContent}>
              {filteredOrders.completed.length === 0 ? (
                <div className={`${styles.emptyState} text-center py-5`}>
                  <CheckCircle size={48} className="text-muted mb-3" />
                  <h5 className="text-muted">No completed orders found</h5>
                  <p className="text-muted">Try adjusting your search or filter criteria</p>
                </div>
              ) : (
                filteredOrders.completed.map((order, index) => (
                  <OrderCard key={order.orderId} order={order} index={index} />
                ))
              )}
            </CardBody>
          </Card>
        )}
      </div>
    </Container>
  
  </>);
};



export default OrdersList;