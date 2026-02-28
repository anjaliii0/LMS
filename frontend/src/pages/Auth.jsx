import { useState } from "react";
import API from "../services/api";
import "../styles/auth.css";
import { useNavigate } from "react-router-dom";


function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
  });
  

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async () => {
  // SIGNUP
  if (!isLogin) {
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    await API.post("/auth/signup", {
      name: form.name,
      email: form.email,
      password: form.password,
      role: form.role,
    });

    alert("Account created successfully. Please login.");
    navigate("/login");   // ✅ redirect after signup
    setIsLogin(true);
    return;
  }

  // LOGIN
  const res = await API.post("/auth/login", {
    email: form.email,
    password: form.password,
  });

  localStorage.setItem("user", JSON.stringify(res.data));

  // 🔥 ROLE-BASED REDIRECT
  if (res.data.role === "admin") {
    navigate("/");            // admin dashboard
  } else {
    navigate("/my-books");    // student page
  }
};


  return (
    <div className="auth-container">
      <div className="auth-card large">
        <h2>{isLogin ? "Welcome Back 👋" : "Create Account 🚀"}</h2>
        <p className="subtitle">
          {isLogin
            ? "Login to manage your library"
            : "Signup to access the library system"}
        </p>

        {!isLogin && (
          <>
            <input
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
            />

            <select name="role" onChange={handleChange}>
              <option value="student">Student</option>
              <option value="admin">Admin</option>
            </select>
          </>
        )}

        <input
          name="email"
          placeholder="Email Address"
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />

        {!isLogin && (
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            onChange={handleChange}
          />
        )}

        <button onClick={submit} className="auth-btn">
          {isLogin ? "Login" : "Create Account"}
        </button>

        <p className="switch-text">
          {isLogin ? "New here?" : "Already have an account?"}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? " Create account" : " Login"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Auth;
