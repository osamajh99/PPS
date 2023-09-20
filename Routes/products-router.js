const express = require('express')
const { checkAuthUser, isAdmin } = require("../Middlewares/checkAuthUser");

const ProductsCtrl = require('../Controller/products-ctrl')

 const router = express.Router()

 router.get('/getproducts',[checkAuthUser], ProductsCtrl.getproducts);

 router.post('/addproducts',[checkAuthUser,isAdmin], ProductsCtrl.addProducts);
 router.put('/updateproducts',[checkAuthUser,isAdmin], ProductsCtrl.updateProducts)
 router.delete('/deleteprod/:id',[checkAuthUser,isAdmin], ProductsCtrl.deleteProduct);

 module.exports = router