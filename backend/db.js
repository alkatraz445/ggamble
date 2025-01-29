import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import bcrypt from 'bcryptjs';

const DBSOURCE = process.env.DATABASE_URL || 'ggamble.db';

export let db;

export const connectDB = async () => {
  db = await open({
    filename: DBSOURCE,
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT,
      tokens INTEGER DEFAULT 100,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE TABLE IF NOT EXISTS games (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      game_type TEXT,
      outcome TEXT,
      amount INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(user_id) REFERENCES users(id)
    );
  `);
  
  return db;
};

export const addUser = async (username, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await db.run(
    'INSERT INTO users (username, password) VALUES (?, ?)',
    [username, hashedPassword]
  );
  return result.lastID;
};

export const findUser = async (username) => {
  return db.get('SELECT * FROM users WHERE username = ?', [username]);
};

export const updateUserTokens = async (userId, amount) => {
  await db.run(
    'UPDATE users SET tokens = tokens + ? WHERE id = ?',
    [amount, userId]
  );
  return db.get('SELECT tokens FROM users WHERE id = ?', [userId]);
};

export const addGameHistory = async (userId, gameType, outcome, amount) => {
  await db.run(
    'INSERT INTO games (user_id, game_type, outcome, amount) VALUES (?, ?, ?, ?)',
    [userId, gameType, outcome, amount]
  );
};