import mongoose, { Mongoose } from "mongoose";

export interface Notes extends mongoose.Document{
    title: string,
    body: string,
    author: string,
    isStarred: boolean
};

const notesSchema: mongoose.Schema<Notes> = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    isStarred: {
        type: Boolean,
        default: false
    }
});

const Note =  mongoose.model<Notes>('Note', notesSchema);

export default Note ;