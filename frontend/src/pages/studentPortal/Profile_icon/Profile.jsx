"use client"

import React from 'react';
import { useSelector } from 'react-redux';

import { Link, useNavigate } from "react-router-dom"

import styles from "./Profile.module.css"

// Static user object

const staticUser = {
  username: "Mr. Hennis Jha",

  email: "hennis.jha@example.com",

  role: "Student",
}

const Profile = () => {
  const user = useSelector((state) => state.user.user);
  const [isOpen, setIsOpen] = React.useState(false)

  const navigate = useNavigate()

  const dropdownRef = React.useRef(null)

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleSignOut = () => {
    setIsOpen(false)

    navigate("/login")
  }

  return (
    <div className={styles.profileContainer} ref={dropdownRef}>
      <div className={styles.userProfile} onClick={() => setIsOpen(!isOpen)}>
        <img src="/images/default-user.png" alt="User" className={styles.userAvatar} />

        {/* Hide the user info by default - only show avatar and dropdown arrow */}
        {/* <div className={styles.userInfo}>

          <span className={styles.userName}>{user.username}</span>

          <span className={styles.userRole}>{user.role}</span>

        </div> */}

        <span className="material-icons">keyboard_arrow_down</span>
      </div>

      {isOpen && (
        <div className={styles.dropdown}>
          <div className={styles.dropdownHeader}>
            <div className={styles.flexContainer}>
              <img src="/images/default-user.png" alt="User" className={styles.dropdownProfileImage} />

              <div>
                <p className={styles.username}>{user?.username || "Guest"}</p>

                <p className={styles.useremail}>{user?.email || "No email"}</p>
              </div>
            </div>
          </div>

          <ul className={styles.dropdownMenu}>
            <li>
              <Link to="/StudentDashboard/PersonalDetails" className={styles.menuItem} onClick={() => setIsOpen(false)}>
                <svg className={styles.menuIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Personal Details
              </Link>
            </li>

            <li>
              <Link to="/StudentDashboard/StudentSecurity" className={styles.menuItem} onClick={() => setIsOpen(false)}>
                <svg className={styles.menuIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                Security Settings
              </Link>
            </li>

            <li className={styles.borderTop}>
              <Link to="/GetHelp" className={styles.menuItem} onClick={() => setIsOpen(false)}>
                <span className="material-icons" style={{ marginRight: "0.75rem", fontSize: "20px", color: "#6b7280" }}>
                  help
                </span>
                Get Help
              </Link>
            </li>

            <li className={styles.borderTop}>
              <Link
                to="/StudentLogin"
                className={styles.menuItem}
                onClick={() => {
                  setIsOpen(false)

                  handleSignOut()
                }}
              >
                <svg className={styles.menuIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Logout
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default Profile
