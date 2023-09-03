const mongoose = require('mongoose')
 const Schema = mongoose.Schema
 const Stock = new Schema(
 {
 Quantity: { type: Number, required: true },
 Address: { type: String, required: true },
 Product_Id: { type: Schema.Types.ObjectId, ref: 'products', required: true }, },
 { timestamps: true },
 )
 module.exports = mongoose.model('stock', Stock)