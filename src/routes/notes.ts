import { Request, Response, Router } from "express";
import Note from "../models/notes";
import Auth from "../middleware/auth"; 
import _  from 'lodash'

const NoteRouter: Router = Router();

NoteRouter.get('/', async(req, res) => {
    const notes = await Note.find().sort('title');
    res.status(200).json({
        success: true,
        message: "notes retrieved successfully",
        ...notes
    })
});

NoteRouter.post('/', async(req, res) => {
    const notes = new Note(_.pick(req.body, [ "title", "body", "author"]));
    const result = await notes.save();
    res.status(200).json({
        success: true,
        message: "notes saved successfully",
        notes
    })
});


export default NoteRouter;