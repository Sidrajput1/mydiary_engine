import {Router} from "express";
import { getMe, login, logout, register } from "../controllers/authController.js";
import { loginValidation, registerValidation } from "../middlewares/validate.js";
import { protect } from "../middlewares/auth.js";           
//import { authorize } from "../middlewares/auth.js";



const router = Router();

router.post('/register', registerValidation,register);
router.post('/login',loginValidation,login);
router.get('/me', protect,getMe);
router.get('/logout',protect,logout)

export default router;