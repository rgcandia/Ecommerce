import React from 'react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import styles from './Carrito.module.css';

const Carrito = () => {
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
        <Link to="/" className={styles.backLink}>Regresar a la tienda</Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Tu Selección</h1>
      
      <div className={styles.layout}>
        <div className={styles.itemsList}>
          {cart.map((item) => (
            <div key={item.id} className={styles.item}>
              <img src={item.image} alt={item.name} className={styles.itemImage} />
              
              <div className={styles.itemInfo}>
                <p className={styles.itemName}>{item.name}</p>
                <p className={styles.itemPrice}>
                  ${Number(item.price).toLocaleString()} x {item.quantity}
                </p>
                <p className={styles.subtotalText}>
                  Subtotal: ${(item.price * item.quantity).toLocaleString()}
                </p>
              </div>

              <div className={styles.quantityControls}>
                <button onClick={() => removeFromCart(item.id)} className={styles.qtyBtn}>-</button>
                <span className={styles.qtyNumber}>{item.quantity}</span>
                <button onClick={() => addToCart(item)} className={styles.qtyBtn}>+</button>
              </div>

              <button 
                className={styles.removeBtn}
                onClick={() => removeFromCart(item.id, true)}
              >
                Quitar
              </button>
            </div>
          ))}
          
          <button onClick={clearCart} className={styles.clearCartBtn}>
            Vaciar Carrito
          </button>
        </div>


        <aside className={styles.summary}>
          <h2 className={styles.summaryTitle}>Resumen</h2>
          <div className={styles.summaryRow}>
            <span>Items totales:</span>
            <span>{totalItems}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Subtotal:</span>
            <span>${totalPrice.toLocaleString()}</span>
          </div>
          <div className={`${styles.summaryRow} ${styles.total}`}>
            <span>Total:</span>
            <span>${totalPrice.toLocaleString()}</span>
          </div>

          <button 
            className={styles.payButton}
            onClick={handlePayment}
          >
            Finalizar Compra
          </button>

          {/* NUEVO BOTÓN PARA VOLVER */}
          <Link to="/" className={styles.continueShopping}>
            Continuar Comprando
          </Link>
        </aside>

      </div>
    </div>
  );
};

export default Carrito;