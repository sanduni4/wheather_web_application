const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth");

// Route to verify token and get user info
router.get("/verify", verifyToken, (req, res) => {
  res.json({
    message: "Token is valid",
    user: {
      sub: req.user.sub,
      email: req.user.email,
      email_verified: req.user.email_verified,
      name: req.user.name,
      nickname: req.user.nickname,
      picture: req.user.picture
    }
  });
});

// Route to get user profile
router.get("/profile", verifyToken, (req, res) => {
  res.json({
    user: req.user
  });
});

module.exports = router;