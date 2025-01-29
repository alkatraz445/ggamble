import express from 'express';
import { addUser, findUser } from '../db.js';
import { generateTokens } from '../utils/auth.js';
import bcrypt from 'bcryptjs';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await findUser(username);
    
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }
    
    await addUser(username, password);
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await findUser(username);
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const tokens = generateTokens(user);
    res.json({ ...tokens, tokens: user.tokens });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;