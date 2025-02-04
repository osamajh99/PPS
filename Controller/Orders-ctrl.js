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
module.exports = {
     CreateOrder

}