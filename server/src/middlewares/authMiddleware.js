const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user to request
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({ message: 'User not found' });
      }

      return next(); // ✅ continue to the route
    } catch (err) {
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  // If no token provided at all
  return res.status(401).json({ message: 'Not authorized, no token' });
};

module.exports = { protect };
