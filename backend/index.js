import express, { response } from "express";
import mongoose from "mongoose";
import { PORT, mongoDBURL } from "./config.js";
import { Book } from "./models/bookModel.js";

const app=express();

//Middleware for parsing request body

app.use(express.json());

app.get('/',async(request,response)=>{
    console.log(request);
    return response.status(234).send('Welcome to MERN stack')
})

// Route to Save a New Book

app.post('/books',async(request,response)=>{
    try {
        if(!request.body.title||!request.body.publishYear||!request.body.author){
            return response.status(400).send({message : 'Send all required fields'});
        }
        const newBook = {
            title : request.body.title,
            author : request.body.author,
            publishYear : request.body.publishYear
        };
        const book=await Book.create(newBook);
        return response.status(201).send(book);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({message : error.message})
    }
})

// Route to Get all books

app.get('/books', async(request,response)=>{
    try {
        const books=await Book.find({});
        return response.status(200).json({
            count:books.length,
            data:books
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message : error.message})
    }
});

// Route to Get one book by id

app.get(`/books/:id`, async(request,response)=>{
    try {
        const {id}=request.params;
        const book=await Book.findById(id);
        return response.status(200).json(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message : error.message})
    }
});

// Connect to MongoDB
 
mongoose.connect(mongoDBURL).then(()=>{
    console.log('App Connected to MongoDB successfully')
    app.listen(PORT,()=>{
        console.log(`App is listening to port ${PORT}`)
    })
}).catch((error)=>{
    console.log(error);
})