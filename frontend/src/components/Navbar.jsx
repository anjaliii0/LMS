import { useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  // Hide navbar on login page
  if (location.pathname === "/login") {
    return null;
  }

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="navbar">
      {/* LEFT */}
      <div className="navbar-left">
        <h2>Library Management</h2>
       
      </div>

      {/* CENTER LINKS */}
      <div className="navbar-center">
 {/* ALL BOOKS – visible to both admin & student */}
  <button
    className="nav-btn green"
    onClick={() => navigate("/")}
  >
    All Books
  </button>

  {/* ADMIN ONLY */}
  {user?.role === "admin" && (
    <button
      className="nav-btn green"
      onClick={() => navigate("/issued-books")}
    >
      Issued Books
    </button>
  )}
</div>


      {/* RIGHT */}
      <div className="navbar-right">
        <span className="username">
          {user?.name}
        </span>

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
