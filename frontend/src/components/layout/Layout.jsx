// Layout wrapper component

import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

// Sidebar visibility toggle
function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="layout">
      <Navbar onMenuToggle={toggleSidebar} />
      <div className={`layout-body ${sidebarOpen ? 'sidebar-is-open' : ''}`}>
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;