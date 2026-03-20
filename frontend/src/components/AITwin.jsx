import React from 'react';
import { 
  Dna, Activity, Watch, Eye, Zap, Moon
} from 'lucide-react';
import './AITwin.css';

export default function AITwin() {
  return (
    <div className="ai-twin animate-fade-in">
      <div className="twin-header">
        <div>
          <h1>Your AI Health Twin</h1>
          <p>Real-time digital replica based on wearables, genetics, and lifestyle.</p>
        </div>
        <div className="twin-status">
          <span className="sync-dot animate-pulse"></span>
          <span>Live Sync Active</span>
        </div>
      </div>

      <div className="twin-layout grid-3">
        {/* Left Column - Wearables & Vitals */}
        <div className="twin-col">
          <div className="card fill-height">
            <h3><Watch size={18} /> Wearable Data Stream</h3>
            <p className="subtitle">Apple Watch Series 9 · Synced just now</p>
            
            <div className="vitals-list">
              <div className="vital-item">
                <div className="vital-header">
                  <span>Resting HR</span>
                  <span className="vital-value text-primary">62 bpm</span>
                </div>
                <div className="progress-bar"><div className="progress-fill" style={{width: '60%'}}></div></div>
              </div>

              <div className="vital-item">
                <div className="vital-header">
                  <span>Sleep Quality</span>
                  <span className="vital-value text-primary">8h 12m</span>
                </div>
                 <div className="progress-bar"><div className="progress-fill" style={{width: '85%'}}></div></div>
                 <p className="vital-note"><Moon size={12}/> 2h Deep Sleep</p>
              </div>

              <div className="vital-item">
                <div className="vital-header">
                  <span>HRV (Stress)</span>
                  <span className="vital-value text-warning">42 ms</span>
                </div>
                 <div className="progress-bar warning"><div className="progress-fill" style={{width: '40%'}}></div></div>
                 <p className="vital-note text-warning">Slightly elevated stress</p>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Column - The 3D/Visual Twin (Mocked with CSS) */}
        <div className="twin-col center-col">
           <div className="visual-twin">
              <div className="body-scan-effect">
                 <div className="scan-line"></div>
                 <Activity size={120} className="twin-icon" />
                 <div className="scan-nodes">
                    <div className="node n1" title="Brain: Optimal"></div>
                    <div className="node n2" title="Heart: Normal"></div>
                    <div className="node n3" title="Lungs: 98% SpO2"></div>
                    <div className="node n4" title="Digestive: Mild Irritation"></div>
                 </div>
              </div>
              <div className="twin-meta">
                 <span className="badge badge-success">Biological Age: 26</span>
                 <span className="badge badge-primary">Actual Age: 28</span>
              </div>
           </div>
        </div>

        {/* Right Column - Genetics & Lifestyle */}
        <div className="twin-col">
          <div className="card fill-height">
            <h3><Dna size={18} /> Genetic & Lifestyle Insights</h3>
            
            <div className="insight-section">
              <h4>Predisposition Markers</h4>
              <ul className="marker-list">
                <li><span className="marker-dot danger"></span> Type 2 Diabetes (Elevated Risk)</li>
                <li><span className="marker-dot success"></span> Cardiovascular (Low Risk)</li>
                <li><span className="marker-dot warning"></span> Vitamin D Deficiency</li>
              </ul>
            </div>

            <div className="insight-section mt-4">
              <h4>Metabolic Profile</h4>
              <div className="metabolic-stats">
                <div className="stat-box">
                  <Zap size={16} />
                  <span>Fast Metabolism</span>
                </div>
                <div className="stat-box">
                  <Eye size={16} />
                  <span>Caffeine Sensitive</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
