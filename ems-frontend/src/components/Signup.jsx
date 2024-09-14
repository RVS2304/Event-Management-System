import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signup.css'; // Import the CSS file for styling

const Signup = () => {
  const [credentials, setCredentials] = useState({ name: '', email: '', password: '', role: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/register', credentials);
      // localStorage.setItem('token', response.data.token);

      if (credentials.role === "ORGANIZER") {
        navigate('/organizer-dashboard');
      } else {
        navigate('/');
      }
      console.log(response.data);
    } catch (error) {
      console.error(error);
      alert('Signup failed'); // You might want to show more details
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={credentials.name}
          onChange={handleChange}
          placeholder="User Name"
          required
        />
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Signup;
