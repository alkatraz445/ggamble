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
