import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { CartProvider } from './context/CartContext'; // Importas el provider
import {ProductProvider} from './context/ProductContext.jsx'
import Router from './router.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProductProvider>
    <CartProvider> {/* Envoltorio global */}
      <Router />
    </CartProvider>
    </ProductProvider>
  </StrictMode>,
);