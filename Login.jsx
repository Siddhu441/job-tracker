"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import "./login.css"


const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      if (response.ok) {
        const result = await response.json()
        localStorage.setItem("userId", result.id)
        navigate("/dashboard")
      } else {
        const errorText = await response.text()
        setMessage(errorText)
      }
    } catch (error) {
      console.error(error)
      setMessage("Login failed. Please try again.")
    }
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="login-container">
        <h2>Sign In</h2>
        <form onSubmit={handleLogin} className="login-form space-y-5">
          <div>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>

        {message && <p className="error-message">{message}</p>}

        <p className="register-prompt">
          Don't have an account?{" "}
          <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  )
}

export default Login