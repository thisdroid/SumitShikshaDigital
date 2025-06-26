import { useState } from "react"
import { Eye, EyeOff, Building2 } from "lucide-react"
import styles from "./CollegeSignUp.module.css"
import Navbar from "../../components/common_components/Navbar"
import AnimatedBackground from "../../components/common_components/Animated"
import { Link } from "react-router-dom"

export default function CollegeSignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    collegeName: "",
    contactPerson: "",
    contactNumber: "",
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
    console.log("Registration attempt:", formData)
  }

  return (
    <>
    <Navbar />
    <AnimatedBackground />
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.content}>
          {/* Left Panel */}
          <div className={styles.leftPanel}>
            {/* Background decorative circles */}
            <div className={styles.bgCircle1}></div>
            <div className={styles.bgCircle2}></div>
            <div className={styles.bgCircle3}></div>

            <div className={styles.leftContent}>
              {/* Icon */}
              <div className={styles.iconContainer}>
                <Building2 className={styles.icon} />
              </div>

              {/* Title */}
              <h1 className={styles.title}>
                Join Our Educational
                <br />
                Network
              </h1>

              {/* Description */}
              <p className={styles.description}>
                Register your college to manage students, exams, and academic resources with our comprehensive platform.
              </p>

              {/* Login Link */}
              <div className={styles.loginLinkContainer}>
                <p className={styles.loginText}>
                  Already have an account?{" "}
                  <Link to="/CollegeLogin" className={styles.loginLink}>Login here</Link>
                </p>
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className={styles.rightPanel}>
            <div className={styles.formWrapper}>
              {/* Header */}
              <div className={styles.header}>
                <h2 className={styles.formTitle}>College Registration</h2>
                <p className={styles.formSubtitle}>Provide your institution details to create an account</p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className={styles.form}>
                {/* First Row */}
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="username" className={styles.label}>
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      placeholder="Choose a username"
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="password" className={styles.label}>
                      Password
                    </label>
                    <div className={styles.passwordContainer}>
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Create a password"
                        className={`${styles.input} ${styles.passwordInput}`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className={styles.passwordToggle}
                      >
                        {showPassword ? <EyeOff className={styles.eyeIcon} /> : <Eye className={styles.eyeIcon} />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Second Row */}
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.label}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter college email"
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="collegeName" className={styles.label}>
                      College Name
                    </label>
                    <input
                      type="text"
                      id="collegeName"
                      name="collegeName"
                      value={formData.collegeName}
                      onChange={handleInputChange}
                      placeholder="Enter college name"
                      className={styles.input}
                    />
                  </div>
                </div>

                {/* Third Row */}
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="contactPerson" className={styles.label}>
                      Contact Person
                    </label>
                    <input
                      type="text"
                      id="contactPerson"
                      name="contactPerson"
                      value={formData.contactPerson}
                      onChange={handleInputChange}
                      placeholder="Enter contact person name"
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="contactNumber" className={styles.label}>
                      Contact Number
                    </label>
                    <input
                      type="tel"
                      id="contactNumber"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleInputChange}
                      placeholder="Enter contact number"
                      className={styles.input}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button type="submit" className={styles.submitButton}>
                  <Building2 className={styles.buttonIcon} />
                  Register College
                </button>
              </form>

              {/* Login Link */}
              <div className={styles.footerLink}>
                <p className={styles.footerText}>
                  Already have an account?{" "}
                  <a href="#" className={styles.footerLinkText}>
                    Login
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
