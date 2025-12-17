// Top Navbar component

import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Moon, Sun, LogOut, User } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import { ThemeContext } from '../../context/ThemeContext';
import Button from '../ui/Button';

function Navbar({ onMenuToggle }) {
  const { user, logout } = useContext(AuthContext);
  const { isDark, toggleTheme } = useContext(ThemeContext);

  // User logout - redirects to login page
  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          {/* Added type="button" to ensure reliable clicking */}
          <button
            type="button" 
            className="navbar-menu-btn"
            onClick={onMenuToggle}
            aria-label="Toggle sidebar"
          >
            <Menu size={24} />
          </button>
          <Link to="/dashboard" className="navbar-logo">
            Price<span className="logo-x">X</span>
          </Link>
        </div>

        <div className="navbar-right">
          <Button
            variant="ghost"
            size="small"
            onClick={toggleTheme}
            className="navbar-theme-toggle"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </Button>

          <Link to="/profile" className="navbar-user-link">
            <div className="navbar-user">
              <div className="user-avatar">
                <User size={20} />
              </div>
              <span className="navbar-username">{user?.username || 'Guest'}</span>
            </div>
          </Link>

          <Button
            variant="ghost"
            size="small"
            onClick={handleLogout}
            className="navbar-logout"
            aria-label="Logout"
            title="Sign out"
          >
            <LogOut size={20} />
          </Button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;