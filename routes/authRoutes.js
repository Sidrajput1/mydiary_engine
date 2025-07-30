import {Router} from 'express';
import { protect } from '../middlewares/auth.js';
import { authorize } from '../middlewares/auth.js';
import { deleteUser, getUser, listUsers, updateUser } from '../controllers/authController.js';

const router = Router();

router.use(protect);

router.route('/').get(authorize('admin'),listUsers);
router.route('/:id').get(getUser).put(updateUser).delete(deleteUser)

export default router;