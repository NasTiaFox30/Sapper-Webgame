import { useState, useEffect } from 'react';
import Cell from './Cell';
import '../css/Board.css';

export default function Board({ rows, cols, mines, onGameOver, onWin, onReset }) {
  const [board, setBoard] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [flags, setFlags] = useState(0);

  const createNewBoard = () => {
    return Array(rows).fill().map(() => 
      Array(cols).fill().map(() => ({
        isRevealed: false,
        isFlagged: false,
        isMine: false,
        mineCount: 0
      }))
    );
  };

  
};