import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getExpenses } from "../../redux/Slices/expenseSlice"

const EmployeeDashboard = () => {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.expenses);


  useEffect(() => {
    dispatch(getExpenses());
  }, [dispatch]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Dashboard</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Add New Expense
          </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow rounded">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-3">Date</th>
                <th className="text-left p-3">Category</th>
                <th className="text-left p-3">Amount</th>
                <th className="text-left p-3">Notes</th>
                <th className="text-left p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {list.map((expense) => (
                <tr key={expense._id} className="border-b">
                  <td className="p-3">{new Date(expense.date).toLocaleDateString()}</td>
                  <td className="p-3">{expense.category}</td>
                  <td className="p-3">₹{expense.amount}</td>
                  <td className="p-3">{expense.notes}</td>
                  <td className="p-3 capitalize">{expense.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EmployeeDashboard;
