const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();


// Connect to MongoDB
connectDB();

// Import routes
const authRoutes = require('./routes/authRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const logRoutes = require('./routes/logRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // To parse JSON request bodies

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/logs', logRoutes);

// Health check
app.get('/', (req, res) => {
  res.send('🚀 Expense Tracker API is up and running!');
});

module.exports = app;
