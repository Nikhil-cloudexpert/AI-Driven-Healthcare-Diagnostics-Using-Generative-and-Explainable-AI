import React from 'react';
import { Bell, Search, Mic } from 'lucide-react';
import './Header.css';

export default function Header({ user }) {
  const initials = user?.name ? user.name.substring(0, 2).toUpperCase() : 'AS';
  const userName = user?.name || 'Anita Sharma';

  return (
    <header className="header">
      <div className="search-bar">
        <Search size={18} className="search-icon" />
        <input 
          type="text" 
          placeholder="Ask AI assistant or search records..." 
          className="search-input"
        />
        <button className="btn-icon mic-btn">
          <Mic size={18} />
        </button>
      </div>

      <div className="header-actions">
        <div className="lang-selector">
          <span className="lang-text">EN / HI</span>
        </div>
        
        <button className="btn-icon notification-btn">
          <Bell size={20} />
          <span className="notification-dot"></span>
        </button>

        <div className="user-profile">
          <div className="avatar">
            <span className="avatar-text">{initials}</span>
          </div>
          <div className="user-info">
            <span className="user-name">{userName}</span>
            <span className="user-score">Health Score: 92</span>
          </div>
        </div>
      </div>
    </header>
  );
}
