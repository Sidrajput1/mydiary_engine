import Router from 'express';
import { createTag, deleteTag, getTag, listTag, updateTag } from '../controllers/tagController.js';
import { protect, authorize } from '../middlewares/auth.js';
import { createTagValidation, updateTagValidation } from '../middlewares/tagValidation.js';
const router = Router();

router.get('/',listTag);

router.get('/:id',getTag);

router.use(protect, authorize('admin'));

router.post('/',createTagValidation,createTag);

router.put('/:id',updateTagValidation,updateTag);

router.delete('/:id',deleteTag);

export default router;