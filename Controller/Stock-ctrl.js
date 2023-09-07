const Stock = require('../Model/Stock-model');

const addStock = (req, res) => {
  const { ProductId, Quantity } = req.body;

  if (!ProductId || !Quantity) {
    return res.status(400).json({
      success: false,
      error: 'You must provide productId, Quantity',
    });
  }

  const newStock = new Stock({
    ProductId,
    Quantity
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
const updateStock = async (req, res) => {
  const { ProductId, Quantity } = req.body;

  if (!ProductId || !Quantity) {
    return res.status(400).json({
      success: false,
      error: 'You must provide productId, Quantity',
    });
  }
  const existProductInStock = await Stock.findOne({ 'ProductId': ProductId })
  if (!existProductInStock) {
    return res.status(400).json({
      success: false,
      error: `there is no product in the stock has ProductId ${ProductId}`,
    });
  }

  const filter = { "ProductId": ProductId }
  const updateDocument = {
    $set: {
      "Quantity": Quantity,
    },
  }
  const result = await Stock.updateOne(filter, updateDocument)
  if (result) {
    return res.status(201).json({
      success: true,
      id: ProductId,
      message: 'Stocks Updated!',
    })
  }
  else {
    return res.status(400).json({
      error,
      message: 'stock not updated!',
    })
  }
}
module.exports = {
  addStock,
  updateStock
};
