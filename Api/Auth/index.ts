import express, { Router } from 'express';
const app = express.Router();
import Register from './Register';
import Login from './Login';

app.post('/register', Register);
app.post('/login', Login);

export default app;