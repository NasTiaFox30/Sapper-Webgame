import { useState } from 'react';
import Board from './components/Board';
import './css/App.css';

export default function App() {
  const [gameStatus, setGameStatus] = useState('playing');
  const [resetKey, setResetKey] = useState(0);

  const handleGameOver = (isWin) => {
    setGameStatus(isWin ? 'win' : 'lose');
  };

  const handleNewGame = () => {
    setGameStatus('playing');
    setResetKey(prevKey => prevKey + 1);
  };

  return (
    <> App
    </>
  )
}
