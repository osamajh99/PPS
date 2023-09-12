const mongoose=require("mongoose")
const Schema=mongoose.Schema
const User=new Schema(
    {
        UserName:{type:String,required:true},
        Password:{type:String,required:true},
        Email:{type:String,required:true},
        PhoneNumber:{type:String,required:true},
        Address:{type:String,required:true},
        IsAdmin:{type:Boolean,required:true},
    },
    {timestamps:true},
)
module.exports = mongoose.model('Users', User)