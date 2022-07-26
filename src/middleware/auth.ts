import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import {Request, Response, NextFunction} from 'express';

dotenv.config();

function auth(req: Request, res: Response, next: NextFunction){
    const token = req.header('Bearer');
    if(!token){
        return res.status(400).json({
            success: false,
            message: "Access denied, user unauthorized"
        })
    };

    try {
        const decode = jwt.verify(token, process.env.jwtPrivateKey);
        req.user = decode;
        next();
    } catch (ex: any) {
        console.log(ex.message);
        return res.status(400).json({
            success: false,
            message: "Invalid token"
        });
    }
}