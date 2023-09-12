const express = require('express')
const { checkAuthUser } = require("../Middlewares/checkAuthUser");

const OrderCtrl = require('../Controller/Orders-ctrl')

 const router = express.Router()

 router.post('/addorders',[checkAuthUser], OrderCtrl.CreateOrder)

 router.get('/orders/:id', OrderCtrl.getordereByuserId)
 module.exports = router