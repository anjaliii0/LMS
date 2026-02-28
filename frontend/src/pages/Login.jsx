import { useState } from "react";
import API from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const res = await API.post("/auth/login", { email, password });

    localStorage.setItem("user", JSON.stringify(res.data));
    window.location.href = "/";
  };

  return (
    <div className="card">
      <h3>Login</h3>
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password"
             onChange={e => setPassword(e.target.value)} />
      <button className="primary-btn" onClick={login}>Login</button>
    </div>
  );
}

export default Login;
