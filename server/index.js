import express from "express";
import cors from "cors";
import authRouter from "./routers/auth.routers.js";

import { PrismaClient } from "@prisma/client";
import cookieParser from "cookie-parser";

const app = express();
const prisma = new PrismaClient();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.status(200).json({
    info: {
      author: "laziestant",
      email: "laziestant@gmail.com",
      api_name: "laziestant-auth API",
      description:
        "laziestant-auth API is an authentication API that allows users to register, login, verify email, reset password, and logout.",
    },
    endpoints: {
      "/auth/register": {
        method: "POST",
        description: "Register a new user",
        body: {
          name: "string",
          email: "string",
          password: "string",
        },
      },
      "/auth/verify-email": {
        method: "POST",
        description: "Verify user email",
        body: {
          token: "string",
        },
      },
      "/auth/resend-verification-email": {
        method: "POST",
        description: "Resend verification email",
        body: {
          email: "string",
        },
      },
      "/auth/login": {
        method: "POST",
        description: "Login an existing user",
        body: {
          email: "string",
          password: "string",
        },
      },
      "/auth/forgot-password": {
        method: "POST",
        description: "Send a password reset email",
        body: {
          email: "string",
        },
      },
      "/auth/reset-password": {
        method: "POST",
        description: "Reset user password",
        body: {
          password: "string",
          token: "string",
        },
      },
      "/auth/resend-reset-password-email": {
        method: "POST",
        description: "Resend reset password email",
        body: {
          email: "string",
        },
      },
      "/auth/logout": {
        method: "POST",
        description: "Logout user",
      },
    },
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

const gracefulShutdown = async () => {
  await prisma.$disconnect();
  server.close(() => {
    console.log("Server is closed");
    process.exit(0);
  });
};

process.on("SIGTERM", gracefulShutdown);
process.on("SIGINT", gracefulShutdown);
