import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({});

// Middleware to verify JWT token
// export const authenticateToken = (req, res, next) => {
//   const token = req.cookies.token;

//   if (!token) {
//     return res.status(401).json({ message: 'Access denied. No token provided.' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.SECRET_KEY);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: 'Invalid token. Please login again.' });
//   }
// };

export const adminMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.ADMIN_SECRET_KEY);
    req.adminId = decoded.id;
    next();
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .json({ message: "Invalid token. Please login again." });
  }
};
