import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import TaskForm from './components/TaskForm';
import IssuesForm from './components/IssuesForm';
import TaskList from './components/TaskList';

const App = () => {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-task" element={<TaskForm />} />
          <Route path="/report-issue" element={<IssuesForm />} />
          <Route path="/task-list" element={<TaskList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
