const Stock = require('../Model/Stock-model');

const addStock = (req, res) => {
  const { Product_Id, Quantity, Address } = req.body;

  if (!Product_Id || !Quantity || !Address) {
    return res.status(400).json({
      success: false,
      error: 'You must provide productId, Quantity, and Address',
    });
  }

  const newStock = new Stock({
    Product_Id, 
    Quantity,
    Address,
  });

  newStock
    .save()
    .then((stock) => {
      return res.status(201).json({
        success: true,
        id: stock._id,
        message: 'Stock Added!',
      });
    })
    .catch((error) => {
      return res.status(400).json({
        error,
        message: 'Stock not added!',
      });
    });
};

module.exports = {
  addStock,
};
