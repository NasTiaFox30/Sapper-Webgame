import '../css/ThemeSelector.css';
import { themesConfig } from '../themes/themesStorage';

export default function ThemeSelector({ currentTheme, onThemeChange }) {
  const themes = Object.values(themesConfig);

  return (
    <div className="theme-selector">
      <h4>Theme: </h4>
      {themes.map(theme => (
        <button
          key={theme.styles}
          className={`theme-btn ${currentTheme === theme.styles ? 'active' : ''}`}
          onClick={() => onThemeChange(theme.styles)}
          title={theme.name}
        >
          {theme.preview}
        </button>
      ))}
    </div>
  );
}