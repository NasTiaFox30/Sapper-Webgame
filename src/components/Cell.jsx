import '../css/Cell.css';

export default function Cell({ cell, onClick, onContextMenu }) {
  const handleClick = () => {
    if (!cell.isRevealed && !cell.isFlagged) {
      onClick();
    }
  };

  const handleRightClick = (e) => {
    e.preventDefault();
    if (!cell.isRevealed) {
      onContextMenu();
    }
  };

  const getCellContent = () => {
    if (cell.isRevealed) {
      if (cell.isMine) {
        return '💣';
      }
      return cell.mineCount > 0 ? cell.mineCount : ''; // Number or Empty
    }
    return cell.isFlagged ? '🚩' : ''; // Flag or Empty
  };

  return (
    <div
      className={`cell ${cell.isRevealed ? 'revealed' : ''} ${cell.isFlagged ? 'flagged' : ''}`}
      onClick={handleClick}
      onContextMenu={handleRightClick}
    >
      {getCellContent()}
    </div>
  );
};