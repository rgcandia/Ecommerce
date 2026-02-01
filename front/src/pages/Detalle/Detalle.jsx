import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../../context/ProductContext';
import { useCart } from '../../context/CartContext';
import styles from './Detalle.module.css';

const Detalle = () => {
  const { id } = useParams(); // Obtiene el "id" de la URL
  const navigate = useNavigate(); // Para el botón de volver
  const { products, loading } = useProducts();
  const { addToCart } = useCart();

  // Buscamos el producto en la lista que ya tenemos en memoria
  const product = products.find(p => String(p.id) === id);

  if (loading) return <div className={styles.status}>Cargando producto...</div>;

  if (!product) {
    return (
      <div className={styles.status}>
        <h2>Producto no encontrado</h2>
        <button onClick={() => navigate('/')} className={styles.backBtn}>
          Volver a la tienda
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <button onClick={() => navigate(-1)} className={styles.backLink}>
        ← Volver atrás
      </button>

      <div className={styles.layout}>
        {/* Imagen del producto */}
        <div className={styles.imageSection}>
          <img src={product.image} alt={product.name} className={styles.mainImg} />
        </div>

        {/* Información y compra */}
        <div className={styles.infoSection}>
          <span className={styles.badge}>Nuevo Ingreso</span>
          <h1 className={styles.title}>{product.name}</h1>
          <p className={styles.price}>${Number(product.price).toLocaleString()}</p>
          
          <div className={styles.description}>
            <h3>Sobre este artículo</h3>
            <p>{product.description}</p>
          </div>

          <button 
            className={styles.buyButton}
            onClick={() => addToCart(product)}
          >
            Añadir al carrito
          </button>

          <div className={styles.features}>
            <span>🚚 Envío gratis a todo el país</span>
            <span>🛡️ Garantía oficial de 12 meses</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detalle;