import '../css/Cell.css';

export default function Cell({ cell, onClick, onContextMenu }) {
  const handleClick = () => {
    if (!cell.isRevealed && !cell.isFlagged) {
      onClick();
    }
  };


};