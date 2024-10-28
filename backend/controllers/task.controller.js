const Task = require('../models/task.model');
const { validationResult } = require('express-validator');

// Create a new task
exports.createTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, description, status } = req.body;
  const userId = req.user.id;

  try {
    await Task.create({ user_id: userId, title, description, status });
    res.status(201).json({ message: 'Task created successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};

// Get all tasks for the logged-in user
exports.getAllTasks = async (req, res) => {
  const userId = req.user.id;

  try {
    const tasks = await Task.getAllByUser(userId);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};

// Update a task by ID
exports.updateTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const { title, description, status } = req.body;

  try {
    await Task.update({ id, title, description, status });
    res.json({ message: 'Task updated successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};

// Delete a task by ID
exports.deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    await Task.delete(id);
    res.json({ message: 'Task deleted successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};
