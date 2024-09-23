import express from "express";
import mongoose from "mongoose";
import { PORT, mongoDBURL } from "./config.js";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors"

const app = express();

// middleware for parsing request body
app.use(express.json());
//middleware for handling cors policy
// option 1: Allow all origins with default of cors(*)
app.use(cors());
// option 2: Allow custom origins
// app.use(cors({
//     origin: 'your address',
//     method: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type']
// }));

app.get('/', (req, res) => {
    console.log(req);
    return res.status(200).send('Welcome to MERN Stack Tutorial');
})

app.use('/books', booksRoute)


mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`app is listening to port: ${PORT}`)
        })
    })
    .catch((error) => {
        console.log(error + "something");
    });