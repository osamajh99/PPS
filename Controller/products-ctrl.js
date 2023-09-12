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
          
        
          .catch(error => {
               return res.status(400).json({
                    error,
                    message: 'products not added!',
               })
          })
}
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
     updateProducts,
     deleteProduct,
     getproducts


}

getproducts = async (req, res) => {
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
  
deleteProduct = async (req, res) => {
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