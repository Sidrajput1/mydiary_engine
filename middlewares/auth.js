import jwt from "jsonwebtoken";
import User from "../models/user.js";

// protected routes

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    const err = new Error("Not authorized, no token");
    err.statusCode = 401;
    return next(err);
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-passwordHash");
    if (!req.user) {
      const err = new Error("User not found");
      err.statusCode = 404;
      return next(err);
    }
    next();
  } catch (error) {
    const err = new Error("Not authorized, token failed");
    err.statusCode = 401;
    return next(err);
  }
};

// role-based access
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      const err = new Error(`User role '${req.user.role}' not authorized`);
      err.statusCode = 403;
      return next(err);
    }
    next();
  };
};

export {
    protect,
    authorize
}
