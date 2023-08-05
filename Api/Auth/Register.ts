import { Express, Response, Request } from "express";
import db from '../../Database/Db';
import bcrypt from 'bcrypt';
import IUser from '../../Api/Type/UserType'

const Register = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body as IUser;
        const hashedPassword: string = await bcrypt.hash(password, 10);

        const newUser: IUser = {
            username: username,
            email: email,
            password: hashedPassword,
            id: 0
        };

        const query = 'INSERT INTO register SET ?';
        db.query(query, newUser, (err, result) => {
            if (!username) {
                res.send({ message: "Please enter your username" })
                return;
            } else if (err) {
                // console.error('Error registering user:', err);
                res.status(500).json({ message: 'Already user exits' });
                return;
            }
            res.status(201).json({ message: 'User registered successfully', result });
        });
    } catch (error) {
        // console.error('Error registering user:', error);
        res.status(500).json({ message: `internal Server error",${error}` });
    }

};

export default Register;