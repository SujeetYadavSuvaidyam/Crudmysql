const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret';
import express, { Request, Response, NextFunction } from 'express'
interface CustomRequest extends Request {
    decoded?: string | undefined;
}
module.exports = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        let token: string | string[] | undefined = req.headers.token;
        // console.log(token)
        if (token) {
            let decoded = jwt.verify(token, JWT_SECRET);
            req.decoded = decoded;
            // console.log(req.decoded)
            next();
        } else {
            return res.status(401).json({ message: "Token not found Please enter token in header" });
        }
    } catch (error) {
        return res.status(500).json({ message: `internal Server error",${error}` });
    }
};