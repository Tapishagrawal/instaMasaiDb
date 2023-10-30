const express = require('express');
const { connection } = require('./db');
const { userRouter } = require('./routes/users.route');
require("dotenv").config();

const app = express();
app.use(express.json());

app.use("/users", userRouter)

app.listen(process.env.port, async()=>{
    try {
        await connection;
        console.log("Connection established");
        console.log(`https://localhost:${process.env.port}`);
    } catch (error) {
        console.log("Error in connection database", error);
    }
})