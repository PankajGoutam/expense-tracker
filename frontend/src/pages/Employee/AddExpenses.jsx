import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addExpense } from "../../redux/Slices/expenseSlice";
import { closeAddExpenseForm } from "../../redux/Slices/uiSlice";

const AddExpenses = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.expenses);
  const { user } = useSelector((state) => state.auth);
  const { isAddExpenseFormOpen } = useSelector((state) => state.ui);

  const userId = user._id;

  const [form, setForm] = useState({
    user: userId,
    amount: "",
    category: "",
    date: "",
    notes: "",
    receipt: null,
  });

  const [categoryCount, setCategoryCount] = useState(0);
  const [notesCount, setNotesCount] = useState(0);
  const [fileName, setFileName] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "category") {
      if (value.length <= 15) {
        setCategoryCount(value.length);
        setForm((prev) => ({ ...prev, category: value }));
      }
    } else if (name === "notes") {
      if (value.length <= 30) {
        setNotesCount(value.length);
        setForm((prev) => ({ ...prev, notes: value }));
      }
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({ ...prev, receipt: file }));
      setFileName(file.name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addExpense(form));
    dispatch(closeAddExpenseForm());
  };

  if (!isAddExpenseFormOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-md w-full relative animate-fade-in">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Add Expense</h2>
          <button
            onClick={() => dispatch(closeAddExpenseForm())}
            className="text-gray-400 hover:text-gray-800 text-2xl font-bold"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Amount</label>
            <input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="relative">
            <label className="block font-medium mb-1">Category</label>
            <input
              type="text"
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 pr-16 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute right-3 top-9 text-sm text-gray-500">
              {categoryCount}/15
            </span>
          </div>

          <div>
            <label className="block font-medium mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="relative">
            <label className="block font-medium mb-1">Notes</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows="3"
              className="w-full border border-gray-300 rounded px-3 py-2 pr-16 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
            <span className="absolute right-3 bottom-3 text-sm text-gray-500">
              {notesCount}/30
            </span>
          </div>

          <div>
            <label className="block font-medium mb-1">Receipt Image</label>
            <div className="flex items-center gap-3">
              <label className="cursor-pointer bg-gray-100 px-4 py-2 rounded border border-gray-300 hover:bg-gray-200 text-sm">
                Upload File
                <input
                  type="file"
                  name="receipt"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              <span className="text-sm text-gray-600 truncate w-48">
                {fileName || "No file selected"}
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full transition-colors cursor-pointer"
          >
            {loading ? "Adding..." : "Add Expense"}
          </button>

          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default AddExpenses;
