import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Inicializamos el estado desde localStorage si existe
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Persistencia automática: cada vez que el cart cambie, guardamos
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Lógica para agregar productos (escalable: maneja cantidades)
  const addToCart = useCallback((product) => {
    setCart((prevCart) => {
      const isProductInCart = prevCart.find((item) => item.id === product.id);

      if (isProductInCart) {
        return prevCart.map((item) =>
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  }, []);

  // Eliminar un producto por ID
const removeFromCart = useCallback((id, removeAll = false) => {
  setCart((prev) => {
    const product = prev.find(item => item.id === id);
    
    // Si no existe el producto, no hacemos nada
    if (!product) return prev;

    // Si pedimos borrar todo o si solo queda 1 unidad, filtramos el ID
    if (removeAll || product.quantity === 1) {
      return prev.filter((item) => item.id !== id);
    }

    // Si hay más de 1, restamos 1 a la cantidad
    return prev.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity - 1 } : item
    );
  });
}, []);

  // Limpiar carrito
  const clearCart = useCallback(() => setCart([]), []);

  // Cálculos derivados (Memorizados para performance)
  const totalItems = useMemo(() => 
    cart.reduce((acc, item) => acc + item.quantity, 0), [cart]);
  
  const totalPrice = useMemo(() => 
    cart.reduce((acc, item) => acc + (item.price * item.quantity), 0), [cart]);

  // Exponemos el objeto value
  const value = useMemo(() => ({
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    totalItems,
    totalPrice
  }), [cart, addToCart, removeFromCart, clearCart, totalItems, totalPrice]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Hook personalizado para evitar importar useContext en cada componente
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe usarse dentro de un CartProvider');
  }
  return context;
};