import { useState, useEffect } from 'react';
import Cell from './Cell';
import '../css/Board.css';

export default function Board({ rows, cols, mines, onGameOver, onWin, theme, themeAssets }) {
    const [board, setBoard] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [flags, setFlags] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);
    const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],           [0, 1],
        [1, -1],  [1, 0],  [1, 1]
    ];

    // Initialization (Start):
    useEffect(() => {
        initializeGame();
    }, [onReset]);


    const initializeGame = () => {
        const newBoard = createNewBoard();
        const boardWithMines = placeMines(newBoard);
        const boardWithNumbers = calculateNumbers(boardWithMines);
        setBoard(boardWithNumbers);
        setGameOver(false);
        setFlags(0);
    };

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

    const revealCell = (row, col) => {
        if (gameOver || board[row][col].isRevealed || board[row][col].isFlagged) {
        return;
        }

        const newBoard = JSON.parse(JSON.stringify(board));
        
        if (newBoard[row][col].isMine) {
        setGameOver(true);
        revealAllMines(newBoard);
        onGameOver(false); //LOSE
        return;
        }

        // Recursive reveal:
        const reveal = (r, c) => {
        if (r < 0 || r >= rows || c < 0 || c >= cols || 
            newBoard[r][c].isRevealed || newBoard[r][c].isFlagged) {
            return;
        }

        newBoard[r][c].isRevealed = true;

        if (newBoard[r][c].mineCount === 0) {
            // reveal neighbour cells
            directions.forEach(([dx, dy]) => {
            reveal(r + dx, c + dy);
            });
        }
        };

        reveal(row, col);

        setBoard(newBoard);
        checkWinCondition(newBoard);
    };

    const revealAllMines = (board) => {
        const newBoard = JSON.parse(JSON.stringify(board));
        for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (newBoard[row][col].isMine) {
            newBoard[row][col].isRevealed = true;
            }
        }
        }
        setBoard(newBoard);
    };

    const toggleFlag = (row, col) => {
        if (gameOver || board[row][col].isRevealed) {
        return;
        }

        const newBoard = JSON.parse(JSON.stringify(board));
        newBoard[row][col].isFlagged = !newBoard[row][col].isFlagged;
        
        setBoard(newBoard);
        setFlags(prev => newBoard[row][col].isFlagged ? prev + 1 : prev - 1);
    };

    const checkWinCondition = (board) => {
        let unrevealedSafeCells = 0;
        
        for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (!board[row][col].isRevealed && !board[row][col].isMine) {
            unrevealedSafeCells++;
            }
        }
        }
        
        if (unrevealedSafeCells === 0) {
        setGameOver(true);
        onWin(true); // WIN
        }
    };

    return (
        <div className="board">
        <div className="game-info">
            <p>Remain to find cats: {mines - flags}</p>
        </div>
        
        <div className="grid">
            {board.map((row, rowIndex) => (
            <div key={rowIndex} className="row">
                {row.map((cell, colIndex) => (
                <Cell
                    key={colIndex}
                    cell={cell}
                    onClick={() => revealCell(rowIndex, colIndex)}
                    onContextMenu={() => toggleFlag(rowIndex, colIndex)}
                />
                ))}
            </div>
            ))}
        </div>
        </div>
    );
};