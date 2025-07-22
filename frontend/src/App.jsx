import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import AdminLayout from "./layouts/AdminLayout";
import Insights from "./pages/Admin/Insights";
import AuditLogs from "./pages/Admin/AuditLogs";
import Dashboard from "./components/Dashboard"
import ProtectedRoute from "./routes/ProtectedRoute";
import NotFound from "./pages/NotFound";

function App() {

  return (
    <Router>

      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/expenses"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <Dashboard />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/insights"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <Insights />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/audit-logs"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <AuditLogs />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
