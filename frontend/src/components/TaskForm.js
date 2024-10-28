import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('in-progress');
  const [successMessage, setSuccessMessage] = useState(''); // State for success message
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchTask = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`http://localhost:3000/api/tasks/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          const { title, description, status } = response.data;
          setTitle(title);
          setDescription(description);
          setStatus(status);
        } catch (error) {
          console.error('Error fetching task:', error);
        }
      };
      fetchTask();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const taskData = { title, description, status };

      if (id) {
        await axios.put(`http://localhost:3000/api/tasks/${id}`, taskData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      } else {
        await axios.post('http://localhost:3000/api/tasks', taskData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }

      // Set success message and redirect to dashboard after a delay
      setSuccessMessage(id ? 'Task updated successfully!' : 'Task created successfully!');
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000); // Redirect after 2 seconds
    } catch (error) {
      console.error('Error submitting task:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{id ? 'Edit Task' : 'Create Task'}</h2>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <div style={{ marginBottom: '15px' }}>
        <label>Title</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label>Description</label>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label>Status</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div style={{ marginTop: '20px' }}>
        <button type="submit">{id ? 'Update Task' : 'Create Task'}</button>
        <button type="button" onClick={() => navigate('/dashboard')} style={{ marginLeft: '10px' }}>Cancel</button>
      </div>
    </form>
  );
};

export default TaskForm;
