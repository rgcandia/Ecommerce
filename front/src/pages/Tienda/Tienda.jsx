import React from 'react';
import { Link } from 'react-router-dom'; // 1. Importar Link
import { useProducts } from '../../context/ProductContext';
import { useCart } from '../../context/CartContext';
import styles from './Tienda.module.css';

const Tienda = () => {
  const { products, loading, error } = useProducts();
  const { addToCart } = useCart();

  if (loading) return <div className={styles.loading}>Descubriendo productos exclusivos...</div>;
  if (error) return <div className={styles.error}>Hubo un problema al cargar el catálogo: {error}</div>;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Catálogo 2026</h1>
        <p>Tecnología de vanguardia seleccionada para ti.</p>
      </header>

      <div className={styles.grid}>
        {products.map((product) => (
          <article key={product.id} className={styles.card}>
            {/* 2. Envolver la imagen con Link hacia la ruta dinámica */}
            <Link to={`/producto/${product.id}`} className={styles.imageLink}>
              <div className={styles.imageContainer}>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className={styles.image} 
                />
              </div>
            </Link>
            
            <div className={styles.info}>
              <span className={styles.category}>Premium Gadget</span>
              
              {/* 3. Envolver el nombre con Link */}
              <Link to={`/producto/${product.id}`} className={styles.nameLink}>
                <h3 className={styles.name}>{product.name}</h3>
              </Link>
              
              <p className={styles.price}>${Number(product.price).toLocaleString()}</p>
              
              <button 
                className={styles.button}
                onClick={() => addToCart(product)}
              >
                Añadir al carrito
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Tienda;