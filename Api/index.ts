import express, { Router } from 'express'
const app: Router = express.Router();

// const auth = require('./Auth')
import auth from './Auth';
app.use('/auth', auth);

// Token Verify
const verifyToken = require("./Auth/VerifyToken");
app.use(verifyToken);

const blog: any = require('./Blog/index')
app.use('/blog', blog)

module.exports = app;
