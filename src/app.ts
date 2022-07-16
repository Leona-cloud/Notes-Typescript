import express, {Request, Response} from 'express';
import  mongoose from 'mongoose';
import * as dotenv from 'dotenv';

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// connect to db
dotenv.config()
mongoose.connect(process.env.DB_CONNECT) 
.then(() => console.log("connected to db" + '' + `${process.env.DB_CONNECT}`))
.catch((err) => console.error("unable to connect", err));


const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`server is running on ${port}`)
})
