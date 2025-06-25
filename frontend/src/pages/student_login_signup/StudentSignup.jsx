import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import "./StudentSignup.css";
import Navbar from "../../components/common_components/Navbar";
import Animate from "../../components/common_components/Animated";
import { Link } from 'react-router-dom';
export default function StudentSignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    address: "",
    college: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <>
      <Navbar />
      <Animate />
      <div className="studentsignup-student-signup-container">
        <div className="studentsignup-signup-content">
          {/* Left Panel */}
          <div className="studentsignup-left-panel">
            <div className="studentsignup-logo-container">
              <img src="./images/scholar.png" alt="Scholar Logo" className="studentsignup-scholar-logo" />
            </div>
            <h1 className="studentsignup-welcome-title">Join Our Learning Community</h1>
            <p className="studentsignup-welcome-subtitle">
              Create your student account to access courses, exams, and learning resources tailored just for you.
            </p>
            <div className="studentsignup-login-link">
              <span>Already have an account? </span>
              {/* <a href="/login" className="studentsignup-login-link-text">Login here</a> */}
              <Link to="/StudentLogin" className="studentsignup-login-link-text">Login here</Link>
            </div>
          </div>

          {/* Right Panel - Student Registration Form */}
          <div className="studentsignup-right-panel">
            <div className="studentsignup-form-container">
              <h2 className="studentsignup-student-form-title">Student Registration</h2>
              <p className="studentsignup-student-form-subtitle">Fill in your details to create an account</p>

              <form onSubmit={handleSubmit} className="studentsignup-registration-form">
                <div className="studentsignup-form-row">
                  <div className="studentsignup-form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="studentsignup-form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="studentsignup-form-row">
                  <div className="studentsignup-form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="studentsignup-form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="Phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="studentsignup-form-row">
                  <div className="studentsignup-form-group">
                    <label htmlFor="password">Password</label>
                    <div className="studentsignup-password-input-container">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                      />
                      <button
                        type="button"
                        className="studentsignup-password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                  <div className="studentsignup-form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <div className="studentsignup-password-input-container">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                      />
                      <button
                        type="button"
                        className="studentsignup-password-toggle"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="studentsignup-form-group studentsignup-full-width">
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="studentsignup-form-group studentsignup-full-width">
                  <label htmlFor="college">College</label>
                  <select
                    id="college"
                    name="college"
                    value={formData.college}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select College</option>
                    <option value="college1">College 1</option>
                    <option value="college2">College 2</option>
                    <option value="college3">College 3</option>
                  </select>
                </div>

                <button type="submit" className="studentsignup-student-submit-button">
                  Create Account
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}