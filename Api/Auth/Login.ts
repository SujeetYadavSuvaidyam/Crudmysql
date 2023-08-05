import { Express, Response, Request } from "express";
import db from '../../Database/Db';
import bcrypt from 'bcrypt';
import IUser from '../../Api/Type/UserType';
import { RowDataPacket } from 'mysql2/typings/mysql/lib/protocol/packets/RowDataPacket';
import jwt from 'jsonwebtoken';
const JWT_SECRET = 'your_jwt_secret';

const Login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body as IUser;

        const query = 'SELECT * FROM register WHERE email = ?';
        db.query(query, email, async (err, results) => {
            if (err) {
                console.error('Error logging in:', err);
                res.status(500).json({ error: 'Error logging in' });
                return;
            }
            // console.log(results)
            if ((results as any[]).length === 0) {
                res.status(401).json({ error: 'Invalid credentials' });
                return;
            }

            const exitinguser: IUser | RowDataPacket = (results as RowDataPacket[])[0];
            const isPasswordValid: boolean = await bcrypt.compare(password, exitinguser.password);
            if (!isPasswordValid) {
                res.status(401).json({ error: 'Invalid password' });
                return;
            }

            // const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
            //     expiresIn: '1h', // Token expires in 1 hour
            // });

            const token = jwt.sign({ id: exitinguser.id, email: exitinguser.email }, JWT_SECRET)
            return res.status(200).json({ message: 'Login successfully', token });

        });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: `internal Server error",${error}` });
    }
};


export default Login;
