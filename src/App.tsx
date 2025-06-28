
import './App.css'
import { Routes, Route } from 'react-router-dom';
import HomePage from './screens/ShopOwner/HomePage';
import DeliverPro from './screens/Landing/LandingScreen';
import AddShop from './shared/AddShop/AddShop';
import Layout from './screens/layout';
import DashboardPage from './screens/ShopOwner/DashboardPage';
// import { LookupLabelService } from './service/lookupLabel.service';
// import { useEffect } from 'react';
function App() {

//  useEffect(() => {
//     const lookupLabelService = new LookupLabelService();

//     lookupLabelService.getLookupLabel()
//       .then(data => {
//         console.log('Lookups stored in sessionStorage:', data);
//       })
//       .catch(error => {
//         console.error('Failed to load lookup labels:', error);
//       });
//   }, []); // Runs only once on mount
  
  return (
    <>
     <Routes>
      <Route path="/" element={<Layout><HomePage /></Layout>} />
      <Route path="/add-shop" element={<Layout><AddShop /></Layout>} />
      <Route path="/landing-page" element={<DeliverPro />} />
      <Route path="/dashboard" element={<Layout><DashboardPage/></Layout>}/>
    </Routes>
    </>
  )
}

export default App
