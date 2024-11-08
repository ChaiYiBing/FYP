import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginPage() {
  const [activeTab, setActiveTab] = useState("login");
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const [registerInfo, setRegisterInfo] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log("Requesting:", `${process.env.REACT_APP_API_URL}/login`);
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, loginInfo);
      if (response && response.data) {
        console.log("Login successful:", response.data);
        navigate("/home");
      } else {
        console.error("Unexpected response structure:", response);
        alert("Login failed: Unexpected response from server.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login. Please try again.");
    }
  };
  

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", registerInfo);
      console.log("Registration successful:", response.data);
      alert("Registration successful. You can now log in.");
      setActiveTab("login"); // Switch to login tab
    } catch (error) {
      console.error("Registration failed:", error.response ? error.response.data : error);
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
