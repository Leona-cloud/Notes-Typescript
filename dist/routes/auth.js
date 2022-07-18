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
const login_1 = __importDefault(require("../schemas/login"));
const user_2 = __importDefault(require("../schemas/user"));
const lodash_1 = __importDefault(require("lodash"));
const AuthRouter = (0, express_1.Router)();
AuthRouter.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = (0, user_2.default)(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    let user = yield user_1.default.findOne({ email: req.body.email });
    if (user)
        return res.status(400).json({
            success: false,
            message: 'User already registered'
        });
    user = new user_1.default({
        email: req.body.email,
        password: req.body.password,
        userName: req.body.userName,
    });
    const salt = yield bcrypt_1.default.genSalt(10);
    user.password = yield bcrypt_1.default.hash(user.password, salt);
    try {
        const result = yield user.save();
        console.log(result);
        res.status(200).json({
            data: {
                user: (lodash_1.default.pick(user, ['_id', 'userName', 'email']))
            }
        });
    }
    catch (ex) {
        console.log(ex.message);
    }
}));
AuthRouter.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = (0, login_1.default)(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    try {
        let user = yield user_1.default.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
        }
        ;
        const validPassword = yield bcrypt_1.default.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            });
        }
        else {
            return res.status(200).json({
                success: true,
                message: "user logged in successfully",
                data: Object.assign({ user: (lodash_1.default.pick(user, ['_id', 'userName', 'email'])) }, user.generateAuthToken())
            });
        }
    }
    catch (ex) {
        console.log(ex.message);
    }
}));
exports.default = AuthRouter;
