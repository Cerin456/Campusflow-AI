import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Workflow,
  FileText,
  Bell,
  UsersRound,
  Layers,
  History,
  Settings,
  LogOut,
  Menu,
  X,
  Search,
  Zap,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function AppLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { to: '/app/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { to: '/app/automations', label: 'Automations', icon: <Workflow size={20} /> },
    { to: '/app/notices', label: 'Smart Notices', icon: <FileText size={20} /> },
    { to: '/app/reminders', label: 'Reminders', icon: <Bell size={20} /> },
    { to: '/app/attendance', label: 'Attendance', icon: <UsersRound size={20} /> },
    { to: '/app/documents', label: 'Documents', icon: <Layers size={20} /> },
    { to: '/app/history', label: 'Execution History', icon: <History size={20} /> },
    { to: '/app/settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  // Derive current title
  const currentItem = navItems.find((item) => location.pathname === item.to);
  const pageTitle = currentItem ? currentItem.label : 'Campus Operations';

  return (
    <div className="dashboard-layout">
      {/* Sidebar Navigation */}
      <aside className={`dashboard-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="nav-brand">
            <div className="brand-icon">
              <Zap size={20} color="#FFFFFF" />
            </div>
            <span className="brand-text">
              Campus<span>Flow</span>
              <span className="brand-badge">AI</span>
            </span>
          </div>

          <button
            className="mobile-sidebar-toggle"
            onClick={() => setSidebarOpen(false)}
            style={{ color: '#94A3B8' }}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-user-tile">
            <div className="user-avatar-circle">
              {user?.name ? user.name.slice(0, 2).toUpperCase() : 'CF'}
            </div>
            <div className="sidebar-user-details" style={{ overflow: 'hidden' }}>
              <h5>{user?.name || 'Academic User'}</h5>
              <span style={{ textTransform: 'capitalize' }}>
                {user?.role || 'Educator'} • {user?.institution ? user.institution.slice(0, 15) : 'Campus'}
              </span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="btn btn-outline btn-sm"
            style={{ width: '100%', borderColor: 'rgba(239, 68, 68, 0.3)', color: '#F87171' }}
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="dashboard-main-area">
        {/* Top Header Bar */}
        <header className="dashboard-topbar">
          <div className="topbar-left">
            <button
              className="mobile-sidebar-toggle"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open navigation sidebar"
            >
              <Menu size={24} />
            </button>
            <h1 className="topbar-page-title">{pageTitle}</h1>
          </div>

          <div className="topbar-right">
            <div className="topbar-search">
              <Search size={16} className="topbar-search-icon" />
              <input type="text" placeholder="Search notices, rules..." />
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              background: '#EEF2FF',
              color: '#4F46E5',
              padding: '0.35rem 0.85rem',
              borderRadius: '999px',
              fontSize: '0.8rem',
              fontWeight: 600
            }}>
              <ShieldCheck size={14} />
              <span>{user?.institution || 'CampusFlow Cloud'}</span>
            </div>
          </div>
        </header>

        {/* Dynamic Nested Content */}
        <main className="dashboard-content-container">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
