// const db = require('../config/db.config');

// const User = {
//   create: (user, callback) => {
//     const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
//     db.query(query, [user.username, user.password], callback);
//   },
//   findByUsername: (username, callback) => {
//     const query = 'SELECT * FROM users WHERE username = ?';
//     db.query(query, [username], callback);
//   }
// };

// module.exports = User;


const db = require('../config/db.config');
const Joi = require('joi');

const User = {
  create: async (user) => {
    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    return db.execute(query, [user.username, user.password]);
  },
  findByUsername: async (username) => {
    const query = 'SELECT * FROM users WHERE username = ?';
    const [rows] = await db.execute(query, [username]);
    return rows[0];
  },
  validate: (user) => {
    const schema = Joi.object({
      username: Joi.string().min(3).required(),
      password: Joi.string().min(6).required()
    });
    return schema.validate(user);
  }
};

module.exports = User;
