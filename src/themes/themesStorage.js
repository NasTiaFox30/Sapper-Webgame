// Themes:
export const themesConfig = {
  cybersweeper: {
    name: 'CyberSweeper',
    preview: '👾',
    assets: {
      cell: import('../assets/sprites/cybersweeper/cell.png'),
      flag: import('../assets/sprites/cybersweeper/flag.gif'),
      bomb: import('../assets/sprites/cybersweeper/bomb.gif'),
      reset: import('../assets/sprites/cybersweeper/reset.png'),
    },
    sounds: {
      win: import('../assets/audio/cybersweeper/win.mp3'),
      lose: import('../assets/audio/cybersweeper/lose.mp3'),
    },
    styles: 'cybersweeper' // css
  },
  meowmine: {
    name: 'MeowMine',
    preview: '🐭',
    assets: {
      cell: import('../assets/sprites/meowmine/cell.png'),
      flag: import('../assets/sprites/meowmine/flag.png'),
      bomb: import('../assets/sprites/meowmine/bomb.png'),
      reset: import('../assets/sprites/meowmine/reset.png'),
    },
    sounds: {
      win: import('../assets/audio/meowmine/win.mp3'),
      lose: import('../assets/audio/meowmine/lose.wav'),
    },
    styles: 'meowmine' //css
  },
  classic: {
    name: 'Classic',
    preview: '🎮',
    assets: {
      // used classic icons
    },
    styles: 'classic' // css
  }
};

export const getThemeAssets = async (themeName) => {
  const theme = themesConfig[themeName];
  const assets = {};
  
  for (const [key, value] of Object.entries(theme.assets)) {
    assets[key] = (await value).default;
  }
  
  return assets;
};
export const getThemeAudio = async (themeName) => {
  const theme = themesConfig[themeName];
  const sounds = {};

  if (!theme.sounds) return sounds;

  for (const [key, value] of Object.entries(theme.sounds)) {
    sounds[key] = (await value).default;
  }

  return sounds;
};