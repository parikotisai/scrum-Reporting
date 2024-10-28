import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const IssuesForm = () => {
  const [issueTitle, setIssueTitle] = useState('');
  const [description, setDescription] = useState('');
  const [screenshot, setScreenshot] = useState(null);
  const [successMessage, setSuccessMessage] = useState(''); // State for success message
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setScreenshot(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', issueTitle);
    formData.append('description', description);
    if (screenshot) {
      formData.append('screenshot', screenshot);
    }

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:3000/api/issues', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccessMessage('Issue reported successfully!');
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000); // Redirect to dashboard after 2 seconds
    } catch (error) {
      console.error('Error reporting issue:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Report an Issue</h2>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <div>
        <label>Issue Title</label>
        <input
          type="text"
          value={issueTitle}
          onChange={(e) => setIssueTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Screenshot (optional)</label>
        <input type="file" onChange={handleFileChange} />
      </div>
      <button type="submit">Report Issue</button>
      <button type="button" onClick={() => navigate('/dashboard')} style={{ marginLeft: '10px' }}>
        Cancel
      </button>
    </form>
  );
};

export default IssuesForm;
