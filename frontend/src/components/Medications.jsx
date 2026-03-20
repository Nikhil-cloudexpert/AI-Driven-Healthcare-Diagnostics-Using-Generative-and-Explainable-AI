import React from 'react';
import { Pill, AlertTriangle, Check, Search, TrendingDown, Store } from 'lucide-react';
import './Medications.css';

export default function Medications() {
  return (
    <div className="medications animate-fade-in">
      <div className="meds-header">
         <div>
            <h1>Medication Intelligence</h1>
            <p>Smart adherence tracking, interaction alerts, and cost optimization.</p>
         </div>
         <div className="adherence-score">
            <span className="text-sm text-muted">Weekly Adherence</span>
            <span className="score-value text-success">98%</span>
         </div>
      </div>

      <div className="grid-2 mt-4">
         {/* Current Schedule */}
         <div className="card meds-card">
            <div className="card-header">
               <h3><Pill size={18}/> Today's Schedule</h3>
            </div>
            
            <div className="med-list">
               <div className="med-time-block">
                  <div className="time-label">Morning (8:00 AM)</div>
                  
                  <div className="med-item completed">
                     <div className="med-icon"><Check size={16}/></div>
                     <div className="med-details">
                        <strong>Metformin 500mg</strong>
                        <span>Take with food (Blood Sugar control)</span>
                     </div>
                     <span className="time-taken">Taken at 8:15 AM</span>
                  </div>
                  
                  <div className="med-item completed">
                     <div className="med-icon"><Check size={16}/></div>
                     <div className="med-details">
                        <strong>Vitamin D3 2000 IU</strong>
                        <span>Supplement</span>
                     </div>
                     <span className="time-taken">Taken at 8:15 AM</span>
                  </div>
               </div>

               <div className="med-time-block">
                  <div className="time-label">Evening (8:00 PM)</div>
                  
                  <div className="med-item pending">
                     <div className="med-icon alert"><AlertTriangle size={16}/></div>
                     <div className="med-details">
                        <strong>Amlodipine 5mg</strong>
                        <span>1 Tablet (Blood Pressure)</span>
                     </div>
                     <button className="btn btn-primary btn-sm">Mark Taken</button>
                  </div>
               </div>
            </div>
         </div>

         {/* AI Suggestions & Pharmacy */}
         <div className="ai-meds-sidebar">
            <div className="card savings-card">
               <div className="card-header">
                  <h3><TrendingDown size={18}/> Cost Savings Engine</h3>
               </div>
               
               <div className="saving-item">
                  <div className="saving-header">
                     <strong>Replace: Amlodipine (Brand)</strong>
                     <span className="cost">₹240/mo</span>
                  </div>
                  <div className="suggestion">
                     <span className="badge badge-success">Generic Available</span>
                     <span>Switch to generic Amlodipine 5mg to save ₹180/mo. Clinically equivalent.</span>
                  </div>
                  <button className="btn btn-outline btn-sm full-width mt-2">Consult Doctor to Switch</button>
               </div>
            </div>

            <div className="card pharmacy-card mt-4">
               <div className="card-header">
                  <h3><Store size={18}/> Local Pharmacy Sync</h3>
               </div>
               <div className="pharmacy-status">
                  <div className="status-indicator"></div>
                  <span>Apollo Pharmacy, Sector 14</span>
               </div>
               <p className="refill-text mt-2">Metformin supply running low (4 days left). Auto-refill order has been placed based on your prescription.</p>
               <button className="btn btn-primary btn-sm mt-3">Track Order</button>
            </div>
         </div>
      </div>
    </div>
  );
}
