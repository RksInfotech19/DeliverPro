import orderDetailModalStyles from './OrderDetailModal.module.css';
import SharedModal from '../shared/Modal/SharedModal';
import { useEffect, useState } from 'react';
import { OrderService } from '../service/Order.service';
import { Icons } from '../shared/icons'; 
import { LookupLabelService } from '../service/lookupLabel.service';

type Props = {
  isOpened: boolean;
  orderId: string;
  onClose: () => void;
}

const OrderDetailsModal: React.FC<Props> = ({ isOpened, orderId, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const lookupLabelService = LookupLabelService.getInstance();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (orderId) {
        try {
          const service = await OrderService.getInstance();
          const order = await service.getOrderById(orderId);
          setSelectedOrder(order);
          setIsOpen(isOpened);
        } catch (error) {
          console.error('Failed to fetch order details:', error);
        }
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const handleClose = () => {
    onClose();
    setIsOpen(false);
    setSelectedOrder(null);
  };

  if (!selectedOrder) return null;

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return <Icons.CheckCircle className={orderDetailModalStyles.timelineIcon} />;
      case 'active':
        return <Icons.RefreshCw className={orderDetailModalStyles.timelineIcon} />;
      case 'pending':
        return <Icons.Clock className={orderDetailModalStyles.timelineIcon} />;
      default:
        return <Icons.AlertCircle className={orderDetailModalStyles.timelineIcon} />;
    }
  };

  return (
    <SharedModal 
      isOpen={isOpen} 
      onClose={handleClose} 
      title="Order Details"
    >

          <div className={orderDetailModalStyles.orderDetailsGrid}>
            {/* Product Section */}
            <div className={orderDetailModalStyles.detailCard}>
              <h3 className={orderDetailModalStyles.cardHeader}>
                <Icons.Package className={orderDetailModalStyles.cardIcon} />
                Product Information
              </h3>
              
              <div className={orderDetailModalStyles.detailItem}>
                <Icons.Tag className={orderDetailModalStyles.icon} />
                <div>
                  <div className={orderDetailModalStyles.detailTitle}>Product Name</div>
                  <div className={orderDetailModalStyles.detailValue}>{selectedOrder.productName}</div>
                </div>
              </div>

              <div className={orderDetailModalStyles.detailItem}>
                <Icons.Scale className={orderDetailModalStyles.icon} />
                <div>
                  <div className={orderDetailModalStyles.detailTitle}>Weight</div>
                  <div className={orderDetailModalStyles.detailValue}>{selectedOrder.weight} kg</div>
                </div>
              </div>

              <div className={orderDetailModalStyles.detailItem}>
                <Icons.Tag className={orderDetailModalStyles.icon} />
                <div>
                  <div className={orderDetailModalStyles.detailTitle}>Type</div>
                  <div className={orderDetailModalStyles.detailValue}>{lookupLabelService.getCategoryById(selectedOrder.productType)}</div>
                </div>
              </div>

              {selectedOrder.specialInstructions && (
                <div className={orderDetailModalStyles.detailItem}>
                  <Icons.MessageSquare className={orderDetailModalStyles.icon} />
                  <div>
                    <div className={orderDetailModalStyles.detailTitle}>Special Instructions</div>
                    <div className={orderDetailModalStyles.detailValue}>{selectedOrder.specialInstructions}</div>
                  </div>
                </div>
              )}
            </div>

            {/* Customer Info */}
            <div className={orderDetailModalStyles.detailCard}>
              <h3 className={orderDetailModalStyles.cardHeader}>
                <Icons.User className={orderDetailModalStyles.cardIcon} />
                Customer Information
              </h3>
              
              <div className={orderDetailModalStyles.detailItem}>
                <Icons.User className={orderDetailModalStyles.icon} />
                <div>
                  <div className={orderDetailModalStyles.detailTitle}>Customer</div>
                  <div className={orderDetailModalStyles.detailValue}>{selectedOrder.customerName}</div>
                </div>
              </div>

              <div className={orderDetailModalStyles.detailItem}>
                <Icons.Phone className={orderDetailModalStyles.icon} />
                <div>
                  <div className={orderDetailModalStyles.detailTitle}>Phone</div>
                  <div className={orderDetailModalStyles.detailValue}>{selectedOrder.customerPhone}</div>
                </div>
              </div>

              <div className={orderDetailModalStyles.detailItem}>
                <Icons.MapPin className={orderDetailModalStyles.icon} />
                <div>
                  <div className={orderDetailModalStyles.detailTitle}>Delivery Address</div>
                  <div className={orderDetailModalStyles.detailValue}>{selectedOrder.address}</div>
                </div>
              </div>
            </div>

            {/* Shop Info */}
            <div className={orderDetailModalStyles.detailCard}>
              <h3 className={orderDetailModalStyles.cardHeader}>
                <Icons.Store className={orderDetailModalStyles.cardIcon} />
                Shop Information
              </h3>
              
              <div className={orderDetailModalStyles.detailItem}>
                <Icons.Store className={orderDetailModalStyles.icon} />
                <div>
                  <div className={orderDetailModalStyles.detailTitle}>Shop</div>
                  <div className={orderDetailModalStyles.detailValue}>{selectedOrder.shopName}</div>
                </div>
              </div>

              <div className={orderDetailModalStyles.detailItem}>
                <Icons.Phone className={orderDetailModalStyles.icon} />
                <div>
                  <div className={orderDetailModalStyles.detailTitle}>Shop Phone</div>
                  <div className={orderDetailModalStyles.detailValue}>{selectedOrder.shopNumber}</div>
                </div>
              </div>

              <div className={orderDetailModalStyles.detailItem}>
                <Icons.MapPin className={orderDetailModalStyles.icon} />
                <div>
                  <div className={orderDetailModalStyles.detailTitle}>Shop Address</div>
                  <div className={orderDetailModalStyles.detailValue}>{selectedOrder.shopAddress}</div>
                </div>
              </div>
            </div>

            {/* Driver Info */}
            <div className={orderDetailModalStyles.detailCard}>
              <h3 className={orderDetailModalStyles.cardHeader}>
                <Icons.Truck className={orderDetailModalStyles.cardIcon} />
                Driver Information
              </h3>
              
              <div className={orderDetailModalStyles.detailItem}>
                <Icons.User className={orderDetailModalStyles.icon} />
                <div>
                  <div className={orderDetailModalStyles.detailTitle}>Driver</div>
                  <div className={orderDetailModalStyles.detailValue}>{selectedOrder.driverName}</div>
                </div>
              </div>

              <div className={orderDetailModalStyles.detailItem}>
                <Icons.Phone className={orderDetailModalStyles.icon} />
                <div>
                  <div className={orderDetailModalStyles.detailTitle}>Phone</div>
                  <div className={orderDetailModalStyles.detailValue}>{selectedOrder.driverMobile}</div>
                </div>
              </div>

              <div className={orderDetailModalStyles.detailItem}>
                <Icons.Mail className={orderDetailModalStyles.icon} />
                <div>
                  <div className={orderDetailModalStyles.detailTitle}>Email</div>
                  <div className={orderDetailModalStyles.detailValue}>{selectedOrder.driverEmail}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline Status */}
          <div className={orderDetailModalStyles.timelineContainer}>
            <h3 className={orderDetailModalStyles.timelineHeader}>
              <Icons.Clock className={orderDetailModalStyles.cardIcon} />
              Order Timeline
            </h3>
            
            <div className={orderDetailModalStyles.timeline}>
              <div className={orderDetailModalStyles.timelineItem}>
                <div className={`${orderDetailModalStyles.timelineDot} ${orderDetailModalStyles.timelineDotCompleted}`}>
                  {getStatusIcon('completed')}
                </div>
                <div className={orderDetailModalStyles.timelineContent}>
                  <div className={orderDetailModalStyles.timelineDate}>
                    {new Date(selectedOrder.createdDate).toLocaleString()}
                  </div>
                  <div className={orderDetailModalStyles.timelineText}>
                    <strong>Order Created</strong> by {selectedOrder.createdBy}
                  </div>
                </div>
              </div>

              <div className={orderDetailModalStyles.timelineItem}>
                <div className={`${orderDetailModalStyles.timelineDot} ${orderDetailModalStyles.timelineDotActive}`}>
                  {getStatusIcon('active')}
                </div>
                <div className={orderDetailModalStyles.timelineContent}>
                  <div className={orderDetailModalStyles.timelineDate}>
                    {new Date(selectedOrder.updatedDate).toLocaleString()}
                  </div>
                  <div className={orderDetailModalStyles.timelineText}>
                    <strong>Last Updated</strong>
                  </div>
                </div>
              </div>

              <div className={orderDetailModalStyles.timelineItem}>
                <div className={`${orderDetailModalStyles.timelineDot} ${orderDetailModalStyles.timelineDotPending}`}>
                  {getStatusIcon('pending')}
                </div>
                <div className={orderDetailModalStyles.timelineContent}>
                  <div className={orderDetailModalStyles.timelineDate}>
                    {new Date(selectedOrder.deliveryDate).toLocaleDateString()}
                  </div>
                  <div className={orderDetailModalStyles.timelineText}>
                    <strong>Expected Delivery</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
    </SharedModal>
  );
};

export default OrderDetailsModal;