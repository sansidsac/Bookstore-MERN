import express, { response } from "express";
import mongoose from "mongoose";
import { PORT, mongoDBURL } from "./config.js";
import bookRoute from "./routes/bookRoutes.js";
import cors from 'cors';

const app=express();

//Middleware for parsing request body

app.use(express.json());

//Middleware for handling CORS Policy
//Option 1: Allow all origins with default of cors(*)
app.use(cors());
//Option 2: Allow custom origins
// app.use(cors({
//     origin:'http://localhost:3000',
//     methods:['GET','POST','PUT','DELETE'],
//     allowedHeaders:['Content-Type']
// }))

app.get('/',async(request,response)=>{
    console.log(request);
    return response.status(234).send('Welcome to MERN stack')
})

// Using routes

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