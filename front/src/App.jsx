import { Outlet, Link } from 'react-router-dom';
import { useCart } from './context/CartContext'; 
import styles from './App.module.css';

function App() {
  // Extraemos totalItems para que el contador sea dinámico
  const { totalItems } = useCart();

  return (
    <div className={styles.appContainer}>
      {/* Header con navegación */}
      <header className={styles.header}>
        <nav className={styles.nav}>
          <Link to="/" className={styles.logo}>
            TECH<span>STORE</span>
          </Link>

          <div className={styles.navLinks}>
            <Link to="/" className={styles.link}>
              Tienda
            </Link>
            
            <Link to="/contacto" className={styles.link}>
              Contacto
            </Link>
            
            {/* Combinamos styles.link y styles.cartLink */}
            <Link 
              to="/carrito" 
              className={`${styles.link} ${styles.cartLink}`}
            >
              🛒 <span>Carrito</span>
              {totalItems > 0 && (
                <span className={styles.cartBadge}>{totalItems}</span>
              )}
            </Link>
          </div>
        </nav>
      </header>

      {/* Contenido dinámico según la ruta */}
      <main className={styles.main}>
        <Outlet /> 
      </main>

      {/* Footer minimalista */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p>© 2026 TechStore Ecommerce - Proyecto Final</p>
          <p>Buenos Aires, Argentina</p>
        </div>
      </footer>
    </div>
  );
}

export default App;