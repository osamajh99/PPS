const express = require('express')

const ProductsCtrl = require('../Controller/products-ctrl')

 const router = express.Router()

 router.post('/products', ProductsCtrl.addProducts)


 module.exports = router