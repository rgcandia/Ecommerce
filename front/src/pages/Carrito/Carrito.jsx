import React from 'react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import styles from './Carrito.module.css';

const Carrito = () => {
  // AGREGAMOS 'addToCart' AQUÍ ABAJO (esto era lo que faltaba)
  const { cart, addToCart, removeFromCart, totalPrice, totalItems, clearCart } = useCart();

  const handlePayment = async () => {
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
        <div className={styles.itemsList}>
          {cart.map((item) => (
            <div key={item.id} className={styles.item}>
              <img src={item.image} alt={item.name} className={styles.itemImage} />
              
              <div className={styles.itemInfo}>
                <p className={styles.itemName}>{item.name}</p>
                <p className={styles.itemPrice}>
                  ${Number(item.price).toLocaleString()} x {item.quantity} units
                </p>
                <p className={styles.subtotal}>
                  Subtotal: ${(item.price * item.quantity).toLocaleString()}
                </p>
              </div>

              <div className={styles.quantityControls}>
                {/* Botón menos: resta 1 o elimina si es el último */}
                <button onClick={() => removeFromCart(item.id)} className={styles.qtyBtn}>-</button>
                <span className={styles.qtyNumber}>{item.quantity}</span>
                {/* Botón más: ahora sí tiene la función addToCart disponible */}
                <button onClick={() => addToCart(item)} className={styles.qtyBtn}>+</button>
              </div>

              <button 
                className={styles.removeBtn}
                onClick={() => removeFromCart(item.id, true)}
              >
                Eliminar todo
              </button>
            </div>
          ))}
          
          <button onClick={clearCart} className={styles.removeBtn}>
            Vaciar carrito
          </button>
        </div>

        <aside className={styles.summary}>
          <h2 className={styles.summaryTitle}>Resumen de compra</h2>
          <div className={styles.summaryRow}>
            {/* Usamos totalItems para mostrar la cantidad real de unidades */}
            <span>Productos ({totalItems})</span>
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