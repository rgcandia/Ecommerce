import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';

// Componentes que crearás a continuación
const Tienda = () => <div><h2>Catálogo de Productos</h2></div>;
const ProductoDetalle = () => <div><h2>Detalle del Producto</h2></div>;
const Carrito = () => <div><h2>Tu Carrito</h2></div>;
const Contacto = () => <div><h2>Contacto</h2></div>;

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // Este será tu Layout principal
    children: [
      { index: true, element: <Tienda /> }, 
      { path: "producto/:id", element: <ProductoDetalle /> },
      { path: "carrito", element: <Carrito /> },
      { path: "contacto", element: <Contacto /> }
    ]
  }
]);

export default function Router() {
  return <RouterProvider router={router} />;
}