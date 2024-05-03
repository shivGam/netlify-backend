const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const userModel = require("../models/user");
const SECRET_KEY = process.env.SECRET_KEY;

const signup = async (req,res) =>{
    //Extisting user? , Hash pass , create user , token generation
    const {username,email,password} = req.body;
    try{
        const alreayExist = await userModel.findOne({email : email});
        if(alreayExist)
        {
            return res.status(400).json({message:"User already Exist!"});
        }
        const hashPassword = await bcrypt.hash(password,10);
        const result = await userModel.create({
            username : username,
            email : email,
            password : hashPassword
        });
        const token = jwt.sign({email:result.email,id:result._id},SECRET_KEY);
        res.status(201).json({user:result,token:token});

    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"Something went wrong"});
    }

};

const signin = async(req,res) =>{
    const {email,password} = req.body;
    try{
        const alreayExist = await userModel.findOne({email : email});
        if(!alreayExist)
        {
            return res.status(404).json({message:"User Doesn't Exist!"});
        }
        const comparePassword = await bcrypt.compare(password,alreayExist.password);
        if(!comparePassword)
        {
            res.status(400).json({message:"Invalid"});
        }
        const token = jwt.sign({email:alreayExist.email,id:alreayExist._id},SECRET_KEY);
        res.status(200).json({user:alreayExist,token:token});

    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"Something went wrong"});
    }
};

module.exports = {signup,signin};