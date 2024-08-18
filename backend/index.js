import express, { response } from "express";
import mongoose from "mongoose";
import { PORT, mongoDBURL } from "./config.js";
import bookRoute from "./routes/bookRoutes.js";

const app=express();

//Middleware for parsing request body

app.use(express.json());

app.get('/',async(request,response)=>{
    console.log(request);
    return response.status(234).send('Welcome to MERN stack')
})

app.use('/books', bookRoute)

// Connect to MongoDB
 
mongoose.connect(mongoDBURL).then(()=>{
    console.log('App Connected to MongoDB successfully')
    app.listen(PORT,()=>{
        console.log(`App is listening to port ${PORT}`)
    })
}).catch((error)=>{
    console.log(error);
})