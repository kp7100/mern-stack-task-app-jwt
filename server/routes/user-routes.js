/**
 * This file defines user-related API routes for registration, login,
 * authentication verification, and logout functionalities.
 */

const express = require("express");
const userRouter = express.Router();

const {
  registerUser,
  loginUser,
  logout,
} = require("../controllers/user-controller");
const { userAuthVerification } = require("../middleware/auth-middlware");

// Route for user registration
userRouter.post("/register", registerUser);

// Route for user login
userRouter.post("/login", loginUser);

// Route to verify user authentication
userRouter.post("/auth", userAuthVerification);

// Route for user logout
userRouter.post("/logout", logout);

module.exports = userRouter;
