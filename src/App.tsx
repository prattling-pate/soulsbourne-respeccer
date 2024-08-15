import React, { useState } from 'react';
import './App.css';
import { getGame } from './games';

function App() {
  const [currentGame, setCurrentGame] = useState(getGame('Dark Souls 1'));
  return (
    <div className="App">
        <h1>{`Soulsbourne Respeccer - ${currentGame.name}`}</h1>
    </div>
  );
}

export default App;
