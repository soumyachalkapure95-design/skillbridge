import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import StudentDashboard from "./pages/student/Dashboard";

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <div style={{ fontFamily: "sans-serif", padding: "20px" }}>
          <Routes>
            <Route path="/" element={<StudentDashboard />} />
            <Route path="/student" element={<StudentDashboard />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}
