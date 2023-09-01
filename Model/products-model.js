const mongoose = require('mongoose')
 const Schema = mongoose.Schema
 const Products = new Schema(
 {
 productPrice: { type: Number, required: true },
 productType: { type: String, required: true },
 productName: { type: String, required: true },
 productDescrption: { type: String, required: false },

 },
 { timestamps: true },
 )

 module.exports = mongoose.model('products', Products)