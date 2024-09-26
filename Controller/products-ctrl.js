const Products = require('../Model/products-model')
const Stock = require('../Model/Stock-model');

const addProducts = async (req, res) => {
  try {
    const body = req.body;
    if (!body) {
      return res.status(400).json({
        success: false,
        error: 'You must provide a products',
      });
    }
    const products = new Products(body);

    if (!products) {
      return res.status(400).json({ success: false, error: 'Failed to create product' });
    }

    const dbProduct = await Products.create(products);
    if (dbProduct) {
      const newStock = { Quantity: 1, ProductId: dbProduct._id };
      const result = await Stock.create(newStock);

      if (result) {
        return res.status(201).json({
          success: true,
          id: dbProduct._id,
          message: 'Products Added and Stocks Updated',
        });
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error,
      message: 'Internal server error',
    });
  }
};



const updateProducts = async (req, res) => {
     const { ProductId, Price, Type, Name, Description } = req.body;
   console.log(ProductId, Price, Type, Name, Description)
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
       message: 'Product not updated!',
     });
   }

};
const getproducts = async (req, res) => {
     try {
       const products = await Products.find({}).exec();
   
       if (!products.length) {
         return res.status(404)
         .json({ success: false, error: `Products not found` });
       }
   
       return res.status(200)
       .json({ success: true, data: products });
      
     } catch (err) {
       return res.status(400)
       .json({ success: false, error: err.message });
     }
   };
   
   const deleteProduct = async (req, res) => {
     console.log(req.params.id);
    const products =  await Products.findOneAndDelete({ _id: req.params.id }) 
      if (!products) {
      return res
      .status(404)
      .json({ success: false, error: "product not found" })
      }
     else{
      return res.status(200).json({ success: true, data: products })
      }
      }
module.exports = {
     addProducts,
     updateProducts,
     getproducts,
     deleteProduct



}
