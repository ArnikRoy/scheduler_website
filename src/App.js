import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Scheduler from './components/Scheduler';
import Analytics from './components/Analytics';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <Router>
      <div className="App">
        <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} user={user} />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home isAuthenticated={isAuthenticated} />} />
            <Route 
              path="/login" 
              element={
                isAuthenticated ? 
                <Navigate to="/" replace /> : 
                <Login onLogin={handleLogin} />
              } 
            />
            <Route 
              path="/signup" 
              element={
                isAuthenticated ? 
                <Navigate to="/" replace /> : 
                <Signup onSignup={handleLogin} />
              } 
            />
            <Route 
              path="/scheduler" 
              element={
                isAuthenticated ? 
                <Scheduler user={user} /> : 
                <Navigate to="/login" replace />
              } 
            />
            <Route 
              path="/analytics" 
              element={
                isAuthenticated ? 
                <Analytics user={user} /> : 
                <Navigate to="/login" replace />
              } 
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App; 