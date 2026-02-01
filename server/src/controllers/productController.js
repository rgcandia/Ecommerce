const { Product } = require('../db');

// Obtener todos los productos
const getAllProducts = async () => {
  return await Product.findAll();
};

// Crear un producto (para que puedas cargar tu catálogo)
const createProduct = async (data) => {
  const { title, price, image } = data;
  if (!title || !price) throw new Error("Faltan datos obligatorios");
  
  return await Product.create({ title, price, image });
};

module.exports = { getAllProducts, createProduct };