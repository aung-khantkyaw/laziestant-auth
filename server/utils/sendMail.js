import nodemailer from "nodemailer";
import {
  RESET_PASSWORD_EMAIL_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
} from "./mailTemplates.js";

export async function sendVerificationEmail(name, email, verificationToken) {
  try {
    const transporter = nodemailer.createTransport({
      service: "GMAIL",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const message = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `${name}, please verify your account`,
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ).replace("{username}", name),
      category: "Email Verification",
    };

    // Send the email
    await transporter.sendMail(message);

    // Return a success status
    return { success: true, message: "Verification email sent" };
  } catch (error) {
    console.error("Error occurred: " + error.message);
    // Return an error status
    return { success: false, message: "Failed to send verification email" };
  }
}

export async function sendResetPasswordEmail(name, email, resetPasswordToken) {
  const resetURL = `${process.env.CLIENT_URL}reset-password/${resetPasswordToken}`;
  try {
    const transporter = nodemailer.createTransport({
      service: "GMAIL",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const message = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset - BeFriend Social Network",
      html: RESET_PASSWORD_EMAIL_TEMPLATE.replace(
        "{resetURL}",
        resetURL
      ).replace("{username}", name),
      category: "Password Reset",
    };

    // Send the email
    await transporter.sendMail(message);

    // Return a success status
    return { success: true, message: "Reset password email sent" };
  } catch (error) {
    console.error("Error occurred: " + error.message);
    return { success: false, message: "Failed to send reset password email" };
  }
}
export function sendMail(message) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  transporter.sendMail(message, (error, info) => {
    if (error) {
      console.log("Error occurred. " + error.message);
      return process.exit(1);
    }
    console.log("Message sent: %s", info.messageId);
  });
}
