var express = require("express");
var router = express.Router();
var productos = require('../public/javascripts/productos');

// Estructura de datos para almacenar productos en el carrito
var carrito = [];

// Ruta para agregar productos al carrito
router.post('/agregar-al-carrito', function(req, res, next) {
  var productId = req.body.productId;
  var cantidad = parseInt(req.body.cantidad);
  var product = productos.find(product => product.id === parseInt(productId));

  if (!product) {
    return res.status(404).send('Producto no encontrado');
  }

  var existingItem = carrito.find(item => item.producto.id === product.id);
  if (existingItem) {
    existingItem.cantidad += cantidad;
  } else {
    carrito.push({ producto: product, cantidad: cantidad });
  }

  // Renderizar la vista del carrito con los productos actualizados
  res.render('carrito', { title: 'CoffeShop', carrito: carrito });
});

module.exports = router;
