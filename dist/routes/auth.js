"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = __importDefault(require("../models/user"));
const user_2 = __importDefault(require("../schemas/user"));
const AuthRouter = (0, express_1.Router)();
AuthRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = (0, user_2.default)(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    let user = yield user_1.default.findOne({ email: req.body.email });
    if (user)
        return res.status(400).send('User already registered');
    user = new user_1.default({
        email: req.body.email,
        password: req.body.password,
        userName: req.body.userName,
        confirmPassword: req.body.confirmPassword
    });
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    if (password !== confirmPassword) {
        return res.send("Passwords do not match");
    }
    ;
    const salt = yield bcrypt_1.default.genSalt(10);
    user.password = yield bcrypt_1.default.hash(user.password, salt);
    user.confirmPassword = yield bcrypt_1.default.hash(user.confirmPassword, salt);
    try {
        const result = yield user.save();
        console.log(result);
        const token = user.generateAuthToken();
        res.header('x-auth-token', token).json({
            data: user,
            token: token
        });
    }
    catch (ex) {
        console.log(ex.message);
    }
}));
exports.default = AuthRouter;
