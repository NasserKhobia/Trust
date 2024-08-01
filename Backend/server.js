import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors'

const app = express();


//use app
dotenv.config();
app.use(cookieParser());
app.use(cors());

//routers



const port = process.env.PORT

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
    
});


