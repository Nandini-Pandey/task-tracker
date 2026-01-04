import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  let token;

  // 1. Check for Bearer token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // 2. Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 3. Attach user to request
      const user = await User.findById(decoded.userId).select("-password");
      if (!user) {
        return res.status(401).json({ message: "User no longer exists" });
      }

      req.user = user;
      return next();
    } catch (error) {
      return res.status(401).json({
        message: "Not authorized, token invalid or expired",
      });
    }
  }

  // 4. No token provided
  return res.status(401).json({
    message: "Not authorized, no token provided",
  });
};
