import { Outlet, Link } from 'react-router-dom';
import { useCart } from './context/CartContext'; 
import Preloader from './components/Preloader/Preloader'; // <-- Importar
import styles from './App.module.css';

function App() {
  const { totalItems } = useCart();

  return (
    <Preloader> {/* <-- Envolver todo aquí */}
      <div className={styles.appContainer}>
        <header className={styles.header}>
          <nav className={styles.nav}>
            <Link to="/" className={styles.logo}>
              LA TIENDA DE<span> VALU</span>
            </Link>

            <div className={styles.navLinks}>
              <Link to="/" className={styles.link}>Tienda</Link>
              <Link to="/contacto" className={styles.link}>Contacto</Link>
              <Link to="/carrito" className={`${styles.link} ${styles.cartLink}`}>
                🛒 <span>Carrito</span>
                {totalItems > 0 && (
                  <span className={styles.cartBadge}>{totalItems}</span>
                )}
              </Link>
            </div>
          </nav>
        </header>

        <main className={styles.main}>
          <Outlet /> 
        </main>

        <footer className={styles.footer}>
          <div className={styles.footerContent}>
            <p>© 2026 La Tienda de Valu - Elegant Clothes</p>
            <p>Buenos Aires, Argentina</p>
          </div>
        </footer>
      </div>
    </Preloader>
  );
}

export default App;