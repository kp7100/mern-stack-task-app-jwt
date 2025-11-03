const jwt = require("jsonwebtoken");
const user = require("../models/user");

/**
 * Middleware to verify user authentication via JWT token.
 * Extracts token from cookies, verifies it, decodes user ID,
 * and fetches user info from the database.
 */
const userAuthVerification = async (req, res) => {
  // Extract token from cookies
  const token = req.cookies.token;
  console.log(token, "token");
  if (!token) {
    return res.json({
      success: false,
      message: "Token is not available or Invalid token",
    });
  }

  if (token) {
    try {
      // Verify and decode the JWT token using the secret key
      const decoded = jwt.verify(token, "DEFAULT_SECRET_KEY");

      console.log(decoded, "decoded");
      // Fetch the user information from the database using decoded user ID
      const userInfo = await user.findById(decoded.getId);

      console.log(userInfo, "userInfo");

      if (userInfo)
        return res.status(200).json({
          success: true,
          userInfo,
        });
    } catch (error) {
      // If verification fails or any error occurs, respond with 401 Unauthorized
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }
  }
};

module.exports = { userAuthVerification };
