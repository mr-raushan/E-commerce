import express from "express";
import { login, logOut, signup } from "../controllers/adminController.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.delete("/logout", logOut);

export default router;
