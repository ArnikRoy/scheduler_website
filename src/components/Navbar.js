import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ isAuthenticated, onLogout, user }) {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-brand">
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
            Scheduler App
          </Link>
        </div>
        <div className="navbar-nav">
          {isAuthenticated ? (
            <>
              <span style={{ color: 'white', marginRight: '20px' }}>
                Welcome, {user?.name || 'User'}!
              </span>
              <Link to="/scheduler" className="nav-link">
                Scheduler
              </Link>
              <Link to="/analytics" className="nav-link">
                Analytics
              </Link>
              <button 
                onClick={onLogout} 
                className="nav-link" 
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/signup" className="nav-link">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 