import { useState } from "react";
import { Container, Tab, Tabs, Card, Button, Row, Col } from "react-bootstrap";
import { Icons } from "../../shared/icons";
import "./AccountSettings.css"; // Using CSS file for better organization

const AccountSettings = () => {
  const [activeTab, setActiveTab] = useState("personal");

  return (
    <Container fluid className="account-settings-container px-lg-5 py-2">
      {/* Header Section */}
      <div className="header mb-2 text-center text-md-start">
        <h2 className="title gradient-text mb-2">
          <Icons.FaUserCog className="me-3" /> Account Settings
        </h2>
        <p className="subtitle text-muted">
          Manage your personal details and shop information in one place
        </p>
      </div>

      {/* Main Content */}
      <Row className="justify-content-center">
        <Col xl={10} xxl={8}>
          {/* Settings Card */}
          <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k as string)}>
          <Card className="settings-card border-0 shadow-sm rounded-lg overflow-hidden">
            {/* Tabs Navigation */}
            <div className="tabs-header bg-light">
              <Tabs
                activeKey={activeTab}
                onSelect={(k) => setActiveTab(k as string)}
                className="custom-tabs px-3 px-md-4"
                variant="pills"
              >
                <Tab
                  eventKey="personal"
                  title={
                    <span className="d-flex align-items-center">
                      <Icons.LucideUser className="me-2" /> Personal
                    </span>
                  }
                />
                <Tab
                  eventKey="shop"
                  title={
                    <span className="d-flex align-items-center">
                      <Icons.FaStore className="me-2" /> Shop
                    </span>
                  }
                />
              </Tabs>
            </div>

            {/* Tab Content */}
            <Card.Body className="p-4 p-md-5">
              <Tab.Content>
                {/* Personal Details Tab */}
                <Tab.Pane eventKey="personal">
                  <div className="section-box mb-4">
                    <div className="section-header d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
                     <div className="icon-text d-flex align-items-center mb-1 mb-md-0">
                        <div className="icon-circle bg-purple-light">
                          <Icons.LucideUser className="text-purple" />
                        </div>
                        <h6 className="mb-0 ms-3">Personal Information</h6>
                      </div>
                      <Button variant="outline-purple" className="edit-button">
                        <Icons.FaPen className="me-2" /> Edit
                      </Button>
                    </div>
                    <div className="section-content">
                      <Row >
                        <Col md={6}>
                          <div className="info-item">
                            <span className="label">Full Name</span>
                            <p className="value">Rahul Sharma</p>
                          </div>
                        </Col>
                        <Col md={6}>
                          <div className="info-item">
                            <span className="label">Mobile Number</span>
                            <p className="value">+91 9876543210</p>
                          </div>
                        </Col>
                        <Col md={6}>
                          <div className="info-item">
                            <span className="label">Email</span>
                            <p className="value">rahul.sharma@example.com</p>
                          </div>
                        </Col>
                        <Col md={6}>
                          <div className="info-item">
                            <span className="label">Date of Birth</span>
                            <p className="value">15 January 1990</p>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </div>

                  <div className="section-box">
                    <div className="section-header d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
                      <div className="icon-text d-flex align-items-center mb-1 mb-md-0">
                        <div className="icon-circle bg-orange-light">
                          <Icons.LockIcon className="text-orange" />
                        </div>
                        <h6 className="mb-0 ms-3">Security</h6>
                      </div>
                    </div>
                    <div className="section-content">
                      <Row >
                        <Col md={6}>
                          <div className="info-item">
                            <span className="label">Password</span>
                            <p className="value">●●●●●●●●</p>
                          </div>
                        </Col>
                        <Col md={6} className="d-flex align-items-end">
                          <Button variant="outline-primary" className="change-button">
                            Change Password
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Tab.Pane>

                {/* Shop Details Tab */}
                <Tab.Pane eventKey="shop">
                  <div className="section-box">
                    <div className="section-header d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
                      <div className="icon-text d-flex align-items-center mb-1 mb-md-0">
                        <div className="icon-circle bg-blue-light">
                          <Icons.FaStore className="text-blue" />
                        </div>
                        <h6 className="mb-0 ms-3">Shop Information</h6>
                      </div>
                      <Button variant="outline-purple" className="edit-button">
                        <Icons.FaPen className="me-2" /> Edit
                      </Button>
                    </div>
                    <div className="section-content">
                      <Row >
                        <Col md={6}>
                          <div className="info-item">
                            <span className="label">Shop Name</span>
                            <p className="value">Sharma General Store</p>
                          </div>
                        </Col>
                        <Col md={6}>
                          <div className="info-item">
                            <span className="label">Registration Number</span>
                            <p className="value">REG-1234567890</p>
                          </div>
                        </Col>
                        <Col md={12}>
                          <div className="info-item">
                            <span className="label">Address</span>
                            <p className="value">
                              123, Main Road, New Delhi, India - 110001
                            </p>
                          </div>
                        </Col>
                        <Col md={6}>
                          <div className="info-item">
                            <span className="label">GST Number</span>
                            <p className="value">22ABCDE1234F1Z5</p>
                          </div>
                        </Col>
                        <Col md={6}>
                          <div className="info-item">
                            <span className="label">PAN Number</span>
                            <p className="value">ABCDE1234F</p>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Tab.Pane>
              </Tab.Content>
            </Card.Body>
          </Card>
          </Tab.Container>
        </Col>
      </Row>
    </Container>
  );
};

export default AccountSettings;