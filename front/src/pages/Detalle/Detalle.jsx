import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../../context/ProductContext';
import { useCart } from '../../context/CartContext';
import styles from './Detalle.module.css';

const Detalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, loading } = useProducts();
  const { addToCart } = useCart();

  const product = products.find(p => String(p.id) === id);

  if (loading) return <div className={styles.status}>Preparando detalles...</div>;

  if (!product) {
    return (
      <div className={styles.status}>
        <h2>Pieza no encontrada</h2>
        <button onClick={() => navigate('/')} className={styles.backBtn}>
          Regresar al catálogo
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <button onClick={() => navigate(-1)} className={styles.backLink}>
        ← Volver
      </button>

      <div className={styles.layout}>
        {/* Sección de Imagen */}
        <div className={styles.imageSection}>
          <img src={product.image} alt={product.name} className={styles.mainImg} />
        </div>

        {/* Sección de Información */}
        <div className={styles.infoSection}>
          <span className={styles.badge}>Edición Exclusiva</span>
          <h1 className={styles.title}>{product.name}</h1>
          <p className={styles.price}>${Number(product.price).toLocaleString()}</p>
          
          <div className={styles.description}>
            <h3>Descripción</h3>
            <p>{product.description}</p>
          </div>

          <button 
            className={styles.buyButton}
            onClick={() => addToCart(product)}
          >
            Añadir a mi selección
          </button>

          <div className={styles.features}>
            <span><i className={styles.icon}>✦</i> Envío de cortesía en todas las compras</span>
            <span><i className={styles.icon}>✦</i> Empaque premium para regalo incluido</span>
            <span><i className={styles.icon}>✦</i> Certificado de autenticidad</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detalle;