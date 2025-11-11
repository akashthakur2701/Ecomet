import express from 'express'; 
import authMiddleware from '../middlewares/authMiddleware.js';
import {upload} from '../middlewares/multerMiddleware.js';
import {createProductController, getAdminProducts} from '../controllers/ProductControllers/createProductController.js';
import { deleteProductController } from '../controllers/ProductControllers/deleteProductController.js';
import { editProductController } from '../controllers/ProductControllers/createProductController.js';
import { validateCsrfToken } from '../middlewares/csrfMiddleware.js';

const router = express.Router();

// Apply CSRF validation to state-changing routes (POST, PUT, DELETE)
router.post('/createProduct', authMiddleware, validateCsrfToken, upload.single('image'), createProductController);
router.get('/admin-products-list', authMiddleware, getAdminProducts);
router.delete('/delete-product/:id', authMiddleware, validateCsrfToken, deleteProductController);
router.put('/update-product/:id', authMiddleware, validateCsrfToken, editProductController);
export default router;