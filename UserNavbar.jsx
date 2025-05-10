"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./UserNavbar.css"


const UserNavbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    // Clear user session/token
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    navigate("/login")
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/dashboard" className="logo-link">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="logo-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
            </svg>
            <span className="logo-text">JobPortal</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="desktop-nav">
          <Link to="/dashboard" className="nav-link">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="nav-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            <span>Dashboard</span>
          </Link>
          <Link to="/jobs" className="nav-link">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="nav-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
            </svg>
            <span>My Jobs</span>
          </Link>
          <Link to="/analytics" className="nav-link">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="nav-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="20" x2="18" y2="10"></line>
              <line x1="12" y1="20" x2="12" y2="4"></line>
              <line x1="6" y1="20" x2="6" y2="14"></line>
            </svg>
            <span>Analytics</span>
          </Link>
          <Link to="/resources" className="nav-link">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="nav-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
            </svg>
            <span>Resources</span>
          </Link>
          <div className="user-menu">
            <div className="user-menu-trigger">
              <div className="user-avatar">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="user-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <span className="username">Account</span>
            </div>
            <div className="user-dropdown">
              <Link to="/profile" className="dropdown-item">
                Profile
              </Link>
              <Link to="/settings" className="dropdown-item">
                Settings
              </Link>
              <button onClick={handleLogout} className="dropdown-item logout-btn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="logout-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu button */}
        <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="menu-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="menu-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          <Link to="/dashboard" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
            Dashboard
          </Link>
          <Link to="/jobs" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
            My Jobs
          </Link>
          <Link to="/analytics" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
            Analytics
          </Link>
          <Link to="/resources" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
            Resources
          </Link>
          <Link to="/profile" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
            Profile
          </Link>
          <Link to="/settings" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
            Settings
          </Link>
          <button
            onClick={() => {
              handleLogout()
              setMobileMenuOpen(false)
            }}
            className="mobile-nav-link logout-mobile"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  )
}

export default UserNavbar
