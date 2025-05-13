const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middlewares/isAuthenticated.js");
const {
  userRegister,
  userLogin,
  logout,
  getProfile,
  verified,
} = require("../controllers/user.controller");
const upload = require("../middlewares/multer");

router.route("/register").post(upload.single("profilePicture"), userRegister);
router.route("/login").post(userLogin);
router.route("/profile").get(getProfile);
router.route("/verify").post(isAuthenticated, verified);
router.route("/logout").post(isAuthenticated, logout);

module.exports = router;
