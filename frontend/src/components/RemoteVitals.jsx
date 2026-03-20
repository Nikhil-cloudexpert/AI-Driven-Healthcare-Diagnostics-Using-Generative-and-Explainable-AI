import React from 'react';
import { Activity, BellRing, Users, Thermometer, Droplets, Heart } from 'lucide-react';
import './RemoteVitals.css';

export default function RemoteVitals() {
  return (
    <div className="remote-vitals animate-fade-in">
      <div className="vitals-header">
        <h1>Remote Patient Monitoring</h1>
        <p>Real-time telemetry shared with your care team and family members.</p>
      </div>

      <div className="grid-3 mt-4">
        {/* Main Vitals Stream */}
        <div className="vitals-main-col card span-2">
           <div className="card-header border-b">
              <h3><Activity size={18}/> Live Telemetry Stream</h3>
              <span className="badge badge-success pulse-badge">Broadcasting</span>
           </div>

           <div className="chart-placeholder mt-4">
              <div className="ecg-line">
                 <svg viewBox="0 0 500 100" className="ecg-path">
                    <polyline points="0,50 50,50 60,30 70,70 80,10 90,90 100,50 150,50 160,30 170,70 180,10 190,90 200,50 250,50 260,30 270,70 280,10 290,90 300,50 350,50 360,30 370,70 380,10 390,90 400,50 450,50 460,30 470,70 480,10 490,90 500,50" />
                 </svg>
              </div>
              <div className="vitals-overlay grid-3">
                 <div className="vital-overlay-item">
                    <Heart size={20} className="text-danger mb-1"/>
                    <span className="text-xl">72 bpm</span>
                 </div>
                 <div className="vital-overlay-item">
                    <Droplets size={20} className="text-primary mb-1"/>
                    <span className="text-xl">98% SpO2</span>
                 </div>
                 <div className="vital-overlay-item">
                    <Thermometer size={20} className="text-warning mb-1"/>
                    <span className="text-xl">98.2°F</span>
                 </div>
              </div>
           </div>

           <div className="anomaly-logs mt-4">
              <h4>Recent Anomaly Logs</h4>
              <div className="log-item warning-log">
                 <div className="log-time">02:14 AM</div>
                 <div className="log-msg">
                    <strong>Mild Sleep Apnea Event</strong>
                    <span>SpO2 dropped to 92% for 45 seconds. Auto-logged for Dr. Sharma review.</span>
                 </div>
                 <span className="badge badge-warning">Reviewed by AI</span>
              </div>
           </div>
        </div>

        {/* Sharing & Access Control */}
        <div className="vitals-side-col">
           <div className="card fill-height">
              <div className="card-header border-b">
                 <h3><Users size={18}/> Access Control</h3>
              </div>

              <div className="access-list mt-3">
                 <div className="access-item">
                    <div className="avatar sm bg-primary">DR</div>
                    <div className="access-info">
                       <strong>Dr. Vikram Singh</strong>
                       <span>Primary Care Physician</span>
                    </div>
                    <span className="badge badge-success">Full Access</span>
                 </div>

                 <div className="access-item line-above">
                    <div className="avatar sm bg-secondary text-main">RG</div>
                    <div className="access-info">
                       <strong>Ravi Gupta (Son)</strong>
                       <span>Emergency Contact</span>
                    </div>
                    <span className="badge badge-primary">Alerts Only</span>
                 </div>
              </div>

              <div className="emergency-routing mt-4">
                 <div className="routing-header">
                    <BellRing size={18} className="text-danger"/>
                    <strong>Emergency Escalation</strong>
                 </div>
                 <p className="text-sm text-muted mt-2">If anomalies exceed critical thresholds, protocol is:</p>
                 <ol className="routing-steps mt-2">
                    <li>Send SMS to Ravi Gupta</li>
                    <li>Ping Dr. Singh's Pager</li>
                    <li>Auto-dispatch ambulance if no response in 3 mins</li>
                 </ol>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
