import { useState, useEffect } from 'react';
import Cell from './Cell';
import '../css/Board.css';

export default function Board({ rows, cols, mines, onGameOver, onWin, onReset }) {
  const [board, setBoard] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [flags, setFlags] = useState(0);

  
};