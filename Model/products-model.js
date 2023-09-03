const mongoose = require('mongoose')
 const Schema = mongoose.Schema
 const Products = new Schema(
 {
 Price: { type: Number, required: true },
 Type: { type: String, required: true },
 Name: { type: String, required: true },
 Descrption: { type: String, required: false },

 },
 { timestamps: true },
 )

 module.exports = mongoose.model('products', Products)