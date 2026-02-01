import { Outlet, Link } from 'react-router-dom';

function App() {
  return (
    <div className="app-container">
      <header>
        <nav>
          <Link to="/">Tienda</Link> | 
          <Link to="/carrito"> Carrito (0)</Link> | 
          <Link to="/contacto"> Contacto</Link>
        </nav>
      </header>

      <main style={{ padding: '20px' }}>
        {/* Aquí es donde aparecerán la Tienda, el Carrito, etc. */}
        <Outlet /> 
      </main>

      <footer>
        <p>© 2026 Mi Ecommerce - Todos los derechos reservados</p>
      </footer>
    </div>
  );
}

export default App;