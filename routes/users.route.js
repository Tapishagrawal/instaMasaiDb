const express = require("express");
const { UserModel } = require("../models/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRouter = express.Router();


userRouter.post("/register", async (req, res) => {
    const { name, email, gender, password, age, city, is_married } = req.body;
    try {
        const existUser = await UserModel.findOne({ email })
        if (existUser?.email === email) {
            res.status(200).send({"msg":"This User already exist, use defferent email ID."})
        } else {
            bcrypt.hash(password, 5, async (err, hash) => {
                if (err) {
                    res.status(200).send({ "error in hashing": err })
                } else {
                    const user = new UserModel({
                        name,
                        email,
                        gender,
                        password: hash,
                        age,
                        city,
                        is_married
                    })
                    await user.save();
                    res.status(200).send({ "msg": "New user added successfully!", "new user": user })
                }
            });
        }
    } catch (error) {
        console.log(error)
        res.status(400).send({ "error in creating user": error });
    }
})

userRouter.post("/login", async (req,res)=>{
    const {email, password} = req.body;
    try {
        const user = await UserModel.findOne({email})
        bcrypt.compare(password, user.password, (err, result) => {
            if(result){
                const token = jwt.sign({userEmail:user.email, userID:user._id}, "masai")
                res.status(200).send({"msg":"Login SuccessFull!", "token":token});
            }else{
                res.status(200).send({"msg":"wrong credentials"});
            }
        });
    } catch (error) {
        res.status(400).send({"error":error})
    }
})


module.exports = {
    userRouter
}