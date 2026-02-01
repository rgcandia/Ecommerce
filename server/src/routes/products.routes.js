const { Router } = require('express');
const { Product } = require('../db'); // Importamos el modelo desde tu db.js

const router = Router();

// GET /products - Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /products - Crear un producto (para cargar tu catálogo)
router.post('/', async (req, res) => {
  try {
    const { title, price, image } = req.body;
    const newProduct = await Product.create({ title, price, image });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;