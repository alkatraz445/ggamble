import jwt from 'jsonwebtoken';
import { db } from '../db.js';

const JWT_SECRET = process.env.JWT_SECRET;

export const handleWebSocket = (wss) => {
  wss.on('connection', async (ws, req) => {
    const token = req.url.split('token=')[1];
    
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      const user = await db.get(
        'SELECT * FROM users WHERE username = ?',
        [decoded.username]
      );
      
      if (!user) throw new Error('User not found');
      ws.user = user;

      ws.on('message', async (message) => {
        const data = JSON.parse(message);
        if (data.type === 'coinflip') {
          await handleCoinflip(ws, data);
        }
      });

    } catch (err) {
      ws.close(1008, 'Authentication failed');
    }
  });
};

const handleCoinflip = async (ws, data) => {
  try {
    if (ws.user.tokens < data.amount) {
      return ws.send(JSON.stringify({ error: 'Insufficient tokens' }));
    }

    const result = Math.random() < 0.5 ? 'heads' : 'tails';
    const win = result === data.choice;
    const amountChange = win ? data.amount : -data.amount;

    await db.run('BEGIN TRANSACTION');
    
    await db.run(
      'UPDATE users SET tokens = tokens + ? WHERE id = ?',
      [amountChange, ws.user.id]
    );
    
    await db.run(
      'INSERT INTO games (user_id, game_type, outcome, amount) VALUES (?, ?, ?, ?)',
      [ws.user.id, 'coinflip', win ? 'win' : 'loss', data.amount]
    );
    
    await db.run('COMMIT');

    const updatedUser = await db.get(
      'SELECT tokens FROM users WHERE id = ?',
      [ws.user.id]
    );

    ws.send(JSON.stringify({
      type: 'coinflip-result',
      result,
      win,
      newBalance: updatedUser.tokens
    }));

  } catch (error) {
    await db.run('ROLLBACK');
    ws.send(JSON.stringify({ error: 'Game error' }));
  }
};