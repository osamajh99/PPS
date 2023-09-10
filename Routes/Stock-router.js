const express = require('express');
const StockCtrl = require('../Controller/Stock-ctrl');
const { checkAuthUser, isAdmin } = require("../Middlewares/checkAuthUser");

const router = express.Router();

router.post('/addstock',[checkAuthUser,isAdmin], StockCtrl.addStock);
router.put('/updatestock',[checkAuthUser,isAdmin], StockCtrl.updateStock);
router.delete('/deletestock',[checkAuthUser,isAdmin], StockCtrl.deleteStock);

module.exports = router;
