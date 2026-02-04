const express = require('express');
const app = express();



app.use((req,res,next)=>{
    console.log("Hey....I am a 1st MIDDLEWARE");
    // res.send("Middleware finished");
    next();
});

app.use((req,res,next)=>{
    console.log("Hey....I am a 2nd MIDDLEWARE");
    // res.send("Middleware finished");
    next();
});

app.get("/",(req,res)=>{
    res.send("Hey...I am ROOT");
});

app.get("/random",(req,res)=>{
    res.send("I am a RANDOM route");
});

app.listen(8080,()=>{
    console.log("Listening at port 8080");
});