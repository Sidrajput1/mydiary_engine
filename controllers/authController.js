import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

// User register Post request send via /api/v1/auth/register
// const register = async (req, res, next) => {
//   try {
//     const { name, email, password } = req.body;
//     const existing = await User.findOne({ email });
//     if (existing) {
//       const err = new Error(
//         "Email already in use. Please Provide another email id"
//       );
//       err.statusCode = 400;
//       return next(err);
//     }
//     const salt = await bcrypt.genSalt(10);
//     const hash = await bcrypt.hash(password, salt);
//     const user = await User.create({ name, email, passwordHash: hash });

//     const token = jwt.sign({ id: User._id }, process.env.JWT_SECRET, {
//       expiresIn: "1h",
//     });

//     res.status(201).json({ success: true, token });
//   } catch (error) {
//     next(error);
//   }
// };
const register = async (req, res, next) => {
  try {
    // Destructure role from the request. It might be undefined.
    const { name, email, password, role } = req.body;
    
    const existing = await User.findOne({ email });
    if (existing) {
      const err = new Error("Email already in use. Please provide another email id");
      err.statusCode = 400;
      return next(err);
    }
    
    // Generate the password hash.
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    
    // Optionally, restrict the roles that can be set directly by registration.
    // For instance, you might not allow setting 'admin' directly.
    const allowedRoles = ['reader', 'author']; // adjust these as needed
    const assignedRole = role && allowedRoles.includes(role) ? role : 'reader';
    
    // Create the user with the provided or default role.
    const user = await User.create({
      name,
      email,
      passwordHash: hash,
      role: assignedRole
    });
    
    // Note: Be sure to sign the token using the new user's _id, not the entire model.
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    
    res.status(201).json({ success: true, token });
  } catch (error) {
    next(error);
  }
};


const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      const err = new Error("Invalid credentials");
      err.statusCode = 401;
      return next(err);
    }
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      const err = new Error("Incorrect Password");
      err.statusCode = 401;
      return next(err);
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ success: true, token });
  } catch (error) {
    next(error);
  }
};

// get Current Profile
const getMe = (req, res) => {
  res.json({
    success: true,
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
    },
  });
};

// Logout User

const logout = (req, res) => {
  // res.cookie('token', '', {
  //     expires: new Date(0),
  //     httpOnly: true,
  //     secure: process.env.NODE_ENV === 'production',
  //     sameSite: 'strict'
  // });
  res.json({ success: true, message: "Logged out successfully" });
};

// @desc Get user by ID
const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (req.user._id.toString() !== id && req.user.role !== "admin") {
      const err = new Error("Not authorized");
      err.statusCode = 403;
      return next(err);
    }
    const user = await User.findById(id).select("-passwordHash");
    if (!user) {
      const err = new Error("User not found");
      err.statusCode = 404;
      return next(err);
    }
    res.json({ success: true, user });
  } catch (err) {
    next(err);
  }
};

const listUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-passwordHash");
    res.json({ success: true, users });
  } catch (error) {
    next(error);
  }
};

// @desc Update user
const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (req.user._id.toString() !== id && req.user.role !== "admin") {
      const err = new Error("Not authorized");
      err.statusCode = 403;
      return next(err);
    }
    const updates = (({ name, email, role }) => ({ name, email, role }))(
      req.body
    );
    const user = await User.findByIdAndUpdate(id, updates, {
      new: true,
    }).select("-passwordHash");
    if (!user) {
      const err = new Error("User not found");
      err.statusCode = 404;
      return next(err);
    }
    res.json({ success: true, user });
  } catch (err) {
    next(err);
  }
};

// @desc Delete user
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (req.user._id.toString() !== id && req.user.role !== "admin") {
      const err = new Error("Not authorized");
      err.statusCode = 403;
      return next(err);
    }
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      const err = new Error("User not found");
      err.statusCode = 404;
      return next(err);
    }
    res.json({ success: true, message: "User removed" });
  } catch (err) {
    next(err);
  }
};

export {
  register,
  login,
  getMe,
  logout,
  getUser,
  updateUser,
  deleteUser,
  listUsers,
};
