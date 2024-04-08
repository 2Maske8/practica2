var express = require("express");
var router = express.Router();
var products = require('../public/javascripts/productos')


//Login
router.get("/", function (req, res, next) {
  if (req.session.userName) {
    res.render("main", {
      title: "Coffee Shop",
      usuario: req.session.userName,
      layout: "historial" 
    });
  } else {
    res.render("listas", {});
  }
});

//Redireccionamiento de Listas
router.get('/listas', function(req, res, next) {
  res.render('listas', { title: 'CoffeShop', productos:products });
});

//Redireccionamiento de Carrito
router.get('/carrito', function(req, res, next) {
  res.render('carrito', { title: 'CoffeShop'});
});

//Redireccionamiento de Historial
router.get('/historial', function(req, res, next) {
  if (req.session.userName) {
    res.render('historial', { title: 'CoffeShop', usuario: req.session.userName });
  } else {
    res.redirect('/login');
  }
});


module.exports = router;
