import { useState, useEffect } from 'react';
import Board from './components/Board';
import ThemeSelector from './components/ThemeSelector';
import './css/App.css';
import { themesConfig, getThemeAssets } from './themes/themesStorage';

export default function App() {
  const [gameStatus, setGameStatus] = useState('playing');
  const [resetKey, setResetKey] = useState(0);
  const [theme, setTheme] = useState('cybersweeper');
  const [themeAssets, setThemeAssets] = useState({});
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  useEffect(() => {
    const loadAssets = async () => {
      try {
        setAssetsLoaded(false);
        const assets = await getThemeAssets(theme);
        setThemeAssets(assets);
        setAssetsLoaded(true);
      } catch (error) {
        console.error('Failed to load theme assets:', error);
        setAssetsLoaded(true);
      }
    };

    loadAssets();
  }, [theme]);

  const handleGameOver = (isWin) => {
    setGameStatus(isWin ? 'win' : 'lose');
  };

  const handleNewGame = () => {
    setGameStatus('playing');
    setResetKey(prevKey => prevKey + 1);
  };

  return (
    <div className="app">
      <h1>Sapper</h1>
      
      {gameStatus === 'win' && (
        <div className="game-message win">
          <h2>Gratulation!</h2>
          <button onClick={handleNewGame}>One more round?</button>
        </div>
      )}
      
      {gameStatus === 'lose' && (
        <div className="game-message lose">
          <h2>You lose!</h2>
          <button onClick={handleNewGame}>Retry!</button>
        </div>
      )}
       
      <ThemeSelector currentTheme={theme} onThemeChange={handleThemeChange} />
      
      {assetsLoaded && (
        <Board 
          key={resetKey}
          rows={9} 
          cols={9} 
          mines={10} 
          onGameOver={() => handleGameOver(false)}
          onWin={() => handleGameOver(true)}
        />
      )}
    </div>
  );
}