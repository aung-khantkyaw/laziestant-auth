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
} from "../controllers/auth.controllers.js";
import { verifyToken } from "../middlewares/verifyToken.js";

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

authRouter.get("/:username", getUserData);
authRouter.get("/check-auth", verifyToken, checkAuth);

export default authRouter;
