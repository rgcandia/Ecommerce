import React from 'react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import styles from './Carrito.module.css';

const Carrito = () => {
  const { cart, removeFromCart, totalPrice, clearCart } = useCart();

  const handlePayment = async () => {
    // Aquí es donde llamaremos a tu backend para Mercado Pago más adelante
    alert('Redirigiendo a Mercado Pago...');
    console.log('Productos a pagar:', cart);
  };

  if (cart.length === 0) {
    return (
      <div className={styles.emptyCart}>
        <h2>Tu carrito está vacío</h2>
        <p>Parece que aún no has agregado nada.</p>
        <Link to="/" className={styles.backLink}>Ir a la tienda</Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Tu Carrito</h1>
      
      <div className={styles.layout}>
        {/* Lado Izquierdo: Lista de items */}
        <div className={styles.itemsList}>
          {cart.map((item) => (
            <div key={item.id} className={styles.item}>
              <img src={item.image} alt={item.name} className={styles.itemImage} />
              <div className={styles.itemInfo}>
                <p className={styles.itemName}>{item.name}</p>
                <p className={styles.itemPrice}>${Number(item.price).toLocaleString()}</p>
              </div>
              <button 
                className={styles.removeBtn}
                onClick={() => removeFromCart(item.id)}
              >
                Eliminar
              </button>
            </div>
          ))}
          <button onClick={clearCart} style={{marginTop: '10px', background: 'none', border: 'none', color: '#888', cursor: 'pointer', textAlign: 'left'}}>
            Vaciar carrito
          </button>
        </div>

        {/* Lado Derecho: Resumen y Pago */}
        <aside className={styles.summary}>
          <h2 className={styles.summaryTitle}>Resumen de compra</h2>
          <div className={styles.summaryRow}>
            <span>Productos ({cart.length})</span>
            <span>${totalPrice.toLocaleString()}</span>
          </div>
          <div className={`${styles.summaryRow} ${styles.total}`}>
            <span>Total</span>
            <span>${totalPrice.toLocaleString()}</span>
          </div>
          <button 
            className={styles.payButton}
            onClick={handlePayment}
          >
            Continuar compra
          </button>
        </aside>
      </div>
    </div>
  );
};

export default Carrito;