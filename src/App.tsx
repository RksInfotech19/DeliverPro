
import './App.css'
import { Routes, Route } from 'react-router-dom';
import HomePage from './screens/ShopOwner/HomePage';
import DeliverPro from './screens/Landing/LandingScreen';
import AddShop from './shared/AddShop/AddShop';
import Layout from './screens/layout';
function App() {


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
