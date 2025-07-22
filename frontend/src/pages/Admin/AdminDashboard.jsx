import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getExpenses,updateExpenseStatus } from "../../redux/Slices/expenseSlice";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.expenses);

  useEffect(() => {
    dispatch(getExpenses());
  }, [dispatch]);

  // Filter only pending expenses
  const pendingExpenses = list?.filter((list) => list.status === "pending");

  const handleStatusChange = (id, status) => {
    dispatch(updateExpenseStatus({ id, status })).then(() => {
      dispatch(getExpenses());
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Dashboard</h2>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : pendingExpenses?.length === 0 ? (
        <p>No pending expenses.</p>
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
              {pendingExpenses.map((expense) => (
                <tr key={expense._id} className="border-b">
                  <td className="p-3">{expense?.user?.name}</td>
                  <td className="p-3">{expense.category}</td>
                  <td className="p-3">₹{expense.amount}</td>
                  <td className="p-3">{expense.notes}</td>
                  <td className="p-3 capitalize">
                    <select
                      className="border rounded p-1"
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
