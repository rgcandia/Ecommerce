import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { CartProvider } from './context/CartContext'; // Importas el provider
import Router from './router.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider> {/* Envoltorio global */}
      <Router />
    </CartProvider>
  </StrictMode>,
);