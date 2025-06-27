import { useState } from "react";
import styles from "./StudentSecurity.module.css";

const StudentSecurity = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle password change logic here
    console.log("Password change submitted");
  };

  const handleForgotPassword = () => {
    // Handle forgot password logic here
    console.log("Forgot password clicked");
  };

  return (
    <>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>Security</h1>
          <p className={styles.subtitle}>Change your account password</p>
        </div>

        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit}>
            {/* Password Fields Section */}
            <div className={styles.section}>
              <div className={styles.inputGroup}>
                <input
                  type="password"
                  className={styles.input}
                  placeholder="Current password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <input
                  type="password"
                  className={styles.input}
                  placeholder="New password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <input
                  type="password"
                  className={styles.input}
                  placeholder="Re-enter new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              {/* Forgot Password Link */}
              <div className={styles.forgotPasswordContainer}>
                <button
                  type="button"
                  className={styles.forgotPasswordLink}
                  onClick={handleForgotPassword}
                >
                  Forgot your password?
                </button>
              </div>
            </div>

            {/* Change Password Button */}
            <button type="submit" className={styles.saveButton}>
              Change Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default StudentSecurity;