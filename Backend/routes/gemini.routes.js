const express = require("express");
const router = express.Router();
const { gemini } = require("../controllers/gemini.controller");

router.route("/gemini").post(gemini);

module.exports = router;
