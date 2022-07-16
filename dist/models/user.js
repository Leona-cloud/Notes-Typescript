"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = require("jsonwebtoken");
const joi_1 = __importDefault(require("joi"));
const userModel = new mongoose_1.default.Schema({
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
userModel.methods.generateAuthToken = function () {
    const token = (0, jsonwebtoken_1.sign)({ _id: this._id }, process.env.notes_jwtPrivateKey, { expiresIn: process.env.expiresAt });
    return token;
};
const User = mongoose_1.default.model('User', userModel);
function validateUser(user) {
    const schema = joi_1.default.object({
        userName: joi_1.default.string().required().min(6).max(12),
        email: joi_1.default.string().required().trim().lowercase().email(),
        password: joi_1.default.string().required().min(8).max(12),
        confirmPassword: joi_1.default.ref('password'),
    })
        .with('password', 'confirmPassword');
    return schema.validate(user);
}
;
function loginValidation(user) {
    const logSchema = joi_1.default.object({
        email: joi_1.default.string().required().trim().lowercase().email(),
        password: joi_1.default.string().required().min(8).max(12),
    });
    return logSchema.validate(user);
}
module.exports = {
    User,
    validateUser,
    loginValidation
};
