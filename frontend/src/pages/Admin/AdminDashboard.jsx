import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getExpenses,
  updateExpenseStatus,
} from "../../redux/Slices/expenseSlice";
import ReceiptModal from "../../utils/ReceiptModal";
import { openModal } from "../../redux/Slices/uiSlice";
import { downloadCSV } from "../../redux/Slices/expenseSlice";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.expenses);

  const { csvDownloading, csvError } = useSelector((state) => state.expenses);

  const [selectedImage, setSelectedImage] = useState(null);

  const handleOpenModal = (image) => {
    setSelectedImage(image);
    dispatch(openModal());
  };

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

      {/* Filter and CSV Controls */}
      <div className="bg-gray-50 p-4 rounded shadow mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Filter by Employee"
            value={filters.employee}
            onChange={(e) =>
              setFilters({ ...filters, employee: e.target.value })
            }
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Filter by Category"
            value={filters.category}
            onChange={(e) =>
              setFilters({ ...filters, category: e.target.value })
            }
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="number"
            placeholder="Min Amount"
            value={filters.minAmount}
            onChange={(e) =>
              setFilters({ ...filters, minAmount: e.target.value })
            }
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="number"
            placeholder="Max Amount"
            value={filters.maxAmount}
            onChange={(e) =>
              setFilters({ ...filters, maxAmount: e.target.value })
            }
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="date"
            value={filters.startDate}
            onChange={(e) =>
              setFilters({ ...filters, startDate: e.target.value })
            }
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="date"
            value={filters.endDate}
            onChange={(e) =>
              setFilters({ ...filters, endDate: e.target.value })
            }
            className="p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-4">
          <div className="flex gap-3 w-full sm:w-auto">
            <button
              onClick={applyFilters}
              className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700 transition"
            >
              Apply Filters
            </button>
            <button
              onClick={resetFilters}
              className="bg-gray-400 text-white px-4 py-2 rounded cursor-pointer hover:bg-gray-500 transition"
            >
              Reset Filters
            </button>
          </div>
          <button
            onClick={() => dispatch(downloadCSV())}
            disabled={csvDownloading}
            className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700 transition disabled:opacity-50 w-full sm:w-auto"
          >
            {csvDownloading ? "Downloading..." : "Export CSV"}
          </button>
        </div>

        {csvError && (
          <p className="text-red-500 text-sm mt-2 text-center">{csvError}</p>
        )}
      </div>
      {/* Table Controls */}
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
                <th className="text-left p-3">Receipt</th>
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
                  <td className="px-2 py-2">
                    {expense.receipt ? (
                      <button
                        onClick={() => handleOpenModal(expense.receipt)}
                        className="text-blue-600 hover:text-blue-800 cursor-pointer"
                      >
                        View Receipt
                      </button>
                    ) : (
                      <span className="text-gray-400">No Receipt</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* 🔁 Modals */}
      <ReceiptModal selectedImage={selectedImage} />
    </div>
  );
};

export default AdminDashboard;
