import {body} from 'express-validator';

const registerValidation = [
body('name', 'Name is required').notEmpty(),
body('email', 'Valid email is required').isEmail(),
body('password', 'Password must be 6+ chars').isLength({ min: 6 }),
];

const loginValidation = [
    body('email', 'Valid email is required').isEmail(),
body('password', 'Password is required').exists(),

]

export {
    registerValidation,
    loginValidation
}