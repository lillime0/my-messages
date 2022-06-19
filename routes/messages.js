import rateLimiter from "express-rate-limit";
const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: "Too many requests, please try again later"
});

import { Router } from "express";
const router = Router();
import {
  deleteMessage,
  createMessage,
  getAllMessages
} from "../controllers/messages.js";
import authMiddleware from "../middleware/auth.js";

router.get("/", authMiddleware, getAllMessages);
router.delete("/:id", authMiddleware, deleteMessage);
router.post("/", apiLimiter, createMessage);

export default router;
