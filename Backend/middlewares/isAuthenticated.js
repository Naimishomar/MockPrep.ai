const jwt = require('jsonwebtoken');
const User = require('../models/user.model.js')
require('dotenv').config()

exports.isAuthenticated = async (req, res, next) => {
    try {
      const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: 'Access Denied: No token provided', success: false });
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId).select("-password");
      if (!user) {
        return res.status(401).json({ message: 'Invalid token: User not found', success: false });
      }
      req.user = user;
      console.log('TOKEN:', token);
      console.log('SECRET:', process.env.JWT_SECRET);

      next();
    } catch (err) {
      console.error(err);
      return res.status(403).json({ message: 'Unauthorized or Token Expired', success: false });
    }
  };