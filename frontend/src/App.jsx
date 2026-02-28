import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/dashboard.css";
import IssuedBooks from "./pages/IssuedBooks";

import Dashboard from "./pages/Dashboard";
import MyBooks from "./pages/MyBooks.jsx";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Auth from "./pages/Auth";

function App() {
  return (
    <BrowserRouter>
  <Navbar />

  <div className="main-content">
    <Routes>
      <Route path="/login" element={<Auth />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/issued-books"
        element={
          <ProtectedRoute role="admin">
            <IssuedBooks />
          </ProtectedRoute>
        }
      />
    </Routes>
  </div>
</BrowserRouter>

  );
}

export default App;
