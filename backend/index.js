import express from "express";
import dotenv from "dotenv";
import db from "./utils/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";
import fileUpload from "express-fileupload";

//routes
import courseRoute from "./routes/courseRoute.js";
import userRoute from "./routes/userRoute.js";
import adminRoute from "./routes/adminRoute.js";

db();

const app = express();
dotenv.config({});

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOption = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOption));

//file upload
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

const PORT = process.env.PORT || 4000;

//api call
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/admin", adminRoute);

//cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
