import React, { useState, useEffect } from 'react';
import styles from './Preloader.module.css';
// Importa tu logo aquí. Si es un archivo local:
 import logo from '../../assets/logo-valu.png'; 

const Preloader = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Forzamos la carga por 3 segundos
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.content}>
          {/* Reemplaza 'src' con tu variable 'logo' o URL directa */}
          <img 
            src={logo} 
            alt="La Tienda de Valu" 
            className={styles.logo} 
          />
          <div className={styles.spinner}></div>
          <p className={styles.text}>Cargando elegancia...</p>
        </div>
      </div>
    );
  }

  return children;
};

export default Preloader;