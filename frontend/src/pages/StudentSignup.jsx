import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import "./StudentSignUp.css";
import Navbar from "../components/common_components/Navbar";

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
    profilePicture: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      profilePicture: file,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <>
    <Navbar />
    <div className="login-container">
      <div className="login-card">
        <div className="login-content">
          {/* Left Panel */}
          <div className="left-panel">
            <div className="bg-circle-1"></div>
            <div className="bg-circle-2"></div>
            <div className="bg-circle-3"></div>

            <div className="logo-container">
              <img src="./images/scholar.png" alt="Scholar Logo" className="scholar-logo" />
            </div>

            <h1 className="welcome-title">Join Our Learning Community</h1>
            <p className="welcome-subtitle">
              Create your student account to access courses, exams, and learning resources tailored just for you.
            </p>

            <div className="login-link">
              <span>Already have an account? </span>
              <a href="/login" className="login-link-text">Login here</a>
            </div>
          </div>

          {/* Right Panel - Student Registration Form */}
          <div className="right-panel">
            <div className="form-container">
              <h2 className="form-title">Student Registration</h2>
              <p className="form-subtitle">Fill in your details to create an account</p>

              <form onSubmit={handleSubmit} className="registration-form">
                <div className="form-row">
                  <div className="form-group">
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
                  <div className="form-group">
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

                <div className="form-row">
                  <div className="form-group">
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
                  <div className="form-group">
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

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <div className="password-input-container">
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
                        className="password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <div className="password-input-container">
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
                        className="password-toggle"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="form-group full-width">
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

                <div className="form-group full-width">
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

                <div className="form-group full-width">
                  <label>Profile Picture</label>
                  <div className="file-upload">
                    <input
                      type="file"
                      id="profilePicture"
                      name="profilePicture"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="file-input"
                    />
                    <label htmlFor="profilePicture" className="file-label">
                      <span>Drag & Drop your photo here or click to upload</span>
                    </label>
                  </div>
                </div>

                <button type="submit" className="submit-button">
                  Create Account
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}