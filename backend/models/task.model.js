const db = require('../config/db.config');
const Joi = require('joi');

const Task = {
  create: async (task) => {
    const query = 'INSERT INTO tasks (user_id, title, description, status) VALUES (?, ?, ?, ?)';
    return db.execute(query, [task.user_id, task.title, task.description, task.status]);
  },
  getAllByUser: async (userId) => {
    const query = 'SELECT * FROM tasks WHERE user_id = ?';
    const [rows] = await db.execute(query, [userId]);
    return rows;
  },
  update: async (task) => {
    const query = 'UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?';
    return db.execute(query, [task.title, task.description, task.status, task.id]);
  },
  delete: async (id) => {
    const query = 'DELETE FROM tasks WHERE id = ?';
    return db.execute(query, [id]);
  },
  validate: (task) => {
    const schema = Joi.object({
      title: Joi.string().min(3).required(),
      description: Joi.string().allow('').optional(),
      status: Joi.string().valid('in-progress', 'completed').required()
    });
    return schema.validate(task);
  }
};

module.exports = Task;
