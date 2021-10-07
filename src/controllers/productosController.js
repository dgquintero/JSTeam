const db = require('../models/Db');



exports.productos = (req, res) => {
  res.json({
    status: 'Api works'
  })
}

exports.newProduct = (req, res) => {
  console.log(req.body);
  const newProduct = {
    name: req.body.name,
    color: req.body.color
  }
  db.ref('products').push(newProduct)
  res.json({
    status: newProduct.name
  })
  
}
