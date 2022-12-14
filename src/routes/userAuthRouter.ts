import { Router } from 'express';

import isAuth from '../middlewares/authMiddleware';
import authController from '../controllers/authController/index';
import validatitonMiddleware from '../middlewares/validateMiddleware';
import validationSchemas from '../validateSchemas/index';

const router = Router();

router.post('/login', validatitonMiddleware(validationSchemas.singInSchema), authController.signIn);
router.post('/registration', validatitonMiddleware(validationSchemas.signUpSchema), authController.signUp);
router.get('/', isAuth, authController.auth);

export default router;
