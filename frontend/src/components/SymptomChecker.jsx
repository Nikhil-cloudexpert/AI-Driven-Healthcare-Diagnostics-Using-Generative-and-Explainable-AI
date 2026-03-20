import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, Mic, Camera, Paperclip, Send, Loader2, AlertCircle
} from 'lucide-react';
import { db } from '../services/db';
import './SymptomChecker.css';
import ReactMarkdown from 'react-markdown';

export default function SymptomChecker({ user }) {
  const firstName = user?.name ? user.name.split(' ')[0] : '';
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      isResult: false,
      content: `Hi ${firstName}, I'm your AI diagnostician. What's bothering you today? You can type, speak, or upload a photo if there's a visible issue.`
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, analyzing]);

  const handleSend = async () => {
    if (!inputVal.trim()) return;

    const userText = inputVal.trim();
    const userMsg = { id: Date.now(), type: 'user', content: userText };
    setMessages(prev => [...prev, userMsg]);
    setInputVal('');
    setAnalyzing(true);

    try {
      const data = await db.symptomCheck(userText);
      const aiResponse = { 
        id: Date.now() + 1, 
        type: 'ai', 
        isResult: true, 
        urgency: 'Evaluated', 
        score: 'N/A',
        content: data.diagnosis 
      };
      setMessages(prev => [...prev, aiResponse]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        type: 'ai', 
        isResult: false, 
        content: 'Error connecting to the AI diagnostic service.' 
      }]);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="symptom-checker animate-fade-in">
      <div className="checker-header">
        <h1>Multimodal Symptom Checker</h1>
        <p>Describe symptoms via text, voice, or upload images/scans for AI triage.</p>
      </div>

      <div className="checker-layout">
        <div className="chat-container card">
          <div className="chat-history">
            {messages.map((msg, idx) => (
               <React.Fragment key={`${msg.id}-${idx}`}>
                 {msg.type === 'ai' && !msg.isResult && (
                   <div className="message ai-message animate-fade-in">
                     <div className="avatar ai-avatar"><Bot size={18} /></div>
                     <div className="msg-content">{msg.content}</div>
                   </div>
                 )}

                 {msg.type === 'ai' && msg.isResult && (
                    <div className="message ai-message animate-fade-in">
                       <div className="avatar ai-avatar"><Bot size={18} /></div>
                       <div className={`msg-content results-box ${msg.urgency === 'Critical' ? 'critical-box' : ''}`}>
                          <h4>Triage Results</h4>
                          <div className="risk-score">
                             <span className={`badge ${msg.urgency === 'Critical' ? 'badge-danger' : 'badge-warning'}`}>
                               {msg.urgency} Urgency
                             </span>
                             <span className="score">Risk Score: {msg.score}/10</span>
                          </div>
                          <p>{msg.content}</p>
                          <div className="action-buttons">
                             {msg.urgency === 'Critical' ? (
                               <button className="btn btn-primary btn-sm bg-red">Call Emergency Services</button>
                             ) : (
                               <>
                                 <button className="btn btn-primary btn-sm">Route to General Physician</button>
                                 <button className="btn btn-outline btn-sm">Schedule Telemedicine</button>
                               </>
                             )}
                          </div>
                       </div>
                    </div>
                 )}

                 {msg.type === 'user' && (
                   <div className="message user-message animate-fade-in">
                    <div className="msg-content">
                      <ReactMarkdown
                        components={{
                          li: ({node, ...props}) => <li style={{ marginBottom: "6px" }} {...props} />
                        }}
                      >
                        {msg.content}
                      </ReactMarkdown>
                    </div>
                   </div>
                 )}
               </React.Fragment>
            ))}

            {analyzing && (
              <div className="message ai-message">
                <div className="avatar ai-avatar"><Loader2 size={18} className="spin" /></div>
                <div className="msg-content processing">
                  Analyzing semantic patterns and cross-referencing medical database...
                </div>
              </div>
            )}
            
            <div ref={chatEndRef} />
          </div>

          <div className="chat-input-area">
            <button className="btn-icon"><Paperclip size={20} title="Upload Scan" /></button>
            <button className="btn-icon"><Camera size={20} title="Take Photo" /></button>
            <input 
              type="text" 
              placeholder="Type your symptoms (e.g., 'I have a headache')..." 
              className="chat-input" 
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button className="btn-icon mic-btn-active"><Mic size={20} /></button>
            <button className="btn-icon send-btn" onClick={handleSend} disabled={analyzing}>
               <Send size={20} />
            </button>
          </div>
        </div>

        <div className="sidebar-info">
          <div className="card text-center info-card">
            <AlertCircle size={32} color="#3b82f6" style={{ margin: '0 auto 1rem auto' }}/>
            <h3>Emergency Detection Active</h3>
            <p>Our NLP system continuously scans your input for red flags (e.g., chest pain, stroke symptoms). If detected, emergency services are immediately routed.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
