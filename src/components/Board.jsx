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

    const placeMines = (board) => {
        let minesPlaced = 0;
        const newBoard = JSON.parse(JSON.stringify(board));
        
        while (minesPlaced < mines) {
        const row = Math.floor(Math.random() * rows);
        const col = Math.floor(Math.random() * cols);
        
        if (!newBoard[row][col].isMine) {
            newBoard[row][col].isMine = true;
            minesPlaced++;
        }
        }
        
        return newBoard;
    };

};