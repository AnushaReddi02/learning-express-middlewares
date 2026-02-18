const express = require('express');
const app = express();
const CustomErrorClass = require("./CustomErrorClass");



// app.use((req,res,next)=>{
//     console.log("Hey....I am a 1st MIDDLEWARE");
//     // res.send("Middleware finished");
//     next();
// });

// app.use((req,res,next)=>{
//     console.log("Hey....I am a 2nd MIDDLEWARE");
//     // res.send("Middleware finished");
//     next();
// });


//Logger M/W - Morgan is built-in M/W it doea this same work.
app.use((req,res,next)=>{
    req.time = new Date(Date.now()).toString();
    console.log(req.host,req.method,req.path,req.time);
    next();
});

//middleware to validate token query parameter and protect /api endpoint from unauthorized access
// app.use("/api",(req,res,next)=>{
//     let {token} = req.query;
//     if(token==="USERALLOWED")
//         next();
//     res.send("!!! ACESS DENIED !!!");
// });

//
const accessToken = ("/api",(req,res,next)=>{
    let {token} = req.query;
    if(token==="USERALLOWED"){
         return next();
    }
    // res.send("!!! ACESS DENIED !!!");
    throw new CustomErrorClass(401,"!!! ACESS DENIED !!!"); //calling our custom error handler class;
});

app.get("/api",accessToken,(req,res)=>{
    res.send("USER IS VERIFIED & CAN ACESS DATA");
});
app.use("/random",(req,res,next)=>{
    console.log("I am only for RANDOM");
    next();
})

app.get("/",(req,res)=>{
    res.send("Hey...I am ROOT");
});

app.get("/random",(req,res)=>{
    res.send("I am a RANDOM route");
});

app.get("/admin",(req,res)=>{
    let {token} = req.query;
    if(token==="Admin"){
        res.send("WELCOME TO ADMIN PAGE....!");
    }
    else{
        throw new CustomErrorClass(403,"!!! Only Admins Can Access This Page !!!");
    }
});

app.get("/err",(req,res)=>{
    abcd = abcd;
});


//CUSTOM ERROR HANDLER - 1
app.use((err,req,res,next)=>{
    let {status=500,message="Some Error Occured"} = err; //Extracting values of status and message from err object through destructuring.
    console.log("_____________ERROR1___________");
    //next(err) //Passing control to next error handler if exists or to the Express default error handler

    // res.send(err);
    res.status(status).send(message);
});


//CUSTOM ERROR HANDLER - 2
// app.use((err,req,res,next)=>{
//     console.log("_____________ERROR1___________");
//     next(err); //Passing control to next error handler if exists or to the Express default error handler
// })

app.listen(8080,()=>{
    console.log("Listening at port 8080");
});