const express = require('express')
const { checkAuthUser, isAdmin } = require("../Middlewares/checkAuthUser");

const ProductsCtrl = require('../Controller/products-ctrl')

 const router = express.Router()


 router.post('/addproducts',[checkAuthUser,isAdmin], ProductsCtrl.addProducts);

 router.delete('/deleteprod/:id',[checkAuthUser,isAdmin], ProductsCtrl.deleteProduct);
  router.get('/getproducts', ProductsCtrl.getproducts);

  
 module.exports = router