const mongoose = require("mongoose");

const postShema = mongoose.Schema({
    title:String,
    body:String,
    device:String,
    no_of_comments:Number,
    userID:String,
    userEmail:String
},{versionKey:false})

const PostModel = mongoose.model("post", postShema);

module.exports={
    PostModel
}