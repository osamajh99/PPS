const express = require('express')
const { checkAuthUser } = require("../middlewares/checkAuthUser");

const ProductsCtrl = require('../Controller/products-ctrl')

 const router = express.Router()

 router.post('/products',[checkAuthUser], ProductsCtrl.addProducts)


 module.exports = router