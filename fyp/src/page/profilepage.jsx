import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

function ProfilePage() {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [updatedData, setUpdatedData] = useState({
    username: "",
    email: "",
  });
  const [error, setError] = useState(""); // To store error messages
  const userId = localStorage.getItem("userId"); // Retrieve user ID from localStorage
  const navigate = useNavigate(); // Initialize navigation

  // Fetch user profile data on load
  useEffect(() => {
    if (!userId) {
      setError("User ID is missing. Please log in again.");
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/profile?userId=${userId}`);
        setUserData(response.data);
        setUpdatedData(response.data); // Pre-fill form with existing data
      } catch (err) {
        console.error("Error fetching profile data:", err);
        setError("Failed to load profile data.");
      }
    };

    fetchUserData();
  }, [userId]);

  // Handle changes in the form fields
  const handleChange = (e) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };

  // Handle profile update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      if (!userId) {
        setError("User ID is missing. Please log in again.");
        return;
      }

      const response = await axios.put("http://localhost:5000/api/profile/update", {
        ...updatedData,
        userId,
      });

      setUserData(response.data); // Update displayed user data
      setEditMode(false); // Exit edit mode
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Failed to update profile.");
    }
  };

  // Error dialog
  const renderErrorDialog = () => {
    if (!error) return null;
    return (
      <div className="alert alert-danger" role="alert">
        {error}
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={() => setError("")}
        ></button>
      </div>
    );
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Profile</h2>

      {renderErrorDialog()}

      {editMode ? (
        // Edit Profile Form
        <form onSubmit={handleUpdate} className="p-4 bg-light rounded shadow-sm">
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={updatedData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={updatedData.email}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Save Changes
          </button>
          <button
            type="button"
            className="btn btn-secondary ms-3"
            onClick={() => setEditMode(false)}
          >
            Cancel
          </button>
        </form>
      ) : (
        // Display Profile Data
        <div className="p-4 bg-light rounded shadow-sm">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <p>
                <strong>Username:</strong> {userData.username}
              </p>
              <p>
                <strong>Email:</strong> {userData.email}
              </p>
            </div>
            <div>
              <button
                className="btn btn-primary me-2"
                onClick={() => setEditMode(true)}
              >
                Edit Profile
              </button>
              <button
                className="btn btn-success"
                onClick={() => navigate("/home")} // Navigate to homepage
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
