"use client"
import { useState, useRef, useEffect } from "react"
import styles from "./CollegeSecurity.module.css"
import Header from '../CollegeHeader/CollegeHeaderFile'
import { useSelector, useDispatch } from 'react-redux';
import {
  setActiveTab,
  setCurrentPassword,
  setNewPassword,
  setConfirmPassword,
  setShowCurrentPassword,
  setShowNewPassword,
  setShowConfirmPassword,
  setCurrentEmail,
  setNewEmail,
  setConfirmEmail,
  setEmailPassword,
  setShowEmailPassword,
} from '../../../slices/collegeSecurityUiSlice';

const CollegeSecurity = () => {
  const dispatch = useDispatch();
  const activeTab = useSelector((state) => state.collegeSecurityUi.activeTab);
  const currentPassword = useSelector((state) => state.collegeSecurityUi.currentPassword);
  const newPassword = useSelector((state) => state.collegeSecurityUi.newPassword);
  const confirmPassword = useSelector((state) => state.collegeSecurityUi.confirmPassword);
  const showCurrentPassword = useSelector((state) => state.collegeSecurityUi.showCurrentPassword);
  const showNewPassword = useSelector((state) => state.collegeSecurityUi.showNewPassword);
  const showConfirmPassword = useSelector((state) => state.collegeSecurityUi.showConfirmPassword);
  const currentEmail = useSelector((state) => state.collegeSecurityUi.currentEmail);
  const newEmail = useSelector((state) => state.collegeSecurityUi.newEmail);
  const confirmEmail = useSelector((state) => state.collegeSecurityUi.confirmEmail);
  const emailPassword = useSelector((state) => state.collegeSecurityUi.emailPassword);
  const showEmailPassword = useSelector((state) => state.collegeSecurityUi.showEmailPassword);

  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    console.log("Password change submitted")
  }

  const handleEmailSubmit = (e) => {
    e.preventDefault()
    console.log("Email change submitted")
  }

  const handleForgotPassword = () => {
    console.log("Forgot password clicked")
  }

  const getPasswordStrength = (password) => {
    if (password.length === 0) return { strength: 0, label: "", color: "" }
    if (password.length < 6) return { strength: 1, label: "Weak", color: "#ef4444" }
    if (password.length < 8) return { strength: 2, label: "Fair", color: "#f59e0b" }
    if (password.length < 12) return { strength: 3, label: "Good", color: "#10b981" }
    return { strength: 4, label: "Strong", color: "#059669" }
  }

  const passwordStrength = getPasswordStrength(newPassword)
  const passwordsMatch = newPassword === confirmPassword && newPassword.length > 0
  const emailsMatch = newEmail === confirmEmail && newEmail.length > 0
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  return (
    <div className={styles.personalDetailsWrapper}>
      <div className={styles.mainContent}>
        <Header />
        <div className={styles.formContainer}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.sectionTitle}>Security Settings</h2>
              <p className={styles.sectionDescription}>Manage your account security settings</p>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.tabs}>
                <button
                  className={`${styles.tabBtn} ${activeTab === "email" ? styles.activeTab : ""}`}
                  onClick={() => dispatch(setActiveTab("email"))}
                >
                  Change Email
                </button>
                <button
                  className={`${styles.tabBtn} ${activeTab === "password" ? styles.activeTab : ""}`}
                  onClick={() => dispatch(setActiveTab("password"))}
                >
                  Change Password
                </button>
              </div>
              <div className={styles.divider} />

              {activeTab === "email" && (
                <div>
                  <h2 className={styles.sectionHeading}>Change Email Address</h2>
                  <form onSubmit={handleEmailSubmit}>
                    <div className={styles.inputGroup}>
                      <label className={styles.label}>Current Email</label>
                      <input
                        type="email"
                        className={`${styles.input} ${styles.disabledInput}`}
                        value={currentEmail}
                        disabled
                      />
                      <p className={styles.helperText}>This is your current registered email address</p>
                    </div>
                    <div className={styles.inputGroup}>
                      <label className={styles.label}>New Email Address</label>
                      <input
                        type="email"
                        className={`${styles.input} ${
                          newEmail && !isValidEmail(newEmail) ? styles.inputError : ""
                        } ${newEmail && isValidEmail(newEmail) ? styles.inputSuccess : ""}`}
                        placeholder="Enter your new email address"
                        value={newEmail}
                        onChange={(e) => dispatch(setNewEmail(e.target.value))}
                        required
                      />
                      {newEmail && !isValidEmail(newEmail) && (
                        <p className={styles.errorText}>
                          <span className="material-icons" style={{ fontSize: "16px" }}>
                            warning
                          </span>
                          Please enter a valid email address
                        </p>
                      )}
                    </div>
                    <div className={styles.inputGroup}>
                      <label className={styles.label}>Confirm New Email</label>
                      <input
                        type="email"
                        className={`${styles.input} ${
                          confirmEmail && !emailsMatch ? styles.inputError : ""
                        } ${confirmEmail && emailsMatch ? styles.inputSuccess : ""}`}
                        placeholder="Re-enter your new email address"
                        value={confirmEmail}
                        onChange={(e) => dispatch(setConfirmEmail(e.target.value))}
                        required
                      />
                      {confirmEmail && !emailsMatch && (
                        <p className={styles.errorText}>
                          <span className="material-icons" style={{ fontSize: "16px" }}>
                            warning
                          </span>
                          Email addresses do not match
                        </p>
                      )}
                      {confirmEmail && emailsMatch && (
                        <p className={styles.successText}>
                          <span className="material-icons" style={{ fontSize: "16px" }}>
                            check_circle
                          </span>
                          Email addresses match
                        </p>
                      )}
                    </div>
                    <div className={styles.inputGroup}>
                      <label className={styles.label}>Confirm with Password</label>
                      <div className={styles.passwordInputContainer}>
                        <input
                          type={showEmailPassword ? "text" : "password"}
                          className={styles.input}
                          placeholder="Enter your current password to confirm"
                          value={emailPassword}
                          onChange={(e) => dispatch(setEmailPassword(e.target.value))}
                          required
                        />
                        <button
                          type="button"
                          className={styles.togglePassword}
                          onClick={() => dispatch(setShowEmailPassword(!showEmailPassword))}
                        >
                          <span className="material-icons">{showEmailPassword ? "visibility_off" : "visibility"}</span>
                        </button>
                      </div>
                      <p className={styles.helperText}>
                        For security purposes, please enter your current password to confirm this change
                      </p>
                    </div>
                    <div className={styles.buttonContainer}>
                      <button
                        type="submit"
                        className={styles.saveButton}
                        disabled={!newEmail || !confirmEmail || !emailPassword || !emailsMatch || !isValidEmail(newEmail)}
                      >
                        <span className="material-icons" style={{ marginRight: "0.5rem" }}>
                          email
                        </span>
                        Change Email
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {activeTab === "password" && (
                <div>
                  <h2 className={styles.sectionHeading}>Change Password</h2>
                  <form onSubmit={handlePasswordSubmit}>
                    <div className={styles.inputGroup}>
                      <label className={styles.label}>Current Password</label>
                      <div className={styles.passwordInputContainer}>
                        <input
                          type={showCurrentPassword ? "text" : "password"}
                          className={styles.input}
                          placeholder="Enter your current password"
                          value={currentPassword}
                          onChange={(e) => dispatch(setCurrentPassword(e.target.value))}
                          required
                        />
                        <button
                          type="button"
                          className={styles.togglePassword}
                          onClick={() => dispatch(setShowCurrentPassword(!showCurrentPassword))}
                        >
                          <span className="material-icons">{showCurrentPassword ? "visibility_off" : "visibility"}</span>
                        </button>
                      </div>
                    </div>
                    <div className={styles.inputGroup}>
                      <label className={styles.label}>New Password</label>
                      <div className={styles.passwordInputContainer}>
                        <input
                          type={showNewPassword ? "text" : "password"}
                          className={styles.input}
                          placeholder="Enter your new password"
                          value={newPassword}
                          onChange={(e) => dispatch(setNewPassword(e.target.value))}
                          required
                        />
                        <button
                          type="button"
                          className={styles.togglePassword}
                          onClick={() => dispatch(setShowNewPassword(!showNewPassword))}
                        >
                          <span className="material-icons">{showNewPassword ? "visibility_off" : "visibility"}</span>
                        </button>
                      </div>
                      <div className={styles.passwordGuidelines}>
                        <div className={styles.guideline}>
                          <span className="material-icons" style={{ fontSize: "16px", color: "#10b981" }}>
                            check
                          </span>
                          <span>At least 8 characters long</span>
                        </div>
                        <div className={styles.guideline}>
                          <span className="material-icons" style={{ fontSize: "16px", color: "#10b981" }}>
                            check
                          </span>
                          <span>Include uppercase and lowercase letters</span>
                        </div>
                        <div className={styles.guideline}>
                          <span className="material-icons" style={{ fontSize: "16px", color: "#10b981" }}>
                            check
                          </span>
                          <span>Add numbers and special characters</span>
                        </div>
                        <div className={styles.guideline}>
                          <span className="material-icons" style={{ fontSize: "16px", color: "#10b981" }}>
                            check
                          </span>
                          <span>Avoid common words or personal information</span>
                        </div>
                      </div>
                      {newPassword && (
                        <div className={styles.passwordStrength}>
                          <div className={styles.strengthBar}>
                            <div
                              className={styles.strengthFill}
                              style={{
                                width: `${(passwordStrength.strength / 4) * 100}%`,
                                backgroundColor: passwordStrength.color,
                              }}
                            />
                          </div>
                          <span className={styles.strengthLabel} style={{ color: passwordStrength.color }}>
                            {passwordStrength.label}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className={styles.inputGroup}>
                      <label className={styles.label}>Confirm New Password</label>
                      <div className={styles.passwordInputContainer}>
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          className={`${styles.input} ${
                            confirmPassword && !passwordsMatch ? styles.inputError : ""
                          } ${confirmPassword && passwordsMatch ? styles.inputSuccess : ""}`}
                          placeholder="Re-enter your new password"
                          value={confirmPassword}
                          onChange={(e) => dispatch(setConfirmPassword(e.target.value))}
                          required
                        />
                        <button
                          type="button"
                          className={styles.togglePassword}
                          onClick={() => dispatch(setShowConfirmPassword(!showConfirmPassword))}
                        >
                          <span className="material-icons">{showConfirmPassword ? "visibility_off" : "visibility"}</span>
                        </button>
                      </div>
                      {confirmPassword && !passwordsMatch && (
                        <p className={styles.errorText}>
                          <span className="material-icons" style={{ fontSize: "16px" }}>
                            warning
                          </span>
                          Passwords do not match
                        </p>
                      )}
                      {confirmPassword && passwordsMatch && (
                        <p className={styles.successText}>
                          <span className="material-icons" style={{ fontSize: "16px" }}>
                            check_circle
                          </span>
                          Passwords match
                        </p>
                      )}
                    </div>
                    <div className={styles.forgotPasswordContainer}>
                      <button type="button" className={styles.forgotPasswordLink} onClick={handleForgotPassword}>
                        <span className="material-icons" style={{ fontSize: "16px", marginRight: "0.5rem" }}>
                          help
                        </span>
                        Forgot your password?
                      </button>
                    </div>
                    <div className={styles.buttonContainer}>
                      <button
                        type="submit"
                        className={styles.saveButton}
                        disabled={!currentPassword || !newPassword || !confirmPassword || !passwordsMatch}
                      >
                        <span className="material-icons" style={{ marginRight: "0.5rem" }}>
                          lock
                        </span>
                        Change Password
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CollegeSecurity
