const Joi = require("joi");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Schema for validating user registration data
const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

// Schema for validating user login data
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

// Function to generate a JWT token for a given user ID
const generateToken = (getId) => {
  return jwt.sign({ getId }, "DEFAULT_SECRET_KEY", {
    expiresIn: 3 * 24 * 60 * 60,
  });
};

// Controller function to handle user registration
const registerUser = async (req, res, next) => {
  const { name, email, password } = await req.body;

  // Validate the incoming registration data
  const { error } = registerSchema.validate({ name, email, password });

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  try {
    // Check if the email is already registered
    const isUserEmailAlreadyExists = await User.findOne({ email });

    if (isUserEmailAlreadyExists) {
      return res.status(400).json({
        success: false,
        message: "User email already exists! Please try with different email",
      });
    } else {
      // Hash the user's password before saving
      const hashPassword = await bcrypt.hash(password, 12);

      // Create a new user with the hashed password
      const newlyCreatedUser = await User.create({
        name,
        email,
        password: hashPassword,
      });

      if (newlyCreatedUser) {
        // Generate a JWT token for the newly created user
        const token = generateToken(newlyCreatedUser?._id);

        // Set the token as a cookie in the response
        res.cookie("token", token, {
          withCredentials: true,
          httpOnly: false,
        });

        // Send success response with user data
        res.status(201).json({
          success: true,
          message: "User registration successful",
          userData: {
            name: newlyCreatedUser.name,
            email: newlyCreatedUser.email,
            _id: newlyCreatedUser._id,
          },
        });

        next();
      }
    }
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
};

// Controller function to handle user login
const loginUser = async (req, res, next) => {
  const { password, email } = await req.body;

  // Validate the incoming login data
  const { error } = loginSchema.validate({ email, password });

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  try {
    // Look up the user by email
    const getUser = await User.findOne({ email });

    if (!getUser) {
      return res.json({
        message: "Incorrect email",
        success: false,
      });
    }

    // Compare the provided password with the stored hashed password
    const checkAuth = await bcrypt.compare(password, getUser.password);

    if (!checkAuth) {
      return res.json({
        message: "Incorrect password",
        success: false,
      });
    }

    // Generate a JWT token for the authenticated user
    const token = generateToken(getUser?._id);
    // Set the token as a cookie in the response
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });

    // Send success response for login
    res.status(201).json({
      success: true,
      message: "User logged in",
    });

    next();
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
};

// Controller function to handle user logout
const logout = async (req, res) => {
  // Clear the authentication token cookie
  res.cookie("token", "", {
    withCredentials: true,
    httpOnly: false,
  });

  return res.status(200).json({
    success: true,
    message: "Logout successfully",
  });
};

module.exports = { registerUser, loginUser, logout };
