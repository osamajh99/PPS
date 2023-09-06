const mongoose = require("mongoose")
const Schema = mongoose.Schema
 
const Orders=new Schema({

    UserId:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
    OrderDate:{type:Date,required: true },
    products:[{ type: mongoose.Schema.Types.ObjectId, ref:'Products'}],
    quantity:{type:Number,required: true},
    Price:{type:Number,required: true}
},

{ timestamps: true },)
module.exports = mongoose.model('Orders', Orders)