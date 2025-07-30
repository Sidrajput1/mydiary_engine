import {Router} from 'express';
import { createPost, deletePost, getPost, getPosts, publishPost, updatePost } from '../controllers/postController.js';
import { createPostValidation, getPostsValidation, updatePostValidation } from '../middlewares/postValidate.js';
import { authorize, protect } from '../middlewares/auth.js';
import upload from '../middlewares/multer.middleware.js';

const router = Router();


router.get('/',getPostsValidation, getPosts);
router.get('/:id',getPost)

router.use(protect);

router.post('/create-post',authorize('author','admin'),createPostValidation,upload.single('featuredImage'), createPost);

router.put('/:id',authorize('author','admin'),updatePostValidation,updatePost);

router.delete('/:id',authorize('author','admin'),deletePost);

router.post('/:id/publish',authorize('author','admin'),publishPost);
// protected route

export default router;  
