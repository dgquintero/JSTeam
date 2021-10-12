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

exports.newEmpleado = (req, res) => {
  console.log(req.body);
  const newEmpleado = {
    name: req.body.name,
    apellido: req.body.apellido
  }
  db.ref('empleado').push(newEmpleado)
  res.json({
    status: newEmpleado.name
  })
  
}
