const {
  createExpense,
  getUserExpenses,
  getAllExpenses,
  updateExpenseStatus,
  exportExpensesAsCSV
} = require('../services/expenseService');

const addExpense = async (req, res) => {
  try {
    const receiptPath = req.file ? req.file.path : null;

    const data = await createExpense({
      userId: req.user.id,
      ...req.body,
      receiptPath
    });

    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getExpenses = async (req, res) => {
  try {
    if (req.user.role === 'admin') {
      const data = await getAllExpenses();
      return res.json(data);
    } else {
      const data = await getUserExpenses(req.user.id);
      return res.json(data);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const changeStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const data = await updateExpenseStatus(id, status, req.user.id);
    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const exportCSV = async (req, res) => {
  try {
    const csv = await exportExpensesAsCSV();
    res.header('Content-Type', 'text/csv');
    res.attachment('expenses.csv');
    res.send(csv);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  addExpense,
  getExpenses,
  changeStatus,
  exportCSV
};
