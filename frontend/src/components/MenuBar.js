import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const MenuBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#007bff', color: 'white', display: 'flex', alignItems: 'center' }}>
      <Link to="/dashboard" style={{ color: 'white', marginRight: '20px', textDecoration: 'none' }}>Dashboard</Link>
      <Link to="/add-task" style={{ color: 'white', marginRight: '20px', textDecoration: 'none' }}>Add Task</Link>
      <Link to="/report-issue" style={{ color: 'white', marginRight: '20px', textDecoration: 'none' }}>Report Issue</Link>
      <button 
        onClick={handleLogout} 
        style={{ 
          backgroundColor: 'white', 
          color: '#007bff', 
          border: '1px solid #007bff',
          padding: '5px 10px',
          borderRadius: '5px',
          cursor: 'pointer',
          marginLeft: 'auto' // This aligns the logout button to the right
        }}
      >
        Logout
      </button>
    </nav>
  );
};

export default MenuBar;
