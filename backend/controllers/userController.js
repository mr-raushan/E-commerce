import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Purchase } from "../models/purchase.model.js";
import { Course } from "../models/course.model.js";
// import z from "zod";

export const Signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // const userSchema = z.Object({
    //   name: z.string().min(3, { message: "name should be four char long" }),
    //   email: z.string().email(),
    //   password: z
    //     .string()
    //     .min(6, { message: "password should be six char long" })
    //     .max(100),
    // });

    // const validateData = userSchema.safeParse(req.body);
    // if (!validateData) {
    //   return res.status(400).json({
    //     success: false,
    //     message: validateData.error.message,
    //   });
    // }

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to register user",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found with this email, please sign up",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    }

    //generate token
    const tokenData = {
      id: user._id,
      name: user.name,
      email: user.email,
    };

    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "24h",
    });

    user = {
      _id: user._id,
      name: user.name,
      email: user.email,
    };

    return res
      .status(201)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        success: true,
        message: `Welcome back ${user.name}`,
        user,
        token,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to login user",
    });
  }
};

export const logOut = async (req, res) => {
  try {
    res.status(201).cookie("token", " ", { maxAge: 0 }).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to log out user",
    });
  }
};

export const purchase = async (req, res) => {
  try {
    const userId = req.userId;
    const purchased = await Purchase.find({ userId });

    let purchasedCourseId = [];
    for (let i = 0; i < purchased.length; i++) {
      purchasedCourseId.push(purchased[i].courseId);
    }
    const courseData = await Course.find({
      _id: { $in: purchasedCourseId },
    });

    return res.status(200).json({
      success: true,
      purchased,
      courseData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to purchase course",
    });
  }
};

// export const updateProfile = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     const userId = req.user.id;
//     const user = await User.findByIdAndUpdate(
//       { _id: userId },
//       { $set: { name, email, password } },
//       { new: true }
//     );
//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "User profile updated successfully",
//       user,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to update user profile",
//     });
//   }
// };
