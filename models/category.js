import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true, "Name is required"],
        unique: true,
        trim:true,
    },
    slug:{
        type:String,
        required: [true, "Slug is required"],
        unique: true,
    },
    description:{
        type:String,
    },

},{timestamps: true});

const Category = mongoose.model("category",categorySchema);
export default Category;