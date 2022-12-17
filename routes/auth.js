import rateLimiter from "express-rate-limit";
const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  message: "Too many requests, please try again later"
});

import { Router } from "express";
const router = Router();
import { login, register, updateUser } from "../controllers/auth.js";
import authMiddleware from "../middleware/auth.js";

router.post("/login", apiLimiter, login);
// router.post("/register", apiLimiter, register);
router.patch("/user", authMiddleware, updateUser);

export default router;
