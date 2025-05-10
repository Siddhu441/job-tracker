import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashBord';
import Analytics from './pages/Analytics';
import Job from './pages/job';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<UserDashboard/>} /> {/* Route for UserDashboard */}
        <Route path="/analytics" element={<Analytics />} />
      
         <Route path="/jobs" element={<Job />} />
        
      </Routes>
    </Router>
  );
}

export default App;
