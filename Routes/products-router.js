const express = require('express')
const { checkAuthUser } = require("../Middlewares/checkAuthUser");

const ProductsCtrl = require('../Controller/products-ctrl')

 const router = express.Router()

 router.post('/products',[checkAuthUser], ProductsCtrl.addProducts)


 module.exports = router