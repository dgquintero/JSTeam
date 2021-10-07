const express = require('express');
const router = express.Router();


// importamos los controladores
const productosController = require('../controllers/productosController');







module.exports = function(){
  //tuta para el home
  router.get('/productos', productosController.productos);
  router.post('/new-product', productosController.newProduct);



  return router;
}

// router.get('/', (req,res) =>{
//   res.send('Hello World')
// })
