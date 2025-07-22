import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getExpenses } from "../../redux/Slices/expenseSlice";
import ReceiptModal from "../../utils/ReceiptModal";
import AddExpenses from "./AddExpenses"; // 👈 Import form modal
import { openModal, openAddExpenseForm } from "../../redux/Slices/uiSlice";

const EmployeeDashboard = () => {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.expenses);

  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    dispatch(getExpenses());
  }, [dispatch]);

  const handleOpenModal = (image) => {
    setSelectedImage(image);
    dispatch(openModal());
  };

  const handleExpenseForm = () => {
    dispatch(openAddExpenseForm());
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-bold">Dashboard</h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
          onClick={handleExpenseForm}
        >
          Add New Expense
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : list.length === 0 ? (
        <div className="flex items-center justify-center h-40">
    <p className="text-gray-500 text-center text-lg">No expenses listed.</p>
  </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow rounded text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-2 py-2">Date</th>
                <th className="text-left px-2 py-2">Category</th>
                <th className="text-left px-2 py-2">Amount</th>
                <th className="text-left px-2 py-2">Notes</th>
                <th className="text-left px-2 py-2">Status</th>
                <th className="text-left px-2 py-2">Receipt</th>
              </tr>
            </thead>
            <tbody>
              {list.map((expense) => (
                <tr key={expense._id} className="border-b hover:bg-gray-50">
                  <td className="px-2 py-2">
                    {new Date(expense.date).toLocaleDateString()}
                  </td>
                  <td className="px-2 py-2">{expense.category}</td>
                  <td className="px-2 py-2">₹{expense.amount}</td>
                  <td className="px-2 py-2">{expense.notes}</td>
                  <td className="px-2 py-2 capitalize">{expense.status}</td>
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
      <AddExpenses />
    </div>
  );
};

export default EmployeeDashboard;
