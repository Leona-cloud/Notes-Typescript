"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const login = function loginValidation(user) {
    const logSchema = joi_1.default.object({
        email: joi_1.default.string().required().trim().lowercase().email(),
        password: joi_1.default.string().required().min(8).max(12),
    });
    return logSchema.validate(user);
};
exports.default = login;
