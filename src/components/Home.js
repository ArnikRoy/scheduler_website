import React from 'react';
import { Link } from 'react-router-dom';

function Home({ isAuthenticated }) {
  return (
    <div>
      <div className="home-hero">
        <h1>Welcome to Scheduler App</h1>
        <p>Organize and manage your scheduled posts with ease</p>
        {isAuthenticated ? (
          <Link to="/scheduler" className="btn btn-primary">
            Go to Scheduler
          </Link>
        ) : (
          <div>
            <Link to="/login" className="btn btn-primary" style={{ marginRight: '10px' }}>
              Login
            </Link>
            <Link to="/signup" className="btn btn-primary">
              Sign Up
            </Link>
          </div>
        )}
      </div>

      <div className="home-features">
        <div className="feature-card">
          <h3>📅 Calendar View</h3>
          <p>View all your scheduled posts in an intuitive calendar interface. Easily see what's coming up and manage your content schedule.</p>
        </div>
        <div className="feature-card">
          <h3>✅ Simple Management</h3>
          <p>Approve or cancel scheduled posts with just one click. Keep your content pipeline organized and efficient.</p>
        </div>
        <div className="feature-card">
          <h3>🔒 Secure Access</h3>
          <p>Your content is protected with secure authentication. Only you can manage your scheduled posts.</p>
        </div>
      </div>
    </div>
  );
}

export default Home; 