"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const validate = function validateUser(user) {
    const schema = joi_1.default.object({
        userName: joi_1.default.string().required().min(6).max(12),
        email: joi_1.default.string().required().trim().lowercase().email(),
        password: joi_1.default.string().required().min(8).max(12),
        confirmPassword: joi_1.default.ref('password'),
    })
        .with('password', 'confirmPassword');
    return schema.validate(user);
};
exports.default = validate;
