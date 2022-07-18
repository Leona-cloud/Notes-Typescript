import mongoose from "mongoose";
import { sign } from 'jsonwebtoken';
import Joi, { number } from 'joi';

export interface User extends mongoose.Document {
    userName: string,
    email: string,
    password: string,
    generateAuthToken: () => { token: string; expires: number };
};



const userModel: mongoose.Schema<User> = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }

});

userModel.methods.generateAuthToken  = function(){
    const token: string = sign({_id: this._id}, process.env.jwtPrivateKey, { expiresIn: process.env.expiresAt });
    return {
        token: token
    };
};

const User = mongoose.model<User>('User', userModel);


export default User ;
