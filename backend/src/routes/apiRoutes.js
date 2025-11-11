import express from 'express'
import authMiddleware from '../middlewares/authMiddleware.js';
import { getApiKeys, generateNewApiKey, deleteApiKey } from '../controllers/User/ApiController.js';
import { validateCsrfToken } from '../middlewares/csrfMiddleware.js';

const router = express.Router() 


router.get("/getApiKeys",authMiddleware, getApiKeys);
// Apply CSRF validation to state-changing routes
router.post('/generateNewApiKey',authMiddleware, validateCsrfToken, generateNewApiKey);
router.delete('/deleteApiKey/:apiKey',authMiddleware, validateCsrfToken, deleteApiKey);

export default router