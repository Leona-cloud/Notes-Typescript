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
const notes_1 = __importDefault(require("../models/notes"));
const lodash_1 = __importDefault(require("lodash"));
const NoteRouter = (0, express_1.Router)();
NoteRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const notes = yield notes_1.default.find().sort('title');
    res.status(200).json(Object.assign({ success: true, message: "notes retrieved successfully" }, notes));
}));
NoteRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const notes = new notes_1.default(lodash_1.default.pick(req.body, ["title", "body", "author"]));
    const result = yield notes.save();
    res.status(200).json({
        success: true,
        message: "notes saved successfully",
        notes
    });
}));
exports.default = NoteRouter;
