import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import the CSS file for styling

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '', role: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', credentials);
      const { token, user } = response.data;

      // Store the token in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', user.name);

      // Redirect based on role
      if (user.role === "ORGANIZER") {
        navigate('/organizer-dashboard');
      } else {
        navigate('/events');
      }
    } catch (error) {
      console.error(error);
      alert('Login failed');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={credentials.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <select
          name="role"
          value={credentials.role}
          onChange={handleChange}
          required
        >
          <option value="" disabled>Select Role</option>
          <option value="ORGANIZER">Organizer</option>
          <option value="ATTENDEE">Attendee</option>
        </select>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
