import { Express, Response, Request } from "express";
import db from '../../Database/Db';
module.exports = {
    readPOst: async (req: Request, res: Response) => {
        try {
            const getPost = await 'SELECT * FROM blog';
            db.query(getPost, (err, results) => {
                if (err) {
                    console.log(err);
                } else {
                    res.send({ message: "Blog list", results });
                };
            });
        } catch (error) {
            console.log(error);
        };
    },
    createdPost: async (req: Request, res: Response) => {
        try {
            const { title, description } = req.body;
            const newTodo = { title, description };
            const blog = await 'INSERT INTO blog SET ?'
            db.query(blog, newTodo, (err, results) => {
                if (err) {
                    console.log(err);
                } else {
                    res.send({ message: "Post Created", results });
                };
            });
        } catch (error) {
            console.log(error);
        };
    },
    updatePost: async (req: Request, res: Response) => {
        const updatedbyID = [req.body, req.params.id];
        const insert = await 'UPDATE blog SET ? where id=?'
        db.query(insert, updatedbyID, (error, results) => {
            if (error) {
                console.log('error')
            } else {
                return res.json({ message: "Blog Update", results });
            };
        });
    },
    deletePost: async (req: Request, res: Response) => {
        try {
            const deletebyID = req.params.id;
            const insert = 'DELETE FROM blog  where id=?'
            db.query(insert, deletebyID, (error, results) => {
                if (error) {
                    console.log('error')
                } else {
                    return res.json({ message: "Deleted post sucessfully", results });
                };
            });
        } catch (error) {
            console.log(error)
        };
    },
};