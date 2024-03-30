import { Router } from "express";
import { login, logout, register } from "../controllers/user.controller.js";
import verifyJwt from "../middlewares/auth.middleware.js";

const router = Router();

// POST - Register a new user
router.post("/register", register);

// POST - User login
router.post("/login", login);

// POST - User logout
router.post("/logout", verifyJwt, logout);

export default router;
