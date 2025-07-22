import { useSelector } from "react-redux";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import EmployeeDashboard from "../pages/Employee/EmployeeDashboard";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const role = user?.role;

  return (
    <>
      {role === "admin" ? <AdminDashboard /> : <EmployeeDashboard />}
    </>
  );
};

export default Dashboard;
