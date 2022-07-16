"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = require("jsonwebtoken");
;
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
    const token = (0, jsonwebtoken_1.sign)({ _id: this._id }, process.env.jwtPrivateKey, { expiresIn: process.env.expiresAt });
    return token;
};
const User = mongoose_1.default.model('User', userModel);
exports.default = User;
