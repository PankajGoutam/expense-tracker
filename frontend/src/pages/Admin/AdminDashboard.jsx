import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getExpenses,
  updateExpenseStatus,
} from "../../redux/Slices/expenseSlice";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.expenses);

  const [filters, setFilters] = useState({
    employee: "",
    category: "",
    minAmount: "",
    maxAmount: "",
    startDate: "",
    endDate: "",
  });

  const [filteredExpenses, setFilteredExpenses] = useState([]);

  useEffect(() => {
    dispatch(getExpenses());
  }, [dispatch]);

  useEffect(() => {
    if (list?.length) {
      applyFilters();
    }
  }, [list]);

  const applyFilters = () => {
    let filtered = list?.filter((expense) => expense.status === "pending");

    if (filters.employee) {
      filtered = filtered.filter((e) =>
        e?.user?.name?.toLowerCase().includes(filters.employee.toLowerCase())
      );
    }

    if (filters.category) {
      filtered = filtered.filter((e) =>
        e.category.toLowerCase().includes(filters.category.toLowerCase())
      );
    }

    if (filters.minAmount) {
      filtered = filtered.filter((e) => e.amount >= Number(filters.minAmount));
    }

    if (filters.maxAmount) {
      filtered = filtered.filter((e) => e.amount <= Number(filters.maxAmount));
    }

    if (filters.startDate) {
      filtered = filtered.filter(
        (e) => new Date(e.date) >= new Date(filters.startDate)
      );
    }

    if (filters.endDate) {
      filtered = filtered.filter(
        (e) => new Date(e.date) <= new Date(filters.endDate)
      );
    }

    setFilteredExpenses(filtered);
  };

  const resetFilters = () => {
    setFilters({
      employee: "",
      category: "",
      minAmount: "",
      maxAmount: "",
      startDate: "",
      endDate: "",
    });
    setFilteredExpenses(list?.filter((list) => list.status === "pending"));
  };

  const handleStatusChange = (id, status) => {
    dispatch(updateExpenseStatus({ id, status })).then(() => {
      dispatch(getExpenses());
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4"></div>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 bg-gray-50 p-4 rounded shadow">
        <input
          type="text"
          placeholder="Filter by Employee"
          value={filters.employee}
          onChange={(e) => setFilters({ ...filters, employee: e.target.value })}
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Filter by Category"
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          className="p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Min Amount"
          value={filters.minAmount}
          onChange={(e) =>
            setFilters({ ...filters, minAmount: e.target.value })
          }
          className="p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Max Amount"
          value={filters.maxAmount}
          onChange={(e) =>
            setFilters({ ...filters, maxAmount: e.target.value })
          }
          className="p-2 border rounded"
        />
        <input
          type="date"
          value={filters.startDate}
          onChange={(e) =>
            setFilters({ ...filters, startDate: e.target.value })
          }
          className="p-2 border rounded"
        />
        <input
          type="date"
          value={filters.endDate}
          onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
          className="p-2 border rounded"
        />
        <button
          onClick={applyFilters}
          className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
        >
          Apply Filters
        </button>
        <button
          onClick={resetFilters}
          className="bg-gray-400 text-white px-4 py-2 rounded cursor-pointer"
        >
          Reset Filters
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : filteredExpenses?.length === 0 ? (
        <div className="flex items-center justify-center h-40">
          <p className="text-gray-500 text-center text-lg">
            No expenses listed.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow rounded">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-3">User</th>
                <th className="text-left p-3">Category</th>
                <th className="text-left p-3">Amount</th>
                <th className="text-left p-3">Notes</th>
                <th className="text-left p-3">Status</th>
                <th className="text-left p-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.map((expense) => (
                <tr key={expense._id} className="border-b">
                  <td className="p-3">{expense?.user?.name}</td>
                  <td className="p-3">{expense.category}</td>
                  <td className="p-3">₹{expense.amount}</td>
                  <td className="p-3">{expense.notes}</td>
                  <td className="p-3">
                    <select
                      className="border rounded p-1 capitalize cursor-pointer"
                      defaultValue=""
                      onChange={(e) =>
                        handleStatusChange(expense._id, e.target.value)
                      }
                    >
                      <option value="" disabled>
                        {expense.status}
                      </option>
                      <option value="approved">Approve</option>
                      <option value="rejected">Reject</option>
                    </select>
                  </td>
                  <td className="p-3">
                    {new Date(expense.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
