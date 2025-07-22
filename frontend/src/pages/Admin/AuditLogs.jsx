import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAuditLogs } from "../../redux/Slices/logSlice";

const AuditLogs = () => {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.logs);

  useEffect(() => {
    dispatch(getAuditLogs());
  }, [dispatch]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-bold">Audit Logs</h2>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : list.length === 0 ? (
        <div className="flex items-center justify-center h-40">
          <p className="text-gray-500 text-center text-lg">
            No audit logs available.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow rounded text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-2 py-2">Date</th>
                <th className="text-left px-2 py-2">Time</th>
                <th className="text-left px-2 py-2">Category</th>
                <th className="text-left px-2 py-2">Amount</th>
                <th className="text-left px-2 py-2">Status</th>
                <th className="text-left px-2 py-2">Action</th>
                <th className="text-left px-2 py-2">Message</th>
              </tr>
            </thead>
            <tbody>
              {list.map((log) => {
                const expense = log.expense;
                const createdAt = new Date(log.createdAt);
                const date = createdAt.toLocaleDateString("en-GB"); // dd/mm/yyyy
                const time = createdAt.toLocaleTimeString("en-US"); // hh:mm:ss AM/PM

                return (
                  <tr key={log._id} className="border-b hover:bg-gray-50">
                    <td className="px-2 py-2">{date}</td>
                    <td className="px-2 py-2">{time}</td>
                    <td className="px-2 py-2">{expense?.category || "—"}</td>
                    <td className="px-2 py-2">
                      {expense?.amount ? `₹${expense.amount}` : "—"}
                    </td>
                    <td className="px-2 py-2 capitalize">
                      {expense?.status || "—"}
                    </td>
                    <td className="px-2 py-2 capitalize">{log.action}</td>
                    <td className="px-2 py-2">{log.message}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AuditLogs;
