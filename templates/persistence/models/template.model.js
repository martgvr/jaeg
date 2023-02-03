import mongoose from "mongoose";

const templateSchema = new mongoose.Schema({
    ID: { type: String, required: true }
})

export const templateModel = mongoose.model('Template', templateSchema)