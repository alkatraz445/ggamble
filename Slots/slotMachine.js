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
  const [balance, setBalance] = useState(1000); // Początkowy balans
  const [bet, setBet] = useState(0);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Inicjalizacja WebSocket
    const ws = new WebSocket('ws://ggamblereal.duckdns.org'); // tu adres serwera
    setSocket(ws);

    ws.onopen = () => {
      console.log('Połączono z serwerem WebSocket');
      ws.send(JSON.stringify({ type: 'get_balance' }));
    };

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
    setBalance(prev => prev - bet); // Odejmowanie balansu

    simulateRollingEffect(() => {
      const slotMatrix = Array.from({ length: 3 }, () =>
        Array.from({ length: 3 }, () => Math.floor(Math.random() * 3) + 1)
      );

      setMatrix(slotMatrix);

      let multiplier = 1;
      const middleRowSame = slotMatrix[1].every(num => num === slotMatrix[1][0]);

      if (middleRowSame) {
        multiplier += 1;
        if (checkDiagonal(slotMatrix)) {
          multiplier += 1;
        }
        if (checkOtherRows(slotMatrix)) {
          multiplier += 1;
        }
        const winnings = bet * multiplier;
        setBalance(prev => prev + winnings); // Dodanie wygranej
        setMessage(`Wygrana! Mnożnik: ${multiplier}, Wygrana: ${winnings}`);
        socket && socket.send(JSON.stringify({ type: 'update_balance', balance: balance + winnings }));
      } else {
        setMessage("Spróbuj ponownie.");
      }
      setIsRolling(false);
    });
  };

  const simulateRollingEffect = (callback) => {
    const intervalTime = 100;
    let steps = 0;
    const maxSteps = 20;
    const interval = setInterval(() => {
      setMatrix([generateRandomRow(), generateRandomRow(), generateRandomRow()]);
      steps++;
      if (steps >= maxSteps) {
        clearInterval(interval);
        callback();
      }
    }, intervalTime);
  };

  const checkDiagonal = (matrix) => {
    const topLeftToBottomRight = matrix[0][0] === matrix[1][1] && matrix[1][1] === matrix[2][2];
    const topRightToBottomLeft = matrix[0][2] === matrix[1][1] && matrix[1][1] === matrix[2][0];
    return topLeftToBottomRight || topRightToBottomLeft;
  };

  const checkOtherRows = (matrix) => {
    const topRowSame = matrix[0].every(num => num === matrix[0][0]);
    const bottomRowSame = matrix[2].every(num => num === matrix[2][0]);
    return topRowSame || bottomRowSame;
  };

  return (
    <div className="slot-machine-container">
      <h2>Balans: {balance} zł</h2>
      <input
        type="number"
        placeholder="Stawka"
        value={bet}
        onChange={(e) => setBet(Number(e.target.value))}
        disabled={isRolling}
      />
      <button className="draw-button" onClick={rollSlots} disabled={isRolling}>Wylosuj</button>
      <div className="slot-grid">
        {matrix.map((row, rowIndex) => (
          <div key={rowIndex} className="slot-row">
            {row.map((num, colIndex) => (
              <span key={colIndex} className="slot-item">
                {EMOJI_MAP[num] || '❓'}
              </span>
            ))}
          </div>
        ))}
      </div>
      <div className="message">{message}</div>
    </div>
  );
};

export default SlotMachine;
