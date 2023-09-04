const express = require('express');
const StockCtrl = require('../Controller/Stock-ctrl');

const router = express.Router();

router.post('/stock', StockCtrl.addStock);

module.exports = router;
