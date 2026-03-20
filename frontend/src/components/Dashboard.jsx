import React from 'react';
import { 
  Activity, Heart, Thermometer, Droplets, 
  AlertTriangle, Calendar, ChevronRight
} from 'lucide-react';
import './Dashboard.css';

export default function Dashboard({ user }) {
  const firstName = user?.name ? user.name.split(' ')[0] : 'Anita';

  return (
    <div className="dashboard animate-fade-in">
      <div className="dashboard-header">
        <div>
          <h1>Welcome back, {firstName}</h1>
          <p>Here is your daily AI health intelligence overview.</p>
        </div>
        <button className="btn btn-primary">
          <Activity size={16} />
          <span>Run Full Diagnostics</span>
        </button>
      </div>

      <div className="grid-4 metrics-grid">
        <div className="metric-card card">
          <div className="metric-icon bg-red"><Heart size={20} color="#ef4444" /></div>
          <div className="metric-info">
            <span className="metric-label">Heart Rate</span>
            <span className="metric-value">72 <span className="metric-unit">bpm</span></span>
            <span className="metric-trend trend-down">Normal</span>
          </div>
        </div>
        
        <div className="metric-card card">
          <div className="metric-icon bg-blue"><Droplets size={20} color="#3b82f6" /></div>
          <div className="metric-info">
            <span className="metric-label">SpO2 Level</span>
            <span className="metric-value">98 <span className="metric-unit">%</span></span>
            <span className="metric-trend trend-up">Optimal</span>
          </div>
        </div>

        <div className="metric-card card">
          <div className="metric-icon bg-orange"><Thermometer size={20} color="#f59e0b" /></div>
          <div className="metric-info">
            <span className="metric-label">Body Temp</span>
            <span className="metric-value">98.2 <span className="metric-unit">°F</span></span>
            <span className="metric-trend trend-stable">Stable</span>
          </div>
        </div>

        <div className="metric-card card highlight-card">
          <div className="metric-info">
            <span className="metric-label">Overall Health Score</span>
            <span className="metric-value text-primary">92<span className="metric-unit">/100</span></span>
            <span className="metric-trend">Top 12% in your age group</span>
          </div>
        </div>
      </div>

      <div className="grid-2 dashboard-main">
        <div className="card section-card">
          <div className="section-header">
            <h3>Predictive Analytics Alerts</h3>
            <span className="badge badge-warning">1 Action Required</span>
          </div>
          <div className="alert-item">
            <div className="alert-icon"><AlertTriangle size={20} /></div>
            <div className="alert-content">
              <h4>Elevated stress pattern detected</h4>
              <p>Your HRV and sleep patterns suggest accumulating stress over the last 3 days. AI recommends an early bedtime tonight.</p>
            </div>
          </div>
          <button className="btn btn-outline full-width">View Detailed Analysis</button>
        </div>

        <div className="card section-card">
          <div className="section-header">
            <h3>Upcoming Actions</h3>
            <button className="btn-icon"><ChevronRight size={20} /></button>
          </div>
          
          <div className="action-list">
            <div className="action-item">
              <Calendar size={18} className="text-muted" />
              <div className="action-text">
                <strong>Telemedicine Follow-up</strong>
                <span>Dr. Verma (Endocrinologist) - Today, 4:00 PM</span>
              </div>
              <button className="btn btn-outline btn-sm">Join</button>
            </div>
            
            <div className="action-item">
              <Activity size={18} className="text-muted" />
              <div className="action-text">
                <strong>Take Evening Medication</strong>
                <span>Metformin 500mg - 8:00 PM</span>
              </div>
              <button className="btn btn-outline btn-sm">Acknowledge</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
