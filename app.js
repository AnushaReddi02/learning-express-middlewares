const express = require('express');
const app = express();



app.use((req,res)=>{
    console.log("Hey....I am a MIDDLEWARE");
    res.send("Middleware finished");
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