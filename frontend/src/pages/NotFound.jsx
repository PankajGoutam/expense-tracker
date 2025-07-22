import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {

  const navigate = useNavigate();
  const handleGoHome = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-800">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">Oops! Page not found.</p>
      <button
        onClick={handleGoHome}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        Go Back
      </button>
    </div>
  );
};

export default NotFound;
