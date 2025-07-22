import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div className="w-60 h-screen bg-gray-800 text-white p-4">
      <nav className="flex flex-col gap-4">
        <NavLink
          to="/expenses"
          className={({ isActive }) =>
            isActive ? "text-blue-400" : "text-white"
          }
        >
          All Expenses
        </NavLink>
        <NavLink
          to="/insights"
          className={({ isActive }) =>
            isActive ? "text-blue-400" : "text-white"
          }
        >
          Insights
        </NavLink>
        <NavLink
          to="/audit-logs"
          className={({ isActive }) =>
            isActive ? "text-blue-400" : "text-white"
          }
        >
          Audit Logs
        </NavLink>
      </nav>
    </div>
  );
};

export default AdminSidebar;
