import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './navbar.css';


const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Left Section */}
      <div className="left-section">
        <div className="logo">
          <Link to="/">
            <img src="/images/logo_latest.png" className="logo-img" alt="Logo" />
          </Link>
        </div>

        <button className="explore-btn">
          Explore
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="#0066cc"
          >
            <path d="M7 10l5 5 5-5z"></path>
          </svg>
        </button>

        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="What do you want to learn?"
            autoComplete="off"
          />
          <button className="search-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="white"
            >
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Center Section */}
      <div className="center-section">
        <NavLink to="/" className="nav-link" end>
          Home
        </NavLink>
        <span className="divider">|</span>
        <NavLink to="/Student/" className="nav-link">
          Student
        </NavLink>
        <span className="divider">|</span>
        <NavLink to="/College/" className="nav-link">
          College
        </NavLink>
        <span className="divider">|</span>
        <NavLink to="/Training" className="nav-link">
          Training
        </NavLink>
      </div>

      {/* Right Section */}
      <div className="right-section">
        <Link to="/StudentLogin">
          <button className="login-btn">Log in</button>
        </Link>
        <Link to="/StudentSignup">
          <button className="signup-btn">Sign Up</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
