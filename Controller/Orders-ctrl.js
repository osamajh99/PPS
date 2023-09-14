const Orders = require('../Model/Orders-model')
const Products = require('../Model/products-model')
const Stock = require('../Model/Stock-model');

CreateOrder = async (req, res) => {
     const body = req.body
     // check if the body empty 
     if (!body) {
          return res.status(400).json({
               success: false,
               error: 'You must provide a Orders',
          })
     }

     const orders = new Orders(body)
     if (!orders) {
          return res.status(400).json({ success: false, error: err })
     }

     //check if product exist in table product 
     //TODO it will removed it when connect the front end it just to double check 
     const productId = req.body.ProductId
     const existProduct = await Products.findOne({ '_id': productId })
     if (!existProduct) {
          return res.status(400).json({ success: false, error: 'there is no product recored' })
     }

     //check if in stock , if yes we get the Quantity it shoude be more than 0 and we minus it by user Quantity
     const existProductInStock = await Stock.findOne({ 'ProductId': productId })
     if (!existProductInStock) {
          return res.status(400).json({ success: false, error: err })
     }

     if (existProductInStock.Quantity < req.body.Quantity || existProductInStock.Quantity <= 0) {
          return res.status(400).json({
               success: false,
               error: 'the Quantity is more than in Stock or 0 ',
          })
     }
     else {
          // to update the Documents
          const filter = { "ProductId": productId }
          const updateDocument = {
               $set: {
                    "Quantity": existProductInStock.Quantity - req.body.Quantity,
               },
          }
          const updatedStock = await Stock.updateOne(filter, updateDocument)
          if (updatedStock) {
               orders
                    .save()
                    .then(() => {
                         return res.status(201).json({
                              success: true,
                              id: orders._id,
                              message: 'orders Added!',
                         })
                    })
                    .catch(error => {
                         return res.status(400).json({
                              error,
                              message: 'orders not added!',
                         })
                    })
          }
          else {
               return res.status(400).json({
                    error,
                    message: 'orders not added!',
               })
          }
     }

}

getordereByuserId = async (req, res) => {
     try {
       const orders = await Orders.find({ UserId: req.params.id });
   
       if (!orders) {
         return res.status(404)
         .json({ success: false, error: `Order not found` });
       }
   
       return res.status(200)
       .json({ success: true, data: orders });
     } catch (err) {
       return res.status(400)
       .json({ success: false, error: err.message });
     }
   };

    //Cancel Order  

const deleteOrder = async (req, res) => {
     const { UserId } = req.body;

     if (!UserId) {
     return res.status(400).json({
     success: false,
     error: 'You must provide UserId',
     });
     }

     try {
     const existOrder = await Orders.findOne({ 'UserId': UserId });

     if (!existOrder) {
     return res.status(400).json({
          success: false,
          error: `There is no order associated with the UserId ${UserId}`,
     });
     }

     const orderDeleted = await Orders.deleteOne({ 'UserId': UserId });

     if (orderDeleted.deletedCount===1) {
     
     const orderDelete = await Orders.deleteOne({ '_id': UserId });
     if (orderDelete.deletedCount === 1) {
          return res.status(200).json({
          success: true,
          message: 'Order and associated product Deleted!',
          });
     
     
     } else {
          return res.status(500).json({
          success: false,
          error: 'Order deleted, but associated product could not be deleted',
          });
     }
     }
     else {
     return res.status(500).json({
          success: false,
          error: 'Order not deleted!',
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
     CreateOrder,
     getordereByuserId
     deleteOrder

}
