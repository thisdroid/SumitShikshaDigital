import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import styles from "./StudentSignup.module.css";
import Navbar from "../../components/common_components/Navbar";
import Animate from "../../components/common_components/Animated";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setFormData, setShowPassword, setShowConfirmPassword } from '../../slices/studentSignupSlice';

export default function StudentSignUp() {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.studentSignup.formData);
  const showPassword = useSelector((state) => state.studentSignup.showPassword);
  const showConfirmPassword = useSelector((state) => state.studentSignup.showConfirmPassword);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFormData({ [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <>
      <Navbar />
      <Animate />
      <div className={styles.theme}>
        <div className={styles["studentsignup-student-signup-container"]}>
          <div className={styles["studentsignup-signup-content"]}>
            {/* Left Panel */}
            <div className={styles["studentsignup-left-panel"]}>
              <div className={styles["studentsignup-logo-container"]}>
                <img src="./images/scholar.png" alt="Scholar Logo" className={styles["studentsignup-scholar-logo"]} />
              </div>
              <h1 className={styles["studentsignup-welcome-title"]}>Join Our Learning Community</h1>
              <p className={styles["studentsignup-welcome-subtitle"]}>
                Create your student account to access courses, exams, and learning resources tailored just for you.
              </p>
              <div className={styles["studentsignup-login-link"]}>
                <span>Already have an account? </span>
                <Link to="/StudentLogin" className={styles["studentsignup-login-link-text"]}>Login here</Link>
              </div>
            </div>

            {/* Right Panel - Student Registration Form */}
            <div className={styles["studentsignup-right-panel"]}>
              <div className={styles["studentsignup-form-container"]}>
                <h2 className={styles["studentsignup-student-form-title"]}>Student Registration</h2>
                <p className={styles["studentsignup-student-form-subtitle"]}>Fill in your details to create an account</p>

                <form onSubmit={handleSubmit} className={styles["studentsignup-registration-form"]}>
                  <div className={styles["studentsignup-form-row"]}>
                    <div className={styles["studentsignup-form-group"]}>
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
                    <div className={styles["studentsignup-form-group"]}>
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

                  <div className={styles["studentsignup-form-row"]}>
                    <div className={styles["studentsignup-form-group"]}>
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
                    <div className={styles["studentsignup-form-group"]}>
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

                  <div className={styles["studentsignup-form-row"]}>
                    <div className={styles["studentsignup-form-group"]}>
                      <label htmlFor="password">Password</label>
                      <div className={styles["studentsignup-password-input-container"]}>
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
                          className={styles["studentsignup-password-toggle"]}
                          onClick={() => dispatch(setShowPassword(!showPassword))}
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>
                    <div className={styles["studentsignup-form-group"]}>
                      <label htmlFor="confirmPassword">Confirm Password</label>
                      <div className={styles["studentsignup-password-input-container"]}>
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
                          className={styles["studentsignup-password-toggle"]}
                          onClick={() => dispatch(setShowConfirmPassword(!showConfirmPassword))}
                        >
                          {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className={`${styles["studentsignup-form-group"]} ${styles["studentsignup-full-width"]}`}>
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

                  <div className={`${styles["studentsignup-form-group"]} ${styles["studentsignup-full-width"]}`}>
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

                  <button type="submit" className={styles["studentsignup-student-submit-button"]}>
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