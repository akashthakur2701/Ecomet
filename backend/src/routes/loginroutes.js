import express from "express"
import { createUser } from "../controllers/User/createUser.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { userController } from "../controllers/User/userController.js";
import { getApiKeys } from "../controllers/User/ApiController.js";
import { logoutController, loginController } from "../controllers/User/userController.js";
import { validateCsrfToken } from "../middlewares/csrfMiddleware.js";

const router = express.Router();

// Apply CSRF validation to state-changing routes (POST, PUT, DELETE)
router.post("/register", validateCsrfToken, createUser);
router.post("/login", validateCsrfToken, loginController);
router.get("/getUserDetails", authMiddleware, userController);
router.get("/logout", authMiddleware, logoutController);
export default router;