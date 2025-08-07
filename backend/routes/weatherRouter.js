// backend/routes/weatherRouter.js
const express = require("express");
const router = express.Router();
const { getWeather } = require("../controllers/weatherController");
const { verifyToken, requireAuth } = require("../middleware/auth");

// Protected weather route - requires authentication
router.get("/", verifyToken, requireAuth, getWeather);

module.exports = router;