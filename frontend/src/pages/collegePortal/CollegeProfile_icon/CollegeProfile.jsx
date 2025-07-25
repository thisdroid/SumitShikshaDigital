"use client"

import { useState, useRef, useEffect } from "react"

import { Link, useNavigate } from "react-router-dom"

import styles from "./CollegeProfile.module.css"

import { useSelector, useDispatch } from 'react-redux';
import { setIsOpen } from '../../../slices/collegeProfileUiSlice';

// Static user object

const staticUser = {
  username: "Mr. Hennis Jha",

  email: "hennis.jha@example.com",

  role: "Student",
}

const CollegeProfile = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.collegeProfileUi.isOpen);

  const [user] = useState(staticUser)

  const navigate = useNavigate()

  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        dispatch(setIsOpen(false));
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch]);

  const handleSignOut = () => {
    dispatch(setIsOpen(false));
    navigate("/login");
  };

  return (
    <div className={styles.profileContainer} ref={dropdownRef}>
      <div className={styles.userProfile} onClick={() => dispatch(setIsOpen(!isOpen))}>
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
                <p className={styles.username}>{user.username}</p>

                <p className={styles.useremail}>{user.email}</p>
              </div>
            </div>
          </div>

          <ul className={styles.dropdownMenu}>
            <li>
              <Link to="/CollegeDashboard/CollegeDetails" className={styles.menuItem} onClick={() => dispatch(setIsOpen(false))}>
                <svg className={styles.menuIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                College Details
              </Link>
            </li>

            <li>
              <Link to="/CollegeDashboard/CollegeSecurity" className={styles.menuItem} onClick={() => dispatch(setIsOpen(false))}>
                <svg className={styles.menuIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                College Settings
              </Link>
            </li>

            <li>
            <Link to="/CollegeDashboard/YourPlan" className={styles.menuItem} onClick={() => dispatch(setIsOpen(false))}>
              <svg className={styles.menuIcon} viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24l-5.46-.46L12 2 8.46 8.78 3 9.24l5.46 4.73L5.82 21z" />
              </svg>
              Your Plan
            </Link>
          </li>



            <li className={styles.borderTop}>
              <Link to="/GetHelp" className={styles.menuItem} onClick={() => dispatch(setIsOpen(false))}>
                <span className="material-icons" style={{ marginRight: "0.75rem", fontSize: "20px", color: "#6b7280" }}>
                  help
                </span>
                Get Help
              </Link>
            </li>

            <li className={styles.borderTop}>
              <Link
                to="/CollegeLogin"
                className={styles.menuItem}
                onClick={() => {
                  dispatch(setIsOpen(false));
                  handleSignOut();
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

export default CollegeProfile
