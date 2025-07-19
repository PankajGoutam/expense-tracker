const { getAllLogs } = require('../services/logService');

const getLogs = async (req, res) => {
  try {
    const logs = await getAllLogs();
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getLogs };
