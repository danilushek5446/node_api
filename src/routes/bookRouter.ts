import { Router } from 'express';

import validatitonMiddleware from '../middlewares/validateMiddleware';
import validationSchemas from '../validateSchemas/index';
import bookController from '../controllers/bookController/index';

const router = Router();

router.post('/', bookController.createBook);
router.get('/', validatitonMiddleware(validationSchemas.getAllSchema), bookController.getAllBooks);
router.get('/:id', validatitonMiddleware(validationSchemas.getOneSchema), bookController.getBookById);

export default router;
