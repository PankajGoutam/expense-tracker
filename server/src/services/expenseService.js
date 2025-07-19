const Expense = require('../models/expenseModel');
const AuditLog = require('../models/auditLogModel');
const { Parser } = require('json2csv');

const createExpense = async ({ userId, amount, category, date, notes, receiptPath }) => {
  const expense = await Expense.create({
    user: userId,
    amount,
    category,
    date,
    notes,
    receipt: receiptPath || null
  });

  await AuditLog.create({
    user: userId,
    expense: expense._id,
    action: 'created',
    message: `Created expense of ₹${amount} for ${category}`
  });

  return expense;
};

const getUserExpenses = async (userId) => {
  return await Expense.find({ user: userId }).sort({ date: -1 });
};

const getAllExpenses = async () => {
  return await Expense.find().populate('user', 'name email').sort({ date: -1 });
};

const updateExpenseStatus = async (expenseId, status, adminId) => {
  const expense = await Expense.findById(expenseId);
  if (!expense) throw new Error('Expense not found');

  expense.status = status;
  await expense.save();

  await AuditLog.create({
    user: adminId,
    expense: expense._id,
    action: 'status_changed',
    message: `Marked expense as ${status}`
  });

  return expense;
};

const exportExpensesAsCSV = async () => {
  const expenses = await Expense.find().populate('user', 'name email');

  const data = expenses.map(exp => ({
    name: exp.user.name,
    email: exp.user.email,
    amount: exp.amount,
    category: exp.category,
    date: exp.date.toISOString().split('T')[0],
    status: exp.status
  }));

  const fields = ['name', 'email', 'amount', 'category', 'date', 'status'];
  const parser = new Parser({ fields });
  return parser.parse(data);
};

module.exports = {
  createExpense,
  getUserExpenses,
  getAllExpenses,
  updateExpenseStatus,
  exportExpensesAsCSV
};
