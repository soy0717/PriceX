// Sidebar nav component

import { Link, useLocation } from 'react-router-dom';
import { Home, BarChart3, Zap, Package } from 'lucide-react';

function Sidebar({ isOpen, onClose }) {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const handleLinkClick = () => {
    if (window.innerWidth < 768) {
      onClose();
    }
  };

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: Home },
    { path: '/price-analyzer', label: 'Price Analyzer', icon: BarChart3 },
    { path: '/marketing-studio', label: 'Marketing Studio', icon: Zap },
    { path: '/inventory', label: 'Saved Activity', icon: Package },
  ];

  return (
    <>
      <div 
        className={`sidebar-overlay ${isOpen ? 'sidebar-overlay--visible' : ''}`} 
        onClick={onClose} 
        aria-hidden="true"
      />
      
      <aside className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}>
        <nav className="sidebar-nav">
          {navItems.map(({ path, label, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              className={`sidebar-item ${isActive(path) ? 'sidebar-item--active' : ''}`}
              onClick={handleLinkClick} 
            >
              <Icon size={20} />
              <span>{label}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;