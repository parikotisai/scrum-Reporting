import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    try {
      await axios.post('http://localhost:3000/api/auth/signup', { username, password });
      alert('User registered successfully!');
      navigate('/');
    } catch (error) {
      setError('Username already taken. Please choose a different one.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSignup}>
        <h2>Signup</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div>
          <label>Username</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Signup</button>
      </form>
      <p>Already have an account? <Link to="/">Login here</Link></p>
    </div>
  );
};

export default Signup;
