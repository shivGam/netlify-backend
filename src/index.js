const express = require("express");
app = express();
const quotes = require("./quotes.json");
const mongoose = require("mongoose");
const userRouter = require("./routes/userRoute");
const noteRouter = require("./routes/noteRoute");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

app.use(express.json());
app.use("/user",userRouter);
app.use("/note",noteRouter);
app.use(cors());

const portNum = process.env.PORT || 5000 ;

mongoose.connect(process.env.CONNECTION_STR)
.then(()=>{
    app.listen(portNum,()=>{
        console.log(`Server started on http://localhost:${portNum}`);
    });
})
.catch((error)=>{
    console.log(error);
});


app.get("/",(req,res)=>{
    res.send("Hello!! from Notlify");
});

