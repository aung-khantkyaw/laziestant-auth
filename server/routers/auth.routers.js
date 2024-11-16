import express from "express";

import {
  register,
  verifyEmail,
  resendVerificationEmail,
  login,
  forgotPassword,
  resetPassword,
  getUserData,
  logout,
  accountDelete,
  checkAuth,
  updateProfile,
  updatePassword,
  addLink,
  updateAvatar,
} from "../controllers/auth.controllers.js";
import { verifyToken } from "../middlewares/verifyToken.js";

import multer from "multer";
import path from "path";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/verify-email", verifyEmail);
authRouter.post("/resend-verification-email", resendVerificationEmail);
authRouter.post("/login", login);
authRouter.post("/forgot-password", forgotPassword);
authRouter.post("/reset-password/:token", resetPassword);
authRouter.post("/logout", logout);
authRouter.post("/accountDelete", accountDelete);
authRouter.post("/update-profile", updateProfile);
authRouter.post("/update-password", updatePassword);
authRouter.post("/add-link", addLink);

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads"); // Directory for uploaded files
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName); // Add timestamp for unique filenames
  },
});

const upload = multer({ storage });

authRouter.post("/update-avarter", upload.single("newImageUrl"), updateAvatar);

authRouter.get("/:username", getUserData);
authRouter.get("/check-auth", verifyToken, checkAuth);

export default authRouter;
