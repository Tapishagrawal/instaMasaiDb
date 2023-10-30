const express = require('express');
const { PostModel } = require('../models/posts.model');
const { auth } = require('../middlewares/auth.middleware');

const postRouter = express.Router();
postRouter.use(auth)

postRouter.post("/add", auth,  async (req,res)=>{
    try {
        const post = new PostModel(req.body);
        await post.save();
        res.status(200).send({"msg":"New post added successfully!"});
    } catch (error) {
        res.status(400).send({"error in creating post":error});
    }
})

postRouter.get("/", async (req,res)=>{
    try {
        const posts = await PostModel.find({userEmail:req.body.userEmail});
        res.status(200).send(posts)
    } catch (error) {
        console.log(error)
        res.status(400).send({"error in getting all post.":error})
    }
})


postRouter.patch("/update/:postID", async (req,res)=>{
    const {postID} = req.params;
    const post = await  PostModel.findOne({_id:postID});
    try {
        if(req.body.userID===post.userID){
            await PostModel.findByIdAndUpdate({_id:postID}, req.body);
            res.status(200).send({"msg":`The Post with ID ${postID} has been updated.`})
        }else{
            res.status(200).send({"msg":"Post is not availble."})
        }
    } catch (error) {
        res.status(400).send({"Error in updatinig post":error})
    }
})

postRouter.delete("/delete/:postID", async (req,res)=>{
    const {postID} = req.params;
    const post = await  PostModel.findOne({_id:postID});
    try {
        if(req.body.userID===post.userID){
            await PostModel.findByIdAndDelete({_id:postID});
            res.status(200).send({"msg":`The Post with ID ${postID} has been deleted.`})
        }else{
            res.status(200).send({"msg":"Post is not availble."})
        }
    } catch (error) {
        res.status(400).send({"Error in updatinig post":error})
    }
})

module.exports = {
    postRouter
}