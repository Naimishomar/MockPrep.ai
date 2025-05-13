const express = require("express");
const router = express.Router();
const { gemini } = require("../controllers/gemini.controller");

router.route("/gemini").post(isAuthenticated, gemini);

module.exports = router;
