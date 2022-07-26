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
const auth_1 = __importDefault(require("../middleware/auth"));
const lodash_1 = __importDefault(require("lodash"));
const NoteRouter = (0, express_1.Router)();
NoteRouter.get('/notes', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const notes = yield notes_1.default.find().sort('title');
    res.status(200).json(Object.assign({ success: true, message: "notes retrieved successfully" }, notes));
}));
NoteRouter.post('/create', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const notes = new notes_1.default(lodash_1.default.pick(req.body, ["title", "body", "author"]));
    const result = yield notes.save();
    res.status(200).json({
        success: true,
        message: "notes saved successfully",
        notes: result
    });
}));
NoteRouter.get('/:id', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const notes = yield notes_1.default.findById({ _id: req.params.id });
    if (notes) {
        return res.status(400).json({
            success: false,
            message: "note not found!!!"
        });
    }
    ;
    res.json({
        success: true,
        message: "notes fetched successfully",
        notes
    });
}));
NoteRouter.put(":/id", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let note = yield notes_1.default.findByIdAndUpdate({
        _id: req.params.id,
        title: req.body.title, body: req.body.body,
        new: true
    });
    if (!note) {
        return res.status(400).json({
            success: false,
            message: "note not found!!!"
        });
    }
    else {
        return res.json({
            success: true,
            message: "notes updated successfully",
            note
        });
    }
}));
NoteRouter.delete('/:id', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let note = yield notes_1.default.findByIdAndRemove({ _id: req.params.id });
    if (!note) {
        return res.status(400).json({
            success: false,
            message: "note not found!!!"
        });
    }
    else {
        return res.json({
            success: true,
            message: "note deleted successfully"
        });
    }
}));
exports.default = NoteRouter;
