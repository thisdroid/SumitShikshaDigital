import { useState } from "react"
import { Eye, EyeOff, CircleArrowRight , ArrowRight } from "lucide-react"
import "./StudentLogin.css"
import Navbar from '../components/common_components/Navbar'
import Animated from "../components/common_components/Animated"
const StudentLogin = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    contactNumber: "",
    password: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Login attempt:", formData)
  }

  return (
    <>
    <Navbar />
    {/* <Animated /> */}
    <div className="login-container">
      <div className="background-wrapper">
      <Animated />
    </div>
      <div className="login-card">
        <div className="login-content">
          {/* Left Panel */}
          <div className="left-panel">
            {/* Background decorative circles */}
            <div className="bg-circle-1"></div>
            <div className="bg-circle-2"></div>
            <div className="bg-circle-3"></div>

            {/* Arrow Icon */}
            <div className="arrow-icon-container">
              <div className="arrow-icon-box">
                <CircleArrowRight className="w-18 h-18 text-white" />
              </div>
            </div>

            {/* Welcome Text */}
            <h1 className="welcome-title">Welcome Back!</h1>

            <p className="welcome-subtitle">Login to access your courses, exams, and learning resources.</p>

            {/* Sign up link */}
            <div className="signup-section">
              <p className="signup-text">
                {"Don't have an account? "}
                <a href="#" className="signup-link">
                  Sign up here
                </a>
              </p>
            </div>
          </div>

          {/* Right Panel */}
          <div className="right-panel">
            <div className="form-container">
              {/* Header */}
              <div className="header-section">
                <h2 className="login-title">Student Login</h2>
                <p className="login-subtitle">Enter your credentials to continue</p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="login-form">
                {/* Username Field */}
                <div className="form-group">
                  <label htmlFor="contactNumber" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    id="contactNumber"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                    placeholder="Enter your username/contact number"
                    className="form-input"
                  />
                </div>

                {/* Password Field */}
                <div className="form-group">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <div className="password-container">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Enter your password"
                      className="form-input password-input"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="password-toggle">
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Login Button */}
                <button type="submit" className="login-button">
                  <ArrowRight className="w-5 h-5" />
                  Login
                </button>
              </form>

              {/* Footer Links */}
              <div className="footer-links">
                <a href="#" className="footer-link">
                  Forgot Password?
                </a>
                <a href="#" className="footer-link">
                  Create New Account
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default StudentLogin