
import Router from 'express';
import { createCategory, deleteCategory, getCategory, listCategories, updateCategory } from '../controllers/categoryController.js';
import { createCategoryValidation, updateCategoryValidation } from '../middlewares/categoryValidation.js';
import { protect, authorize } from '../middlewares/auth.js';
const router = Router();

router.get('/',listCategories);

router.get('/:id',getCategory);

// admin routes only

router.use(protect  , authorize('admin'));
router.post('/',createCategoryValidation,createCategory);

router.put('/:id',updateCategoryValidation,updateCategory);
router.delete('/:id',deleteCategory);

export default router; 