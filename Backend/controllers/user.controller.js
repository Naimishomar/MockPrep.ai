const User = require("../models/user.model.js");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { customAlphabet } = require("nanoid");
const { sendMail } = require("../controllers/verification.controller.js");
const History = require("../models/history.model.js");

const otpStore = {};
exports.userRegister = async (req, res) => {
  try {
    const {
      name,
      username,
      email,
      contactNumber,
      password,
      profilePicture,
      otp,
      step,
    } = req.body;
    if (step === "send") {
      if (!name || !email) {
        return res
          .status(400)
          .json({ message: "Name and Email required", success: false });
      }
      const alreadyExists = await User.findOne({
        $or: [{ email }, { username }, { contactNumber }],
      });
      if (alreadyExists) {
        return res
          .status(409)
          .json({ message: "User already exists", success: false });
      }
      const nanoid = customAlphabet("0123456789", 6);
      const generatedOtp = nanoid();
      otpStore[email] = generatedOtp;
      await sendMail(email, generatedOtp, name);
      return res
        .status(200)
        .json({ message: "OTP sent to your email", success: true });
    }

    // Step 2: Verify OTP and Register
    if (step === "register") {
      if (
        !name ||
        !username ||
        !email ||
        !contactNumber ||
        !password ||
        !profilePicture ||
        !otp
      ) {
        return res
          .status(400)
          .json({ message: "All fields are required", success: false });
      }

      if (otp !== otpStore[email]) {
        return res.status(401).json({ message: "Invalid OTP", success: false });
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = await User.create({
        name,
        username,
        email,
        contactNumber,
        password: hashedPassword,
        profilePicture,
      });
      delete otpStore[email];
      return res.status(200).json({
        message: `Welcome ${user.name}, account created!`,
        success: true,
        user,
      });
    }
    return res.status(400).json({ message: "Invalid step", success: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

exports.verified = async (req, res) => {
  console.log("verified");
  res.status(200).json({ success: true, message: "Token verified" });
};

exports.userLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(401)
        .json({ message: "All fields are required", success: false });
    } else {
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(401).json({
          message: "No account found with this username",
          success: false,
        });
      }
      isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return res
          .status(401)
          .json({ message: "Incorrect password", success: false });
      }
      // const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '5d'});
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "5d",
      });
      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 5 * 24 * 60 * 60 * 1000,
      });
      const userDetails = {
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        contactNumber: user.contactNumber,
      };
      return res.status(200).json({
        message: `Logged in successfully, hello ${user.name}`,
        success: true,
        token,
        userDetails,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.getProfile = async (req, res) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided", success: false });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId)
      .select("-password")
      .populate("history", "name username email"); // Populate history (if used as linked users)
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }
    return res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        contactNumber: user.contactNumber,
        profilePicture: user.profilePicture,
        history: user.history,
        subscription: user.subscription,
        age: user.age,
        college: user.college,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

exports.history = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      res
        .status(500)
        .json({ message: "No search details found", success: false });
    } else {
      const history = await History.create({ title: title, user: userId });
      const user = await User.findById({ _id: userId });
      if (!user) {
        res.status(500).json({ message: "User not found", success: false });
      }
      const updatedUser = await User.updateOne({
        $push: { history: history._id },
      });
      await updatedUser.populate("history");
      res.status(200).json({
        message: "History has been updated",
        success: true,
        userWithHistory,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.logout = async (req, res) => {
  try {
    return res
      .cookie("cookie", "", { maxAge: 0 })
      .json({ message: `Logged out successfully`, success: true });
  } catch (error) {
    console.log(error);
  }
};
