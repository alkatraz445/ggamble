# GGamble Backend

Backend system for educational gambling platform with real-time gaming features.

## Features

- **REST API** for user management and game operations
- **WebSocket** support for real-time gaming
- **JWT Authentication** with access/refresh tokens
- **SQLite** database with transactions
- Educational content integration points
- CoinFlip game example implementation

## Installation

1. Clone repository:
```bash
git clone https://github.com/yourusername/ggamble-backend.git
cd backend
```

2. Install dependencies:
```bash
npm install express sqlite3 bcryptjs jsonwebtoken ws cors dotenv
```

3. Create `.env` file:
```ini
PORT=5000
JWT_SECRET=your_strong_secret_here
JWT_REFRESH_SECRET=your_strong_refresh_secret_here
DATABASE_URL=./database.db
```

4. Start server:
```bash
node server.js
```

## API Documentation

### Authentication

| Method | Path          | Description        |
|--------|---------------|--------------------|
| POST   | /api/auth/register | User registration |
| POST   | /api/auth/login    | User login        |

**Registration Request:**
```json
{
  "username": "testuser",
  "password": "securepassword123"
}
```

**Login Response:**
```json
{
  "accessToken": "eyJhbGci...",
  "refreshToken": "eyJhbGci...",
  "tokens": 100
}
```

### Users

| Method | Path          | Description          |
|--------|---------------|----------------------|
| GET    | /api/users/me | Get current user data|

**Response:**
```json
{
  "username": "testuser",
  "tokens": 100,
  "created_at": "2023-07-20 12:00:00"
}
```

### Games

| Method | Path            | Description         |
|--------|-----------------|---------------------|
| GET    | /api/games/history | Get game history   |

## WebSocket Documentation

**Endpoint:** `ws://localhost:5000`

**Authentication:**
```javascript
const ws = new WebSocket(`ws://localhost:5000?token=${accessToken}`);
```

### CoinFlip Game

**Send:**
```json
{
  "type": "coinflip",
  "amount": 50,
  "choice": "heads"
}
```

**Receive:**
```json
{
  "type": "coinflip-result",
  "result": "heads",
  "win": true,
  "newBalance": 150
}
```

## Database Schema

**Users Table:**
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE,
  password TEXT,
  tokens INTEGER DEFAULT 100,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

**Games Table:**
```sql
CREATE TABLE games (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  game_type TEXT,
  outcome TEXT,
  amount INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(user_id) REFERENCES users(id)
);
```

## Testing

1. **API Testing** (with curl):
```bash
# Registration
curl -X POST -H "Content-Type: application/json" -d '{"username":"testuser","password":"testpass"}' http://localhost:<PORT>/api/auth/register

# Login
curl -X POST -H "Content-Type: application/json" -d '{"username":"testuser","password":"testpass"}' http://localhost:<PORT>/api/auth/login
```

2. **WebSocket Testing**:
```bash
wscat -c "ws://localhost:<PORT>?token=YOUR_JWT_TOKEN"
> {"type": "coinflip", "amount": 50, "choice": "heads"}
```