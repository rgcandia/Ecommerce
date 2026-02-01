const { Router } = require('express');
const productsRoutes = require('./products.routes.js');

const router = Router();

// Ahora todas las rutas de productos empezarán con /products
router.use('/products', productsRoutes);

module.exports = router;