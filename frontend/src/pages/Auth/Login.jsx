import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/Slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, error, loading, user } = useSelector((state) => state.auth);

  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser(form));
    if (result.meta.requestStatus === "fulfilled") {
      const role = result.payload.role;
      navigate(role === "admin" ? "/admin" : "/employee");
    }
  };

  useEffect(() => {
    if (token && user) {
      const role = user.role;
      navigate(role === "admin" ? "/admin" : "/employee");
    }
  }, [token, user]);

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
          required
        />

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
