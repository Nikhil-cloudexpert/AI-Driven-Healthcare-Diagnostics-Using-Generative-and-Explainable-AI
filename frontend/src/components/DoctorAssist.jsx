import React from 'react';
import { 
  Video, Mic, MicOff, VideoOff, PhoneMissed, 
  FileText, CheckSquare, AlertOctagon
} from 'lucide-react';
import './DoctorAssist.css';

export default function DoctorAssist() {
  return (
    <div className="doc-assist animate-fade-in">
      <div className="doc-header">
        <h1>AI Doctor Assistant & Telemedicine</h1>
        <p>Live AI transcription, automated EHR updates, and clinical decision support.</p>
      </div>

      <div className="doc-layout grid-2">
        {/* Left Column - Video Call Area */}
        <div className="video-section card fill-height">
           <div className="video-feed main-feed">
              <div className="doctor-info-overlay">
                 <span className="doc-name">Dr. Vikram Singh</span>
                 <span className="doc-spec">Cardiology</span>
              </div>
              <div className="ai-caption-overlay">
                 <p><strong>[Live AI Transcript]</strong> Dr. Singh: "I see your sleeping heart rate has been dipping slightly. Have you felt lightheaded?"</p>
              </div>
              <span className="badge badge-danger rec-badge">REC</span>
           </div>

           <div className="video-controls">
              <button className="btn-icon control-btn"><Mic size={20}/></button>
              <button className="btn-icon control-btn"><Video size={20}/></button>
              <button className="btn control-btn end-call"><PhoneMissed size={20}/> End Call</button>
           </div>
        </div>

        {/* Right Column - AI Copilot */}
        <div className="ai-copilot">
           <div className="copilot-header">
             <h3><bot className="text-primary"/> Clinical Copilot</h3>
             <span className="badge badge-success">Active</span>
           </div>

           <div className="copilot-panel">
              <div className="copilot-section">
                <div className="section-title">
                  <FileText size={16}/> <span>Auto-Generated SOAP Note</span>
                </div>
                <div className="note-content">
                  <strong>S:</strong> Patient reports occasional mild chest tightness after meals.<br/>
                  <strong>O:</strong> Resting HR 62 bpm. SpO2 98%. BP stable at 118/76 (Wearable data).<br/>
                  <strong>A:</strong> Likely Gastroesophageal reflux disease (GERD), given temporal relation to meals.<br/>
                  <strong>P:</strong> Prescribe Omeprazole 20mg. Monitor dietary triggers.
                </div>
                <button className="btn btn-outline btn-sm mt-2">Approve Note to EHR</button>
              </div>

              <div className="copilot-section alert-section">
                <div className="section-title text-danger">
                  <AlertOctagon size={16}/> <span>AI Clinical Alert</span>
                </div>
                <p><strong>Drug Interaction Detected:</strong></p>
                <p className="text-muted text-sm">Patient is currently taking Clopidogrel. Omeprazole can reduce its efficacy. Consider Pantoprazole instead.</p>
                <div className="action-buttons mt-2">
                  <button className="btn btn-primary btn-sm">Switch to Pantoprazole</button>
                  <button className="btn btn-outline btn-sm">Dismiss</button>
                </div>
              </div>

              <div className="copilot-section pb-0">
                <div className="section-title">
                  <CheckSquare size={16}/> <span>Suggested Prescriptions</span>
                </div>
                <div className="rx-item">
                  <div className="rx-details">
                    <strong>Pantoprazole 40mg</strong>
                    <span>Take 1 tablet daily before breakfast for 14 days.</span>
                  </div>
                  <button className="btn btn-outline btn-sm">Add</button>
                </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
