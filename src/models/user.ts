import mongoose from "mongoose";
import { sign } from 'jsonwebtoken';
import Joi, { number } from 'joi';

interface User extends Document {
    userName: string,
    email: string,
    password: string,
    confirmPassword: string,
    generateAuthToken: any
};



const userModel = new mongoose.Schema <User>({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: true
    }

});

userModel.methods.generateAuthToken  = function(){
    const token: any = sign({_id: this._id}, process.env.jwtPrivateKey, { expiresIn: process.env.expiresAt });
    return token;
};

const User = mongoose.model<User>('User', userModel);


export default User ;
