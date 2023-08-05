import express, { Request, Response, Router } from 'express';
const app: Router = express.Router()
const crud = require('../Blog/BlogCrud');



app.get('/', crud.readPOst);
app.post('/', crud.createdPost);
app.put('/:id', crud.updatePost);
app.delete('/:id', crud.deletePost);


module.exports = app;