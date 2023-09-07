const mongoose = require("mongoose")
const Schema = mongoose.Schema
 
const Orders=new Schema({

    UserId:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
    OrderDate:{type:Date,required: true },
    ProductId:{ type: mongoose.Schema.Types.ObjectId, ref:'Products'},
    Quantity:{type:Number,required: true},
    Price:{type:Number,required: true}
},

{ timestamps: true },)
module.exports = mongoose.model('Orders', Orders)