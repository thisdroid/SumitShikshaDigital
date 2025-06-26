// CollegeLogin.jsx
import { useState } from "react"
import { Eye, EyeOff, ArrowRight } from "lucide-react"
import styles from "./CollegeLogin.module.css"
import Navbar from "../../components/common_components/Navbar"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUniversity } from "@fortawesome/free-solid-svg-icons"
import Animated from "../../components/common_components/Animated"
import { Link } from "react-router-dom"

export default function Collegelogin() {
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
      <div className={styles.loginContainer}>
        <div className={styles.backgroundWrapper}>
          <Animated />
        </div>
        <div className={styles.loginCard}>
          <div className={styles.loginContent}>
            {/* Left Panel */}
            <div className={styles.leftPanel}>
              <div className={styles.bgCircle1}></div>
              <div className={styles.bgCircle2}></div>
              <div className={styles.bgCircle3}></div>
              <div className={styles.iconContainer}>
                <FontAwesomeIcon icon={faUniversity} className={styles.heroIcon} />
              </div>
              <h1 className={styles.welcomeTitle}>Welcome Back to Our Educational Network</h1>
              <p className={styles.welcomeSubtitle}>
                Access your college dashboard to manage students, exams, and academic resources with our comprehensive
                platform.
              </p>
              <div className={styles.signupSection}>
                <p className={styles.signupText}>
                  {"Don't have an account? "}
                  <Link to="/CollegeSignUp" className={styles.signupLink}>Sign up here</Link>
                </p>
              </div>
            </div>

            {/* Right Panel */}
            <div className={styles.rightPanel}>
              <div className={styles.formContainer}>
                <div className={styles.headerSection}>
                  <h2 className={styles.loginTitle}>College Login</h2>
                  <p className={styles.loginSubtitle}>Enter your credentials to continue</p>
                </div>

                <form onSubmit={handleSubmit} className={styles.loginForm}>
                  <div className={styles.formGroup}>
                    <label htmlFor="contactNumber" className={styles.formLabel}>
                      Username
                    </label>
                    <input
                      type="text"
                      id="contactNumber"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleInputChange}
                      placeholder="Enter your username/contact number"
                      className={styles.formInput}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="password" className={styles.formLabel}>
                      Password
                    </label>
                    <div className={styles.passwordContainer}>
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Enter your password"
                        className={`${styles.formInput} ${styles.passwordInput}`}
                      />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className={styles.passwordToggle}>
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <button type="submit" className={styles.loginButton}>
                    <ArrowRight className="w-5 h-5" />
                    Login
                  </button>
                </form>

                <div className={styles.collegeloginFooterLinks}>
                  <a href="#" className={styles.collegeloginFooterLink}>
                    Forgot Password?
                  </a>
                  <a href="#" className={styles.collegeloginFooterLink}>
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
