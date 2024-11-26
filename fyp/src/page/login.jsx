import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginPage() {
  const [activeTab, setActiveTab] = useState("login");
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const [registerInfo, setRegisterInfo] = useState({ email: "", password: "", username: "" });
  const navigate = useNavigate();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", loginInfo, {
        withCredentials: true,
      });
  
      if (response.data) {
        const userId = response.data.user.id; // Assuming `id` is returned in the user object
        localStorage.setItem("userId", userId); // Store userId in localStorage
        alert("Login successful!");
        navigate("/home"); // Navigate to homepage
      }
    } catch (error) {
      console.error("Login error:", error.response ? error.response.data : error);
      alert("Login failed: " + (error.response ? error.response.data.message : error.message));
    }
  };
  

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const trimmedRegisterInfo = {
        email: registerInfo.email.trim(),
        password: registerInfo.password.trim(),
        username: registerInfo.username.trim(),
      };

      const response = await axios.post("http://localhost:5000/api/auth/register", trimmedRegisterInfo);
      alert(response.data.message); // Notify success
      setActiveTab("login"); // Switch to login tab
    } catch (error) {
      console.error("Registration error:", error.response ? error.response.data : error);
      alert("Registration failed: " + (error.response ? error.response.data.message : error.message));
    }
  };

  return (
    <div className="container d-flex justify-content-center mt-5">
      <div className="card p-4" style={{ width: "400px" }}>
        <div className="text-center mb-3">
          <h2>{activeTab === "login" ? "Login" : "Register"}</h2>
        </div>
        <div className="btn-group w-100 mb-4">
          <button
            className={`btn ${activeTab === "login" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => handleTabChange("login")}
          >
            Login
          </button>
          <button
            className={`btn ${activeTab === "register" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => handleTabChange("register")}
          >
            Sign Up
          </button>
        </div>

        {activeTab === "login" && (
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="loginEmail" className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                id="loginEmail"
                value={loginInfo.email}
                onChange={(e) => setLoginInfo({ ...loginInfo, email: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="loginPassword" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="loginPassword"
                value={loginInfo.password}
                onChange={(e) => setLoginInfo({ ...loginInfo, password: e.target.value })}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Login</button>
          </form>
        )}

        {activeTab === "register" && (
          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <label htmlFor="registerUsername" className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                id="registerUsername"
                value={registerInfo.username}
                onChange={(e) => setRegisterInfo({ ...registerInfo, username: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="registerEmail" className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                id="registerEmail"
                value={registerInfo.email}
                onChange={(e) => setRegisterInfo({ ...registerInfo, email: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="registerPassword" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="registerPassword"
                value={registerInfo.password}
                onChange={(e) => setRegisterInfo({ ...registerInfo, password: e.target.value })}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Sign Up</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default LoginPage;
