import React, { useState } from 'react';
import { 
  UploadCloud, FileText, Search, Database, 
  CheckCircle, ArrowRight
} from 'lucide-react';
import './SmartEHR.css';

export default function SmartEHR() {
  const [uploading, setUploading] = useState(false);
  const [processed, setProcessed] = useState(false);

  const simulateUpload = () => {
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setProcessed(true);
    }, 2000);
  };

  return (
    <div className="smart-ehr animate-fade-in">
      <div className="ehr-header">
         <h1>Smart Electronic Health Records</h1>
         <p>Upload handwritten prescriptions, lab reports, or discharge summaries. Our NLP engine will structure the data instantly.</p>
      </div>

      <div className="ehr-layout grid-2">
         {/* Upload Section */}
         <div className="upload-section card">
            <div className="upload-box" onClick={!uploading && !processed ? simulateUpload : undefined}>
               {!uploading && !processed && (
                 <>
                   <UploadCloud size={48} className="upload-icon" />
                   <h3>Drag & drop medical records here</h3>
                   <p className="text-muted text-sm">Supports PDF, JPG, PNG (Max 10MB)</p>
                   <button className="btn btn-primary mt-4">Browse Files</button>
                 </>
               )}
               
               {uploading && (
                 <div className="processing-state">
                   <Database size={48} className="upload-icon animate-pulse" />
                   <h3>Parsing Document with AI...</h3>
                   <div className="progress-bar mt-4"><div className="progress-fill" style={{width: '70%', transition: 'width 2s'}}></div></div>
                   <p className="text-sm text-muted mt-2">Extracting medications, dates, and diagnoses.</p>
                 </div>
               )}

               {processed && (
                 <div className="success-state">
                   <CheckCircle size={48} className="upload-icon text-success" />
                   <h3 className="text-success">Data Successfully Extracted</h3>
                   <p className="text-muted text-sm">1 Document processed and structured.</p>
                   <button className="btn btn-outline mt-4" onClick={() => setProcessed(false)}>Upload Another</button>
                 </div>
               )}
            </div>

            <div className="recent-uploads mt-4">
               <h4>Recent Uploads</h4>
               <div className="file-list">
                  <div className="file-item">
                     <FileText size={20} className="text-primary"/>
                     <div className="file-info">
                        <strong>Q3 Blood Lab Results.pdf</strong>
                        <span>Yesterday • Parsed 12 markers</span>
                     </div>
                  </div>
                  <div className="file-item">
                     <FileText size={20} className="text-primary"/>
                     <div className="file-info">
                        <strong>Dr. Sharma Handwritten Rx.jpg</strong>
                        <span>Oct 12 • Parsed 2 medications</span>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Extracted Data Section */}
         <div className="data-section">
            <div className="data-search card">
               <Search size={18} className="text-muted"/>
               <input type="text" placeholder="Search structured records (e.g. 'HbA1c levels')" className="search-input"/>
            </div>

            <div className="extracted-table card mt-4">
               <div className="table-header-flex">
                 <h3>Structured Timeline</h3>
                 <span className="badge badge-primary">Auto-synced via NLP</span>
               </div>
               
               <div className="timeline-view mt-4">
                  <div className="timeline-node">
                     <div className="node-date">Just Now</div>
                     <div className="node-content">
                        {processed ? (
                          <div className="extracted-data animate-fade-in">
                             <h4>Extracted from New Upload</h4>
                             <div className="data-tags">
                               <span className="data-tag diagnosis">Dx: Mild Hypertension</span>
                               <span className="data-tag medication">Rx: Amlodipine 5mg</span>
                               <span className="data-tag instruction">Inst: Take after dinner</span>
                             </div>
                             <button className="btn btn-sm btn-primary mt-2">Add to Dashboard <ArrowRight size={14}/></button>
                          </div>
                        ) : (
                          <p className="waiting-text">Awaiting new document upload...</p>
                        )}
                     </div>
                  </div>

                  <div className="timeline-node">
                     <div className="node-date">Yesterday</div>
                     <div className="node-content">
                        <div className="extracted-data">
                           <h4>Q3 Blood Labs</h4>
                           <div className="data-grid">
                              <div className="data-cell"><strong>HbA1c:</strong> <span className="text-success">5.4%</span></div>
                              <div className="data-cell"><strong>LDL Chol:</strong> <span className="text-warning">112 mg/dL</span></div>
                              <div className="data-cell"><strong>Vit D:</strong> <span className="text-danger">18 ng/mL</span></div>
                           </div>
                        </div>
                     </div>
                  </div>

               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
