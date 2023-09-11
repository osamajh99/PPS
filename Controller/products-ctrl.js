const Products = require('../Model/products-model')
const Stock = require('../Model/Stock-model');

addProducts = async (req, res) => {
     const body = req.body
     if (!body) {
          return res.status(400).json({
               success: false,
               error: 'You must provide a products',
          })
     }
     const products = new Products(body)

     if (!products) {
          return res.status(400).json({ success: false, error: err })
     }

     const dbProduct = await Products.create(products)
     if (dbProduct) {
          const newStock = { Quantity: 8, ProductId:dbProduct._id}
          const result = await Stock.create(newStock)
          if(result){
               return res.status(201).json({
                    success: true,
                    id: dbProduct._id,
                    message: 'products Added and Stocks Updated',
               })
          }
     }
     else {
          return res.status(400).json({ success: false, error: err })

     }
};
const updateProducts = async (req, res) => {
     const { ProductId, Price, Type, Name, Description } = req.body;
   
     if (!ProductId || !Price || !Type || !Name || !Description) {
       return res.status(400).json({
         success: false,
         error: "You must provide ProductId, Price, Type, Name, and Description",
       });
     }
     const updateProduct = await Products.findOneAndUpdate(
          { '_id': ProductId },
  {
    $set: {
      'Price': Price,
      'Type': Type,
      'Name': Name,
      'Description': Description
    },
  }
 );
 
   if(updateProducts)
   {
     return res.status(201).json({
          success : true,
          message : "Product Updated Successfully :)",
          id : ProductId
     });
   }
   else {
     return res.status(400).json({
       error,
       message: 'stock not updated!',
     });
   }

};
module.exports = {
     addProducts,
     updateProducts

};