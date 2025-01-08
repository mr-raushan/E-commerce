import express from "express";
import {
  buyCourse,
  courseDetails,
  createCourse,
  deleteCourse,
  getAllCourse,
  updateCourse,
} from "../controllers/courseController.js";
import { userMiddleware } from "../middleware/userMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";
const router = express.Router();

router.post("/create", adminMiddleware, createCourse);
router.put("/update/:courseId", adminMiddleware, updateCourse);
router.delete("/delete/:courseId", adminMiddleware, deleteCourse);
router.get("/get", getAllCourse);
router.get("/details/:courseId", courseDetails);

// buy courses route
router.post("/buy/:courseId", userMiddleware, buyCourse);

export default router;
