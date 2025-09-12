import { useState, useEffect } from 'react';
import Cell from './Cell';
import '../css/Board.css';

export default function Board({ rows, cols, mines, onGameOver, onWin, onReset }) {
    const [board, setBoard] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [flags, setFlags] = useState(0);
    const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],           [0, 1],
        [1, -1],  [1, 0],  [1, 1]
    ];

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

    const calculateNumbers = (board) => {
        const newBoard = JSON.parse(JSON.stringify(board));

        for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (!newBoard[row][col].isMine) {
            let count = 0;
            
            directions.forEach(([dx, dy]) => {
                const newRow = row + dx;
                const newCol = col + dy;
                
                // check if cell exists
                if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
                // if mine - add +1
                if (newBoard[newRow][newCol].isMine) {
                    count++;
                }
                }
            });
            
            newBoard[row][col].mineCount = count;
            }
        }
        }
        
        return newBoard;
    };

};