import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, UserCircle, Stethoscope, Video, 
  FileText, Pill, Apple, Activity, BrainCircuit,
  Settings, LogOut
} from 'lucide-react';
import './Sidebar.css';

const navItems = [
  { path: '/', label: 'Overview', icon: LayoutDashboard },
  { path: '/ai-twin', label: 'AI Health Twin', icon: UserCircle },
  { path: '/symptom-checker', label: 'Symptom Checker', icon: Stethoscope },
  { path: '/doc-assist', label: 'Doc Assist', icon: Video },
  { path: '/ehr', label: 'Smart EHR', icon: FileText },
  { path: '/medications', label: 'Medications', icon: Pill },
  { path: '/nutrition', label: 'Nutrition & Fitness', icon: Apple },
  { path: '/vitals', label: 'Remote Vitals', icon: Activity },
  { path: '/mental-health', label: 'Mental Health AI', icon: BrainCircuit },
];

export default function Sidebar({ onLogout }) {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo-icon">
          <Activity size={24} color="white" />
        </div>
        <h2>Aetheria Health</h2>
      </div>
      
      <div className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink 
            key={item.path} 
            to={item.path} 
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <item.icon size={20} className="nav-icon" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>

      <div className="sidebar-footer">
        <button className="nav-item">
          <Settings size={20} className="nav-icon" />
          <span>Settings</span>
        </button>
        <button className="nav-item" onClick={onLogout} style={{ color: '#ef4444', marginTop: '0.25rem' }}>
          <LogOut size={20} className="nav-icon" style={{ color: '#ef4444' }} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
