import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './screens/ShopOwner/HomePage';
import DeliverPro from './screens/Landing/LandingScreen';
import AddShop from './shared/AddShop/AddShop';
import Layout from './screens/Layout/NavbarLayout';
import DashboardPage from './screens/ShopOwner/DashboardPage';
import BackgroundLayout from './screens/Layout/BackgroundLayout';
import NewDeliveryPage from './screens/ShopOwner/NewDeliveryPage';
import { LookupLabelService } from './service/lookupLabel.service';
import { useEffect } from 'react';
import OrdersList from './screens/ShopOwner/OrderListPage';

function App() {
  useEffect(() => {
    const lookupLabelService = LookupLabelService.getInstance();
    lookupLabelService.getLookupLabel();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<BackgroundLayout><HomePage /></BackgroundLayout>} />
        <Route path="add-shop" element={<BackgroundLayout><AddShop /></BackgroundLayout>} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="delivery-request/:id" element={<BackgroundLayout><NewDeliveryPage /></BackgroundLayout>} />
        <Route path="order-list" element={<OrdersList />} />
      </Route>
      <Route path="/landing-page" element={<DeliverPro />} />
    </Routes>
  );
}

export default App;
