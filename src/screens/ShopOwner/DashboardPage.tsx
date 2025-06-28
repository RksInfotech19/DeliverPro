import dashboardStyles from './DashboardPage.module.css';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Icons } from '../../shared/icons';

const DashboardPage = () => {
    return (
        <div className={dashboardStyles.dashboardContainer}>
            <Container fluid className={dashboardStyles.mainContent}>
                <Row className="text-center">
                    <div className={dashboardStyles.textWrapper}>
                        <h1 className={dashboardStyles.gradientText}>Welcome to <strong>Deliver Pro!</strong></h1>
                        <p className={`lead ${dashboardStyles.leadText}`}>
                            Manage your deliveries, track orders in real-time, grow your business with our reliable delivery network.
                        </p>
                        <button className={dashboardStyles.getStartedButton}>
                            <Icons.FaPaperPlane className={dashboardStyles.btnIcon} />
                            Request Delivery
                        </button>
                    </div>
                </Row>

                {/* Stat Cards */}
                <Row className={dashboardStyles.statsRow}>
                    {[
                        { title: "Today's Deliveries", value: 12, icon: <Icons.FaTruck /> },
                        { title: "Pending Orders", value: 5, icon: <Icons.FaClock /> },
                        { title: "Completed This Week", value: 48, icon: <Icons.FaCheck /> },
                        { title: "Today's Payments", value: 10, icon: <Icons.FaRupeeSign /> },
                    ].map((card, idx) => (
                        <Col md={3} key={idx}>
                            <Card className={dashboardStyles.statCard}>
                                <Card.Body className="text-center">
                                    <div className={dashboardStyles.statIcon}>{card.icon}</div>
                                    <div>{card.title}</div>
                                    <h4>{card.value}</h4>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>

                {/* Recent Activity Timeline */}
                <Card className={dashboardStyles.activityCard}>
                    <Card.Body>
                        <div className={dashboardStyles.activityHeader}>
                            <h5>Recent Activity</h5>
                            <a href="#" className={dashboardStyles.viewAll}>View All</a>
                        </div>
                        <div className={dashboardStyles.timeline}>
                            {[
                                {
                                    time: "3:45 PM",
                                    status: "Delivery Completed",
                                    detail: "Grocery package delivered to Rajesh Kumar",
                                    color: "green"
                                },
                                {
                                    time: "2:30 PM",
                                    status: "In Transit",
                                    detail: "Electronics package picked up by driver",
                                    color: "blue"
                                },
                                {
                                    time: "2:30 PM",
                                    status: "In Transit",
                                    detail: "Electronics package picked up by driver",
                                    color: "orange"
                                }
                            ].map((item, idx) => (
                                <div className={dashboardStyles.timelineItem} key={idx}>
                                    <div className={dashboardStyles[`timelineDot${item.color}`]}></div>
                                    <div>
                                        <strong>Today, {item.time} - {item.status}</strong>
                                        <div>{item.detail}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default DashboardPage;
