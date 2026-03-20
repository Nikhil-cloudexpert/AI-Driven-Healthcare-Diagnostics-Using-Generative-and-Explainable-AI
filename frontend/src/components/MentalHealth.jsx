import React, { useState, useRef, useEffect } from 'react';
import { BrainCircuit, Mic, Waves, MessageSquare, Plus, Activity } from 'lucide-react';
import './MentalHealth.css';

export default function MentalHealth() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: "Hello Anita. I noticed your HRV suggests higher stress levels today, and you mentioned sleeping poorly. How are you feeling right now?"
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputVal.trim()) return;

    // Add user message
    const userMsg = { id: Date.now(), type: 'user', content: inputVal };
    setMessages(prev => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    // Simulate Therabot thoughtful response
    setTimeout(() => {
      setIsTyping(false);

      const aiResponses = [
        "It's completely understandable to feel overwhelmed. Would you like to try a quick 3-minute guided grounding exercise together?",
        "That sounds really challenging. Remember it's okay to take a step back. I'm here to listen.",
        "When things feel heavy, sometimes breaking them down into microscopic steps helps. What is one small thing you can do right now to feel better?",
        "I hear you. Let me know if you want to explore these feelings deeper, or if you prefer a distraction."
      ];
      
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      
      const aiResponseMsg = {
        id: Date.now() + 1,
        type: 'ai',
        content: randomResponse
      };

      setMessages(prev => [...prev, aiResponseMsg]);
    }, 2500);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="mental-health animate-fade-in">
      <div className="mh-header">
        <h1>AI Mental Health & Therapy</h1>
        <p>Private, empathetic AI coaching, mood tracking, and voice emotion analysis.</p>
      </div>

      <div className="grid-3 mt-4">
        {/* Chat Interface */}
        <div className="card span-2 chat-module fill-height">
           <div className="card-header border-b">
              <h3><BrainCircuit size={18}/> Therabot Session</h3>
           </div>
           
           <div className="chat-window">
              {messages.map(msg => (
                <div key={msg.id} className={`mh-message animate-fade-in ${msg.type === 'ai' ? 'ai-msg' : 'user-msg'}`}>
                   {msg.type === 'ai' && (
                     <div className="mh-avatar"><BrainCircuit size={16}/></div>
                   )}
                   <div className="mh-bubble">
                      {msg.content}
                   </div>
                </div>
              ))}

              {isTyping && (
                <div className="mh-message ai-msg animate-fade-in">
                   <div className="mh-avatar"><BrainCircuit size={16}/></div>
                   <div className="mh-bubble typing-indicator">
                      <span className="dot"></span>
                      <span className="dot"></span>
                      <span className="dot"></span>
                   </div>
                </div>
              )}
              <div ref={chatEndRef} />
           </div>

           <div className="chat-input-area">
              <button className="btn-icon"><Plus size={20}/></button>
              <input 
                type="text" 
                placeholder="Type or speak how you feel..." 
                className="chat-input"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button className="btn-icon emotion-mic bg-primary text-white" onClick={handleSend} disabled={isTyping}><Mic size={20}/></button>
           </div>
        </div>

        {/* Emotion Voice & Mood Tracking */}
        <div className="mh-side-col">
           <div className="card fill-height">
              <div className="card-header border-b">
                 <h3><Mic size={18}/> Voice Emotion Analysis</h3>
              </div>
              <p className="text-sm text-muted mt-2">When you speak, the AI analyzes vocal biomarkers to detect subtle stress patterns.</p>
              
              <div className="voice-visualization mt-4">
                 <Waves size={64} className="text-primary opacity-50"/>
              </div>
              
              <div className="emotion-detected mt-4 text-center">
                 <span className="text-sm text-muted">Detected state:</span>
                 <br/>
                 <span className="badge badge-warning mt-1">Anxious (65% confidence)</span>
              </div>

              <div className="escalation-box mt-4">
                 <h4>Need Human Support?</h4>
                 <p className="text-sm">Therabot can seamlessly transfer this context to a licensed human therapist.</p>
                 <button className="btn btn-outline full-width mt-3">Connect to Human Therapist</button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
