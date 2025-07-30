import Router from "express";
import { authorize } from "../middlewares/auth.js";
import { protect } from "../middlewares/auth.js";
import { listAllPostByAdmin, deletePostByAdmin, listAllCommentsByAdmin, deleteCommentByAdmin, listAllCategoriesByAdmin, deleteCategoryByAdmin, listAllTagsByAdmin, deleteTagByAdmin, listAllUsersByAdmin, deleteUserByAdmin } from "../controllers/adminController.js";
const router = Router();

router.use(protect, authorize('admin'));

router.get('/posts', listAllPostByAdmin);
router.delete('/posts/:id', deletePostByAdmin);

router.get('/comments', listAllCommentsByAdmin);
router.delete('/comments/:id', deleteCommentByAdmin);

router.get('/categories', listAllCategoriesByAdmin);
router.delete('/categories/:id', deleteCategoryByAdmin);

router.get('/tags', listAllTagsByAdmin);
router.delete('/tags/:id', deleteTagByAdmin);

router.get('/users', listAllUsersByAdmin);
router.delete('/users/:id', deleteUserByAdmin);
export default router;
