const express = require('express');
const StockCtrl = require('../Controller/Stock-ctrl');
const { checkAuthUser, isAdmin } = require("../Middlewares/checkAuthUser");

const router = express.Router();

router.post('/addstock',[checkAuthUser,isAdmin], StockCtrl.addStock);
router.post('/updatestock',[checkAuthUser,isAdmin], StockCtrl.updateStock);

module.exports = router;
