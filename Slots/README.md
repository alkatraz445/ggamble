# Dokumentacja dla aplikacji "Jednoręki Bandyta"

## 1. Opis projektu
Aplikacja "Jednoręki Bandyta" to prosta gra losowa, w której użytkownik może obstawiać zakłady i losować symbole w maszynie slotowej. Gra obsługuje połączenie WebSocket do aktualizacji salda użytkownika w czasie rzeczywistym.

## 2. Struktura plików

```
📂 projekt
├── app.js                # Główny komponent aplikacji
├── slotMachine.js        # Logika gry oraz obsługa losowania, zakładów i WebSocket
├── app.css               # Style dla głównego kontenera aplikacji
└── slotMachine.css       # Style dla komponentu maszyny slotowej
```

## 3. Struktura aplikacji

### 3.1. `App.js` – Główny komponent aplikacji

#### Zawartość:
- Importuje `SlotMachine` oraz style `app.css`.
- Renderuje tytuł gry oraz komponent `SlotMachine`.

#### Kod:
```jsx
import React from 'react';
import SlotMachine from './slotMachine';
import './app.css';

const App = () => {
  return (
    <div className="app-container">
      <h1 className="app-title">Jednoręki Bandyta</h1>
      <SlotMachine />
    </div>
  );
};

export default App;
```

### 3.2. `SlotMachine.js` – Logika gry

#### Najważniejsze funkcjonalności:
- Przechowuje stan gry (`matrix`, `message`, `isRolling`, `balance`, `bet`).
- Obsługuje połączenie WebSocket do aktualizacji salda użytkownika.
- Realizuje losowanie symboli i sprawdza, czy użytkownik wygrał.
- Symuluje efekt "kręcenia bębnów" poprzez animację losowania.

#### Główne metody:
- `generateRandomRow()` – Tworzy losowy wiersz symboli.
- `rollSlots()` – Obsługuje losowanie i sprawdza wygraną.
- `simulateRollingEffect(callback)` – Animacja losowania.
- `checkDiagonal(matrix)`, `checkOtherRows(matrix)` – Sprawdzają warunki wygranej.

#### Kod:
```jsx
import React, { useState, useEffect } from "react";
import './slotMachine.css';

const EMOJI_MAP = {
  1: '🍎',
  2: '🍊',
  3: '🍋'
};

const generateRandomRow = () => Array.from({ length: 3 }, () => Math.floor(Math.random() * 3) + 1);

const SlotMachine = () => {
  const [matrix, setMatrix] = useState([generateRandomRow(), generateRandomRow(), generateRandomRow()]);
  const [message, setMessage] = useState('');
  const [isRolling, setIsRolling] = useState(false);
  const [balance, setBalance] = useState(1000);
  const [bet, setBet] = useState(0);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('ws://ggamblereal.duckdns.org');
    setSocket(ws);
    ws.onopen = () => ws.send(JSON.stringify({ type: 'get_balance' }));
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'balance_update') {
        setBalance(data.balance);
      }
    };
    ws.onclose = () => console.log('Rozłączono z WebSocket');
    return () => ws.close();
  }, []);

  const rollSlots = () => {
    if (bet <= 0 || bet > balance) {
      setMessage('Nieprawidłowa stawka!');
      return;
    }
    setIsRolling(true);
    setMessage("Losowanie...");
    setBalance(prev => prev - bet);
    simulateRollingEffect(() => {
      const slotMatrix = [generateRandomRow(), generateRandomRow(), generateRandomRow()];
      let multiplier = 1;
      const middleRowSame = slotMatrix[1].every(num => num === slotMatrix[1][0]);
      if (middleRowSame) {
        multiplier += 1;
        if (checkDiagonal(slotMatrix)) multiplier += 1;
        if (checkOtherRows(slotMatrix)) multiplier += 1;
        const winnings = bet * multiplier;
        setBalance(prev => prev + winnings);
        setMessage(`Wygrana! Mnożnik: ${multiplier}, Wygrana: ${winnings}`);
        socket && socket.send(JSON.stringify({ type: 'update_balance', balance: balance + winnings }));
      } else {
        setMessage("Spróbuj ponownie.");
      }
      setMatrix(slotMatrix);
      setIsRolling(false);
    });
  };

  return (
    <div className="slot-machine-container">
      <h2>Balans: {balance} zł</h2>
      <input type="number" placeholder="Stawka" value={bet} onChange={(e) => setBet(Number(e.target.value))} disabled={isRolling} />
      <button className="draw-button" onClick={rollSlots} disabled={isRolling}>Wylosuj</button>
      <div className="slot-grid">
        {matrix.map((row, rowIndex) => (
          <div key={rowIndex} className="slot-row">
            {row.map((num, colIndex) => (
              <span key={colIndex} className="slot-item">{EMOJI_MAP[num] || '❓'}</span>
            ))}
          </div>
        ))}
      </div>
      <div className="message">{message}</div>
    </div>
  );
};

export default SlotMachine;
```

## 3.3. Style aplikacji

### `app.css` – Style ogólne
```css
.app-container {
    text-align: center;
    font-family: Arial, sans-serif;
}
.app-title {
    font-size: 2em;
    color: #333;
    margin-bottom: 20px;
}
```

### `slotMachine.css` – Style maszyny slotowej
```css
.slot-machine-container {
    border: 2px solid #333;
    padding: 20px;
    border-radius: 10px;
    background: #f7f7f7;
    display: inline-block;
}
.slot-grid {
    margin: 20px 0;
}
.slot-row {
    display: flex;
    justify-content: center;
    margin: 5px 0;
}
.slot-item {
    font-size: 1.5em;
    margin: 0 10px;
    padding: 5px;
    width: 40px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 5px;
}
