const noteModel = require("../models/note");

const createNote = async(req,res) => {
    const {title , desc} = req.body;
    const newNote = new noteModel({
        title : title,
        desc : desc,
        userId : req.userId
    });
    try{
        await newNote.save();
        res.status(201).json(newNote);

    }catch(error){
        console.log(error);
        res.status(500).json({message:"Something went wrong"});
    }
};

const getNote = async(req,res) => {
    try{
        const gotNote = await noteModel.find({userId : req.userId});
        res.status(200).json(gotNote);
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Something went wrong"});
    }
};

const deleteNote = async(req,res) => {
    const id = req.params.id;
    try{
        const result = await noteModel.findByIdAndDelete(id);
        res.status(202).json(result);
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Something Went Wrong"});
    }
    
};

const updateNote = async(req,res) => {
    const id = req.params.id;
    const {title,desc} = req.body;

    const newNote = {
        title:title,
        desc:desc,
        userId:req.userId
    };

    try{
        const result = await noteModel.findByIdAndUpdate(id,newNote,{new:true});
        res.status(200).json(result);
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Something Went Wrong"});
    }

};
module.exports = {
    getNote,
    createNote,
    deleteNote,
    updateNote
};