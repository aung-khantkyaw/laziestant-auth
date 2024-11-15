import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    //secure: process.env.NODE_ENV === "production",
    //sameSite: "strict",//

    secure: false,
    sameSite: "none",
  });
  return token;
};
