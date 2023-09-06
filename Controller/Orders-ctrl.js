const Orders = require('../Model/Orders-model')

CreateOrder = (req, res) => {
     const body = req.body

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
module.exports = {
    CreateOrder

}