const express = require('express')
const { checkAuthUser } = require("../Middlewares/checkAuthUser");

const OrderCtrl = require('../Controller/Orders-ctrl')

 const router = express.Router()

 router.post('/orders', OrderCtrl.CreateOrder)
 router.post('/products',[checkAuthUser], OrderCtrl.CreateOrder)

 module.exports = router