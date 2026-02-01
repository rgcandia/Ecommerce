import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Obtenemos la URL de las variables de entorno
  // Vite utiliza import.meta.env
  const API_URL = import.meta.env.VITE_API_URL;

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Verificación de seguridad por si olvidaste el .env
      if (!API_URL) {
        throw new Error("La variable VITE_API_URL no está definida en el archivo .env");
      }

      const response = await fetch(`${API_URL}/products`);
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: No se pudo obtener el catálogo`);
      }

      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.error("Error en ProductContext:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Memorizamos el valor para evitar renders innecesarios en los consumidores
  const value = useMemo(() => ({
    products,
    loading,
    error,
    refetch: fetchProducts 
  }), [products, loading, error, fetchProducts]);

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts debe usarse dentro de un ProductProvider');
  }
  return context;
};