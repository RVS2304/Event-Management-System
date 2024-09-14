import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file for styling

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogIn = () => {
    navigate('/login');
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/create-event">Create Event</Link>
      </div>
      <div className="nav-buttons">
        <button onClick={handleLogIn}>Login</button>
        <button onClick={handleSignup}>Signup</button>
      </div>
    </nav>
  );
};

export default Navbar;
