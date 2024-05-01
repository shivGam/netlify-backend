const express = require("express");
const userRoute = express.Router();

userRoute.post("/signup",(req,res)=>{
    res.send("signup");
});

userRoute.post("/signin",(req,res)=>{
    res.send("signin");
});

module.exports = userRoute;