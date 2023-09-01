const Products = require('../Model/products-model')
addProducts = (req, res) => {
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

     products
          .save()
          .then(() => {
               return res.status(201).json({
                    success: true,
                    id: products._id,
                    message: 'products Added!',
               })
          })
          .catch(error => {
               return res.status(400).json({
                    error,
                    message: 'products not added!',
               })
          })
}
module.exports = {
     addProducts

}