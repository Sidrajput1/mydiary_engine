import Comment from "../models/comment.js";
import Post from "../models/post.js";
export const getCommentsByPostId = async (req,res,next)=>{

}


export const getComments = async (req,res,next) => {
    try {
        const {postId} = req.params;
        const comments = await Comment.find({post: postId,status:'approved'}).sort('-createdAt');
        res.json({
            success: true,
            count:comments.length,
            comments
        });
    } catch (error) {
        next(error);
    }
};

export const addComment = async(req,res,next) => {
    try {

        const {postId} = req.params;
        const postExist = await Post.exists({_id:postId});

        if(!postExist){
            const err = new Error("post not found");
            return next(err);
        }

        const {authorName, authorEmail, content} = req.body;
        const comment = await Comment.create({
            post:postId,
            authorName,
            authorEmail,
            content,
        });
        
        res.status(201).json({
            success: true,
            message: "Comment added successfully",
            comment
        })
        
    } catch (error) {
        next(error);
    }
}

//update comment admin only

export const updateComment  = async (req,res,next) => {
   try {
    const {id} = req.params;
    const updates = req.body;
    const comment = await Comment.findByIdAndUpdate(id,updateComment, {new: true, runValidators: true});
    if(!comment){
        const err = new Error("Comment not found");
        err.statusCode = 404;
        return next(err);
    }

    res.json({
        success: true,
        message: "Comment updated successfully",
        comment
    });
   } catch (error) {
    next(error);
   }
}

export const deleteComment = async (req,res,next) => {
        try {
            const {id} = req.params;
            const comment = await Comment.findByIdAndDelete(id);
            if(!comment){
                const err = new Error("Comment not found");
                err.statusCode = 404;
                return next(err);
            }
            res.json({
                success: true,
                message: "Comment deleted successfully"
            });
        } catch (error) {
            next(error);
        }
}


// approved comment admin only
export const approveComment = async (req,res,next) => {
    try {
        const {id} = req.params;
        const comment = await Comment.findByIdAndUpdate(id,{status:'approved'},{new:true});
        if(!comment){
            const err = new Error("Comment not found");
            err.statusCode = 404;
            return next(err);
        }
        res.json({
            success: true,
            message: "Comment approved successfully",
            comment
        });
    } catch (error) {
        next(error);
    }
}