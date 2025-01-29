import express from 'express';
import { authenticateJWT } from '../utils/auth.js';
import { db } from '../db.js';

const router = express.Router();

router.get('/history', authenticateJWT, async (req, res) => {
  try {
    const games = await db.all(
      'SELECT game_type, outcome, amount, created_at FROM games WHERE user_id = ? ORDER BY created_at DESC',
      [req.user.id]
    );
    
    res.json(games);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;