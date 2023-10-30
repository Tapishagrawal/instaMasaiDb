const mongoose = require("mongoose");

const userShema = mongoose.Schema({
    name:String,
    email:String,
    gender:String,
    passwrod:String,
    age:Number,
    city:String,
    is_married:Boolean,
})

const UserModel = mongoose.model("user", userShema);

module.exports={
    UserModel
}