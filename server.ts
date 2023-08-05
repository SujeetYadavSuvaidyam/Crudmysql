import express, { NextFunction, Request, Response } from "express";
const app = express();
import db from './Database/Db';
import cors from 'cors';
import bodyParser from "body-parser";

app.use(cors())
app.use(bodyParser.json());

// db connect
db.connect();

// API Calling
app.use('/', require('./Api/index.ts'));

app.get('/get', (req: Request, res: Response) => {
    res.send('Hello World')
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});