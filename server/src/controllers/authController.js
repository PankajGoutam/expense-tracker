const { registerUser, loginUser } = require('../services/authService');

const register = async (req, res) => {
  try {
    const data = await registerUser(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await loginUser(email, password);
    res.status(200).json(data);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

module.exports = { register, login };
