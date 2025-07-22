import { useDispatch } from "react-redux";
import { logout } from "../redux/Slices/authSlice";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="flex justify-between items-center p-4 bg-gray-200">
      <h1 className="text-xl font-bold">Expense Tracker</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-1 rounded cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
