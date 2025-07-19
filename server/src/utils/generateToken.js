const jwt = require('jsonwebtoken');

const generateToken = (userId, role) => {
  return jwt.sign(
    {
      id: userId,
      role: role
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '7d' // You can change this as needed
    }
  );
};

module.exports = generateToken;
