import {Router} from 'express';
import { addComment, approveComment, deleteComment, getComments, updateComment } from '../controllers/commentControlller.js';
import { createCommentValidation, updateCommentValidation } from '../middlewares/commentValidate.js';
import { authorize, protect } from '../middlewares/auth.js';

const router = Router({mergeParams:true});

router.get('/',getComments);

router.post('/:postId/comment-post',createCommentValidation,addComment);

// Protected routes

//router.use(protect,authorize('admin','author'));

router.put('/:id',updateCommentValidation,updateComment);
router.delete('/:id',deleteComment);
router.post('/:id/publisg',approveComment); // Assuming you have a publishComment function

export default router; 
