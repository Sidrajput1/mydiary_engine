import mongoose from "mongoose";

const postScheme = new mongoose.Schema(
    {
        title:{
            type: String,
            required: [true, "Title is required"],
        },
        slug:{
            type: String,
            required: [true, "Slug is required"],
            unique: true,
        },
        content:{
            type: String,
            required: [true, "Content is required"],
        },
        excerpt:{
            type: String,
            //required: [true, "Excerpt is required"],
        },
        author:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: [true, "Author is required"],
        },
        status:{
            type: String,
            enum: ["draft", "published"],
            default: "draft",
        },
        categories:[{type:String}],
        tags:[{type:String}],
        featuredImage:{
            type: String,
            //required: [true, "Featured image is required"],
        },
        
    },{ timestamps: true }
);

// text index for searching
postScheme.index({ title: "text", content: "text", excerpt: "text" });

const Post = mongoose.model("post", postScheme);
export default Post;