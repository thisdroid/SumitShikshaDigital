import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Profile.module.css';

// Static user object
const staticUser = {
  username: 'user',
  email: 'user@example.com',
};

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user] = useState(staticUser);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSignOut = () => {
    setIsOpen(false);
    navigate('/login');
  };

  return (
    <div className={styles.relative} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={styles.profileButton}
      >
        <img
          src={'/images/default-user.png'} // Replace with your profile image path
          alt="Profile"
          className={styles.profileImage}
        />
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          <div className={styles.dropdownHeader}>
            <div className={styles.flexContainer}>
              <img
                src={'/images/default-user.png'}
                alt="User"
                className={styles.profileImage}
              />
              <div>
                <p className={styles.username}>{user.username}</p>
                <p className={styles.useremail}>{user.email}</p>
              </div>
            </div>
          </div>
          <ul className={styles.dropdownMenu}>
            <li>
              <Link
                to="/StudentDashboard/PersonalDetails"
                className={styles.menuItem}
                onClick={() => setIsOpen(false)}
              >
                <svg className={styles.menuIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Personal Details
              </Link>
            </li>
            <li>
              <Link
                to="/StudentDashboard/StudentSecurity"
                className={styles.menuItem}
                onClick={() => setIsOpen(false)}
              >
                <svg className={styles.menuIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Security Settings
              </Link>
            </li>
            <li className={styles.borderTop}>
              <button
                onClick={handleSignOut}
                className={styles.signOutButton}
              >
                <svg className={styles.menuIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Get Help
              </button>
            </li>
            <li className={styles.borderTop}>
              <Link
                to="/StudentLogin"
                className={styles.menuItem}
                onClick={() => setIsOpen(false)}
              >
              <button
                onClick={handleSignOut}
                className={styles.signOutButton}
              >
                <svg className={styles.menuIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Profile;