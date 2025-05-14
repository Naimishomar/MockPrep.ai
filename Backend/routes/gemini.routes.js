const express = require("express");
const router = express.Router();
const { gemini } = require("../controllers/gemini.controller");
const { isAuthenticated } = require("../middlewares/isAuthenticated.js");

router.route("/gemini").post(isAuthenticated, gemini);

module.exports = router;
