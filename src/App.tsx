
import './App.css'
import { Routes, Route } from 'react-router-dom';
import HomePage from './screens/ShopOwner/HomePage';
import DeliverPro from './screens/Landing/LandingScreen';
import AddShop from './shared/AddShop/AddShop';
import Layout from './screens/layout';
import { LookupLabelService } from './service/lookupLabel.service';
function App() {

  const lookupLabelService = new LookupLabelService();
  
  lookupLabelService.getLookupLabel()
  .then(data => {
    console.log('Lookups stored in sessionStorage:', data);
  })
  .catch(error => {
    console.error('Failed to load lookup labels:', error);
  });
  return (
    <>
     <Routes>
      <Route path="/" element={<Layout><HomePage /></Layout>} />
      <Route path="/add-shop" element={<Layout><AddShop /></Layout>} />
      <Route path="/landing-page" element={<DeliverPro />} />


    </Routes>
    </>
  )
}

export default App
