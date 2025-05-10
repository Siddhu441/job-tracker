"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import "./navbar.css"

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">JobTracker</Link>

        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>

        <div className={`nav-links ${menuOpen ? "active" : ""}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>Dashboard</Link>
          <Link to="/login" onClick={() => setMenuOpen(false)}>Active</Link>
          <Link to="/login" onClick={() => setMenuOpen(false)}>Saved</Link>
          <Link to="/login" onClick={() => setMenuOpen(false)}>Interviews</Link>
          <Link to="/login" onClick={() => setMenuOpen(false)}>Analytics</Link>
          <Link to="/login" onClick={() => setMenuOpen(false)}>Resources</Link>
          <Link to="/login" className="btn" onClick={() => setMenuOpen(false)}>Sign In</Link>
        </div>
      </div>
    </nav>
  )
}
