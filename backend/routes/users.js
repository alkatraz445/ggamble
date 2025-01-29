import express from 'express';
import { authenticateJWT } from '../utils/auth.js';
import { db } from '../db.js';

const router = express.Router();

router.get('/me', authenticateJWT, async (req, res) => {
  try {
    const user = await db.get(
      'SELECT id, username, tokens, created_at FROM users WHERE id = ?',
      [req.user.id]
    );
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;