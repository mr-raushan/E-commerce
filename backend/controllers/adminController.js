import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Admin } from "../models/admin.model.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide all fields",
      });
    }

    let userExist = await Admin.findOne({ email });
    if (userExist) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({
      name,
      email,
      password: hashedPassword,
    });

    await admin.save();
    return res.status(201).json({
      success: true,
      message: "Admin registered successfully",
      admin,
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
        message: "Please provide all fields",
      });
    }

    let admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "this email is not registered with us",
      });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    }

    const tokenData = {
      id: admin._id,
      name: admin.name,
      email: admin.email,
    };

    const token = jwt.sign(tokenData, process.env.ADMIN_SECRET_KEY, {
      expiresIn: "1h",
    });

    admin = {
      _id: admin._id,
      name: admin.name,
      email: admin.email,
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
        message: "Admin logged in successfully",
        admin,
        token,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to authenticate admin",
    });
  }
};

export const logOut = async (__, res) => {
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
