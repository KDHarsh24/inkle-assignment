import './Navbar.css'
import { FiSun, FiMoon } from 'react-icons/fi'

export default function Navbar({ theme, onToggleTheme }) {
  return (
    <nav className="navbar">
      <div className="logo">inkle</div>
      <button  className={`theme-switch ${theme}`}  onClick={onToggleTheme} aria-label="Toggle theme">
        <span className="switch-track">
          <span className="switch-thumb">
            {theme === 'light' ? <FiSun size={14} /> : <FiMoon size={14} />}
          </span>
        </span>
      </button>
    </nav>
  )
}
