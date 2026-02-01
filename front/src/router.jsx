import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import Tienda from './pages/Tienda/Tienda.jsx';
import Carrito from './pages/Carrito/Carrito.jsx';
import Detalle from './pages/Detalle/Detalle.jsx';
// Componentes que crearás a continuación

const Contacto = () => <div><h2>Contacto</h2></div>;

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // Este será tu Layout principal
    children: [
      { index: true, element: <Tienda /> }, 
      { path: "producto/:id", element: <Detalle /> },
      { path: "carrito", element: <Carrito /> },
      { path: "contacto", element: <Contacto /> }
    ]
  }
]);

export default function Router() {
  return <RouterProvider router={router} />;
}