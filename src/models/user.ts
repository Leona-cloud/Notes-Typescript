import mongoose from "mongoose";
import { sign } from 'jsonwebtoken';
import joi from 'joi';

interface User {
    userName: string,
    email: string,
    password: string,
    confirmPassword: string
}

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

userModel.methods.generateAuthToken = function(){
    const token = sign({_id: this._id}, process.env.notes_jwtPrivateKey, { expiresIn: process.env.expiresAt });
    return token;
};

const User = mongoose.model('User', userModel);

function validateUser(user: String){
    const schema = joi.object({
        userName: joi.string().required().min(6).max(12),
        email: joi.string().required().trim().lowercase().email(),
        password: joi.string().required().min(8).max(12),
        confirmPassword: joi.ref('password'),
    })
    .with('password', 'confirmPassword')

    return schema.validate(user)
};


function loginValidation(user: String ){
    const logSchema = joi.object({
        email: joi.string().required().trim().lowercase().email(),
        password: joi.string().required().min(8).max(12),
    })
    return logSchema.validate(user)
}

module.exports = {
    User,
    validateUser,
    loginValidation
}