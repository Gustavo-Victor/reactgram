import { model, Schema, Types } from "mongoose";


const photoSchema = new Schema(
    {
        src: String, 
        title: String,
        comments: Array,
        likes: Array, 
        userId: Types.ObjectId, 
        userName: String,
    },
    {
        timestamps: true,
    }
); 

export const Photo = model("Photo", photoSchema); 