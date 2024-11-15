import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import crypto from "crypto";
import {
  sendResetPasswordEmail,
  sendVerificationEmail,
} from "../utils/sendMail.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";

const prisma = new PrismaClient();

export const register = async (req, res) => {
  const { name, user_name, email, password } = req.body;

  const username = user_name.split(" ").join("").toLowerCase();
  const hashedPassword = await bcrypt.hash(password, 10);
  const verificationToken = Math.floor(
    100000 + Math.random() * 900000
  ).toString();
  const verificationTokenExpiresAt = new Date(Date.now() + 3 * 60 * 1000);

  try {
    if (!name || !user_name || !email || !password) {
      return res
        .status(400)
        .json({ success: "false", message: "Please fill in all fields" });
    }

    const usernameAlreadyExists = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    if (usernameAlreadyExists) {
      return res.status(400).json({
        success: "false",
        type: "username",
        message: "Username already exists",
      });
    }

    const emailAlreadyExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (emailAlreadyExists) {
      return res.status(400).json({
        success: "false",
        type: "email",
        message: "Email already exists",
      });
    }

    const user = await prisma.user.create({
      data: {
        name,
        username,
        email,
        password: hashedPassword,
        verificationToken,
        verificationTokenExpiresAt,
      },
    });

    const cookie = generateTokenAndSetCookie(res, user.id);
    sendVerificationEmail(user.name, user.email, user.verificationToken);
    res.status(201).json({
      success: "true",
      message: "User created successfully.",
      cookie: cookie,
      data: { ...user, password: null },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  const { pin } = req.body;

  try {
    const user = await prisma.user.findFirst({
      where: {
        isVerified: false,
        verificationToken: pin,
        verificationTokenExpiresAt: {
          gte: new Date(),
        },
      },
    });

    if (!user) {
      return res.status(400).json({
        success: "false",
        message: "Invalid or expired verification code",
      });
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        isVerified: true,
        verificationToken: null,
        verificationTokenExpiresAt: null,
      },
    });

    res.status(200).json({ success: "true", data: updatedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const resendVerificationEmail = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await prisma.user.findFirst({
      where: {
        email,
        isVerified: false,
      },
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: "false", message: "User not found" });
    }

    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    const verificationTokenExpiresAt = new Date(Date.now() + 3600000);

    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        verificationToken,
        verificationTokenExpiresAt,
      },
    });

    sendVerificationEmail(
      updatedUser.name,
      updatedUser.email,
      updatedUser.verificationToken
    );
    res
      .status(200)
      .json({ success: "true", message: "Resend OTP", data: updatedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { username_or_email, password } = req.body;

  try {
    if (!username_or_email || !password) {
      return res
        .status(400)
        .json({ success: "false", message: "Please fill in all fields" });
    }

    const user = await prisma.user.findFirst({
      where: {
        OR: [
          {
            email: username_or_email,
          },
          {
            username: username_or_email,
          },
        ],
      },
    });

    if (!user) {
      return res.status(400).json({
        success: "false",
        type: "username_or_email",
        message: "Wrong username or email. Please try again.",
      });
    }

    console.log("currentPassword:", password);
    console.log("user.password:", user.password);

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: "false",
        type: "password",
        message: "Wrong password. Please try again.",
      });
    }

    const cookie = generateTokenAndSetCookie(res, user.id);
    res.status(200).json({
      success: "true",
      message: "Login successful",
      cookie: cookie,
      data: { ...user, password: null },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: "false", message: "User not found" });
    }

    const resetPasswordToken = crypto.randomBytes(20).toString("hex");
    const resetPasswordExpiresAt = new Date(Date.now() + 3600000);

    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        resetPasswordToken,
        resetPasswordExpiresAt,
      },
    });

    sendResetPasswordEmail(
      updatedUser.name,
      updatedUser.email,
      updatedUser.resetPasswordToken
    );
    res
      .status(200)
      .json({ success: "true", message: "Reset password email sent" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  const { password, token } = req.body;
  console.log(password, token);
  try {
    const user = await prisma.user.findFirst({
      where: {
        resetPasswordToken: token,
        resetPasswordExpiresAt: {
          gte: new Date(),
        },
      },
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: "false", message: "Invalid or expired token" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashedPassword,
        resetPasswordToken: null,
        resetPasswordExpiresAt: null,
      },
    });

    res.status(200).json({
      success: "true",
      message: "Password updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserData = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await prisma.user.findFirst({
      where: {
        username,
      },
      include: {
        links: true,
      },
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: "false", message: "User not found" });
    }

    res
      .status(200)
      .json({ success: "true", data: { ...user, password: null } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: "true", message: "Logout successful" });
};

export const accountDelete = async (req, res) => {
  const { username } = req.body;
  console.log(username);
  try {
    const result = await prisma.user.delete({
      where: {
        username,
      },
    });

    if (!result) {
      return res
        .status(400)
        .json({ success: "false", message: "User not found" });
    }

    res.status(200).json({ success: "true", message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  const {
    name,
    username,
    email,
    bio,
    gender,
    dob,
    address,
    relationship,
    partner,
    annidate,
  } = req.body;
  try {
    const updatedUser = await prisma.user.update({
      where: {
        username: username,
      },
      data: {
        name: name,
        username: username,
        email: email,
        bio: bio,
        gender: gender,
        dob: new Date(dob), // Convert to Date object
        address: address,
        relationship: relationship,
        partner: partner,
        annidate: new Date(annidate), // Convert to Date objectsuccess: false
      },
    });

    if (!updatedUser) {
      return res
        .status(400)
        .json({ success: "false", message: "Failed to change.", data: null });
    }

    res.status(200).json({
      success: "true",
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.log("Error in updateProfile ", error);
    res.status(400).json({ success: "false", message: error.message });
  }
};

export const updatePassword = async (req, res) => {
  const { username, currentPassword, newPassword } = req.body;
  console.log(username, currentPassword, newPassword);

  try {
    const user = await prisma.user.findFirst({
      where: { username: username },
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: "false", message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(400).json({
        success: "false",
        type: "currentPassword",
        message: "Wrong current password. Please try again.",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { username: username },
      data: { password: hashedPassword },
    });

    res
      .status(200)
      .json({ success: "true", message: "Password updated successfully" });
  } catch (error) {
    console.log("Error in updatePassword", error);
    res.status(400).json({ success: "false", message: error.message });
  }
};

export const addLink = async (req, res) => {
  const { type, url, userId } = req.body;
  try {
    const userLinks = await prisma.userLink.create({
      data: {
        type,
        url,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    if (!userLinks) {
      return res
        .status(400)
        .json({ success: "false", message: "Failed to add link." });
    }

    res.status(200).json({
      success: "true",
      message: "Link added successfully",
      data: userLinks
    });

    
  } catch (error) {
    console.log("Error in addLink ", error);
    res.status(400).json({ success: "false", message: error.message });
  }
};

export const checkAuth = async (req, res) => {
  try {
    const userId = parseInt(req.userId, 10);
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    const isVerified = user.isVerified;
    if (!isVerified) {
      return res
        .status(400)
        .json({ success: "false", message: "User not verified" });
    }

    if (!user) {
      return res
        .status(400)
        .json({ success: "false", message: "User not found" });
    }

    res
      .status(200)
      .json({ success: "true", user: { ...user, password: undefined } });
  } catch (error) {
    console.log("Error in checkAuth ", error);
    res.status(400).json({ success: "false", message: error.message });
  }
};
