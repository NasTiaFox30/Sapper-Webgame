import '../css/Cell.css';

export default function Cell({ cell, onClick, onContextMenu, theme, themeAssets }) {  
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
        return themeAssets?.bomb ? (
          <img src={themeAssets.bomb} alt="💣" className="cell-image" />
        ) : '💣';
      }
      return cell.mineCount > 0 ? cell.mineCount : ''; // Number or Empty
    }
    return cell.isFlagged ? (
      themeAssets?.flag ? (
        <img src={themeAssets.flag} alt="🚩" className="cell-image" />
      ) : '🚩'
    ) : '';
  };

  return (
    <div
      className={getCellClass()}
      onClick={handleClick}
      onContextMenu={handleRightClick}
    >
      {getCellContent()}
    </div>
  );
};