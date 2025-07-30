import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post',
        required:true
    },
    authorName:{
        type:String,
        required:['true', 'Author name is required']
    },
    authorEmail:{
        type:String,
        required:['true', 'Author email is required'],
    },
    content:{
        type:String,
        required:['true', 'Comment Content is required'],   
    },
    status:{
        type:String,
        enum:['approved', 'pending', 'rejected'],
        default:'pending'
    }
},{timestamps:true});

const Comment = mongoose.model('Comment',commentSchema);

export default Comment;

