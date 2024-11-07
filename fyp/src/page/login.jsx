import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function LoginPage() {
  const [activeTab, setActiveTab] = useState("login");
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const [registerInfo, setRegisterInfo] = useState({ email: "", password: "" });
  const [forgotEmail, setForgotEmail] = useState("");
  const navigate = useNavigate(); // Initialize navigate

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Implement login functionality here (e.g., validate loginInfo)
    console.log("Logging in:", loginInfo);
    
    // If login is successful, navigate to the homepage
    navigate("/home");
  };

  const handleRegister = (e) => {
    e.preventDefault();
    // Implement register functionality here
    console.log("Registering:", registerInfo);
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    // Implement forgot password functionality here
    console.log("Resetting password for:", forgotEmail);
  };

  return (
    <div className="container d-flex justify-content-center mt-5">
      <div className="card p-4" style={{ width: "400px" }}>
        <div className="text-center mb-3">
          <h2>{activeTab === "login" ? "Login" : activeTab === "register" ? "Register" : "Forgot Password"}</h2>
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
          <button
            className={`btn ${activeTab === "forgot" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => handleTabChange("forgot")}
          >
            Forgot Password
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

        {activeTab === "forgot" && (
          <form onSubmit={handleForgotPassword}>
            <div className="mb-3">
              <label htmlFor="forgotEmail" className="form-label">Enter your email</label>
              <input
                type="email"
                className="form-control"
                id="forgotEmail"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Reset Password</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default LoginPage;
