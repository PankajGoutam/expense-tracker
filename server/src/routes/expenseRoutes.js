const express = require('express');
const router = express.Router();
const {
  addExpense,
  getExpenses,
  changeStatus,
  exportCSV
} = require('../controllers/expenseController');

const { protect } = require('../middlewares/authMiddleware');
const { allowRoles } = require('../middlewares/roleMiddleware');
const upload = require('../middlewares/uploadMiddleware');


router.use(protect);

router.get('/', getExpenses);
router.post('/', upload.single('receipt'), addExpense);
router.put('/:id/status', allowRoles('admin'), changeStatus);
router.get('/export/csv', allowRoles('admin'), exportCSV);

module.exports = router;
