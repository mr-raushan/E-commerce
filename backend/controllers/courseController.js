import { Course } from "../models/course.model.js";
import { v2 as cloudinary } from "cloudinary";
import { Purchase } from "../models/purchase.model.js";

export const createCourse = async (req, res) => {
  try {
    const adminId = req.adminId;
    const { title, description, price } = req.body;

    if (!title || !description || !price) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }
    const { image } = req.files;

    const allowedFormat = ["image/png", "image/jpeg"];
    if (!allowedFormat.includes(image.mimetype)) {
      return res.status(400).json({
        success: false,
        message: "Invalid file format. Only PNG and JPEG are allowed",
      });
    }

    //cloudinary
    const cloudResponse = await cloudinary.uploader.upload(image.tempFilePath);
    if (!cloudResponse || cloudResponse.error) {
      return res.status(400).json({
        success: false,
        message: "Failed to upload image to cloudinary",
        error: cloudResponse.error,
      });
    }
    const courseData = {
      title,
      description,
      price,
      image: {
        public_id: cloudResponse.public_id,
        url: cloudResponse.secure_url,
      },
      creatorId: adminId,
    };

    const course = await Course.create(courseData);
    res.status(201).json({
      success: true,
      message: "Course created successfully",
      course,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to create course",
    });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const adminId = req.adminId;
    const { courseId } = req.params;
    const { title, description, price, image } = req.body;
    const course = await Course.findByIdAndUpdate(
      {
        _id: courseId,
        creatorId: adminId,
      },
      {
        title,
        description,
        price,
        image: {
          public_id: image?.public_id,
          url: image?.url,
        },
      }
    );

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.status(201).json({
      success: true,
      message: "Course updated successfully",
      course,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to update course",
    });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const adminId = req.adminId;
    const { courseId } = req.params;
    const course = await Course.findByIdAndDelete({
      _id: courseId,
      creatorId: adminId,
    });
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete course",
    });
  }
};

export const getAllCourse = async (req, res) => {
  try {
    const course = await Course.find({});
    res.status(200).json({
      success: true,
      message: "All courses fetched successfully",
      course,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to get all courses",
    });
  }
};

export const courseDetails = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Course details fetched successfully",
      course,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to get course details",
    });
  }
};

export const buyCourse = async (req, res) => {
  try {
    const { userId } = req;
    const { courseId } = req.params;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    const existingPurchase = await Purchase.findOne({ userId, courseId });
    if (existingPurchase) {
      return res.status(400).json({
        success: false,
        message: "User has already purchased this course",
      });
    }

    const purchase = await Purchase.create({ userId, courseId });
    await purchase.save();

    return res.status(201).json({
      success: true,
      message: "Course purchased successfully",
      purchase,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to buy course",
    });
  }
};
