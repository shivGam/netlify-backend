const express = require("express");
app = express();
const quotes = require("./quotes.json")

app.get("/randquo",(req,res)=>{
    let index = Math.floor(Math.random()*quotes.length);
    let quote = quotes[index];
    res.status(200).json(quote);
});

let portNum = 1729;
app.listen(portNum,()=>{
    console.log(`Server started on http://localhost:${portNum}`);
});