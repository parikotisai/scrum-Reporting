import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskList from './TaskList';
import { useNavigate } from 'react-router-dom';
import MenuBar from './MenuBar';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/api/tasks', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setTasks(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          navigate('/');
        }
      }
    };
    fetchTasks();
  }, [navigate]);

  const filteredTasks = tasks.filter(task =>
    filter === 'all' || task.status === filter
  );

  const handleDeleteTask = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3000/api/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div>
      <MenuBar />
      <h2>Dashboard</h2>
      <div>
        <label>Filter tasks by status: </label>
        <select onChange={(e) => setFilter(e.target.value)} value={filter}>
          <option value="all">All</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      {filteredTasks.length === 0 ? (
        <div>
          <p>No tasks available. Please create a new task.</p>
          <button onClick={() => navigate('/add-task')}>Create New Task</button>
        </div>
      ) : (
        <TaskList tasks={filteredTasks} onDelete={handleDeleteTask} />
      )}
    </div>
  );
};

export default Dashboard;
