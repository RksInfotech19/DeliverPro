import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import App from './App.tsx'
import { loadFonts } from './fontLoader';
loadFonts();
createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
