import { useState, useEffect } from 'react';
import Board from './components/Board';
import ThemeSelector from './components/ThemeSelector';
import './css/App.css';
import { themesConfig, getThemeAssets, getThemeAudio } from './themes/themesStorage';
import Footer from './components/Footer';

export default function App() {
  const [gameStatus, setGameStatus] = useState('playing');
  const [resetKey, setResetKey] = useState(0);
  const [theme, setTheme] = useState('cybersweeper');
  const [themeAssets, setThemeAssets] = useState({});
  const [themeAudio, setThemeAudio] = useState({});
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [boardSize, setBoardSize] = useState({ rows: 9, cols: 9 });
  const [isMobile, setIsMobile] = useState(false);
  const [showThemeSelector, setShowThemeSelector] = useState(false);

  useEffect(() => {
    const loadAssets = async () => {
      try {
        setAssetsLoaded(false);
        const assets = await getThemeAssets(theme);
        const audio = await getThemeAudio(theme);
        setThemeAssets(assets);
        setThemeAudio(audio);
        setAssetsLoaded(true);
      } catch (error) {
        console.error('Failed to load theme assets:', error);
        setAssetsLoaded(true);
      }
    };

    loadAssets();
  }, [theme]);

  useEffect(() => {
    const calculateBoardSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      const isMobileDevice = width <= 1024;
      setIsMobile(isMobileDevice);

      const isPortrait = height > width;

      if (isMobileDevice) {
        if (isPortrait) {
          if (height <= 680) {
            return { rows: 8, cols: 6 };
          } else if (height <= 800) {
            return { rows: 9, cols: 6 };
          } else {
            return { rows: 10, cols: 6 };
          }
        } else {
          return { rows: 8, cols: 10 };
        }
      } else {
        if (width <= 1280) {
          return { rows: 9, cols: 9 };
        } else if (width <= 1920) {
          return { rows: 12, cols: 12 };
        } else {
          return { rows: 16, cols: 16 };
        }
      }
    };

    const handleResize = () => {
      setTimeout(() => {
        setBoardSize(calculateBoardSize());
      }, 100);
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

// play sounds
  const playSound = (soundFile) => {
    const audio = new Audio(soundFile);
    audio.play().catch(error => console.error("Audio playback failed:", error));
  };

  const handleGameOver = (isWin) => {
    setGameStatus(isWin ? 'win' : 'lose');
    if (isWin) {
      playSound(themeAudio.win);
    } else {
      playSound(themeAudio.lose);
    }
  };

  const handleNewGame = () => {
    setGameStatus('playing');
    setResetKey(prevKey => prevKey + 1);
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    if (isMobile) {
      setShowThemeSelector(false);
    }
  };

  const toggleThemeSelector = () => {
    if (isMobile) {
      setShowThemeSelector(prev => !prev);
    }
  };

  const minesCount = Math.floor((boardSize.rows * boardSize.cols) * 0.15);

  return (
    <div className={`app theme-${theme}`}>
      <h1 onClick={toggleThemeSelector}>
        {themesConfig[theme]?.name}
      </h1>
      
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
      
      {(!isMobile || showThemeSelector) && (
        <ThemeSelector currentTheme={theme} onThemeChange={handleThemeChange} />
      )}
      
      {assetsLoaded && (
        <Board 
          key={`${resetKey}-${boardSize.rows}-${boardSize.cols}`}
          rows={boardSize.rows} 
          cols={boardSize.cols} 
          mines={minesCount}
          onGameOver={() => handleGameOver(false)}
          onWin={() => handleGameOver(true)}
          theme={theme}
          themeAssets={themeAssets}
        />
      )}

      <Footer/>
    </div>
  );
}