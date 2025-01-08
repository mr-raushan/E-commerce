import express from "express";
import {
  login,
  logOut,
  purchase,
  Signup,
} from "../controllers/userController.js";
import { userMiddleware } from "../middleware/userMiddleware.js";
const router = express.Router();

router.post("/signup", Signup);
router.post("/login", login);
router.delete("/logout", logOut);
router.get("/purchase", userMiddleware, purchase);

export default router;
