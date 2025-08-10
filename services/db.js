//services/db.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./users.db');

// ساخت جدول یوزرها اگه وجود نداره
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
  )`);
});

module.exports = db;
