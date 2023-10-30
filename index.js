const express = require('express');
const { connection } = require('./db');
const { userRouter } = require('./routes/users.route');
const { postRouter } = require('./routes/posts.route');
const cors = require("cors")
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors())

app.use("/users", userRouter)
app.use("/posts", postRouter)

app.listen(process.env.port, async()=>{
    try {
        await connection;
        console.log("Connection established");
        console.log(`http://localhost:${process.env.port}`);
    } catch (error) {
        console.log("Error in connection database", error);
    }
})