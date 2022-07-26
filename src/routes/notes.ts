import { Request, Response, Router } from "express";
import Note from "../models/notes";
import Auth from "../middleware/auth"; 
import _  from 'lodash'

const NoteRouter: Router = Router();

NoteRouter.get('/notes', Auth, async(req: Request, res: Response) => {
    const notes = await Note.find().sort('title');
    res.status(200).json({
        success: true,
        message: "notes retrieved successfully",
        ...notes
    })
});

NoteRouter.post('/create', Auth, async(req: Request, res: Response) => {
    const notes = new Note(_.pick(req.body, [ "title", "body", "author"]));
    const result = await notes.save();
    res.status(200).json({
        success: true,
        message: "notes saved successfully",
        notes: result
    })
});

NoteRouter.get('/:id', Auth, async(req: Request, res: Response) => {
    const notes = await Note.findById({_id: req.params.id});
    if(notes){ 
        return res.status(400).json({
            success: false,
            message: "note not found!!!"
        })
    };
    res.json({
        success: true,
        message: "notes fetched successfully",
        notes
    })
});

NoteRouter.put(":/id", Auth, async (req: Request, res: Response) => {
    let note = await Note.findByIdAndUpdate({
        _id: req.params.id,
         title: req.body.title, body: req.body.body ,
         new: true
    });
    if(!note){
        return res.status(400).json({
            success: false,
            message: "note not found!!!"
        })
    }else{
        return res.json({
            success: true,
            message: "notes updated successfully",
            note
        })
    }
});


NoteRouter.delete('/:id', Auth, async (req: Request, res: Response) => {
    let note = await Note.findByIdAndRemove({_id: req.params.id});
    if (!note){
        return res.status(400).json({
            success: false,
            message: "note not found!!!"
        })
    }else{
        return res.json({
            success: true,
            message: "note deleted successfully"
        })
    }
});

export default NoteRouter;