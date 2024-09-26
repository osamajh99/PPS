const Stock = require('../Model/Stock-model');
const Product = require('../Model/products-model');

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
  console.log(req.body);

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
  const stockUpdate= await Stock.updateOne(filter, updateDocument)
  if (stockUpdate ) {
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
const deleteStock = async (req, res) => {
  const { ProductId } = req.body;

  if (!ProductId) {
    return res.status(400).json({
      success: false,
      error: 'You must provide ProductId',
    });
  }

  try {
    const existProductInStock = await Stock.findOne({ 'ProductId': ProductId });

    if (!existProductInStock) {
      return res.status(400).json({
        success: false,
        error: `There is no product in the stock with ProductId ${ProductId}`,
      });
    }

    const stockUpdate = await Stock.deleteOne({ 'ProductId': ProductId });

    if (stockUpdate.deletedCount===1) {
  
      const productDelete = await Product.deleteOne({ '_id': ProductId });
      if (productDelete.deletedCount === 1) {
        return res.status(200).json({
          success: true,
          message: 'Stock and associated product Deleted!',
        });
      
    
      } else {
        return res.status(500).json({
          success: false,
          error: 'Stock deleted, but associated product could not be deleted',
        });
      }
    }
    else {
      return res.status(500).json({
        success: false,
        error: 'Stock not deleted!',
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Internal Server Error',
    });
  }
} 
module.exports = {
  addStock,
  updateStock,
  deleteStock

};
