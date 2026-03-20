import React, { useState } from 'react';
import { Activity, Mail, Lock, ArrowRight } from 'lucide-react';
import { db } from '../services/db';
import './Login.css';

export default function Login({ onLogin, onNavigateRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    
    setLoading(true);
    setError('');
    
    try {
      const user = await db.login(email, password);
      onLogin(user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container animate-fade-in">
      <div className="login-card card">
        <div className="login-header">
           <div className="login-logo">
             <Activity size={32} color="white" />
           </div>
           <h2>Welcome to Aetheria</h2>
           <p>Sign in to your intelligent health dashboard</p>
        </div>

        {error && <div className="error-banner">{error}</div>}

        <form className="login-form" onSubmit={handleSubmit}>
           <div className="input-group">
              <label>Email Address</label>
              <div className="input-wrapper">
                 <Mail size={18} className="input-icon" />
                 <input 
                   type="email" 
                   className="input-base with-icon" 
                   placeholder="you@example.com"
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   required
                 />
              </div>
           </div>

           <div className="input-group">
              <label>Password</label>
              <div className="input-wrapper">
                 <Lock size={18} className="input-icon" />
                 <input 
                   type="password" 
                   className="input-base with-icon" 
                   placeholder="••••••••"
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   required
                 />
              </div>
           </div>

           <div className="login-options">
              <label className="remember-me">
                 <input type="checkbox" />
                 <span>Remember me</span>
              </label>
              <a href="#" className="forgot-pw">Forgot password?</a>
           </div>

           <button 
             type="submit" 
             className={`btn btn-primary login-btn ${loading ? 'loading' : ''}`}
             disabled={loading}
           >
             {loading ? 'Authenticating AI Profile...' : (
               <>Login to Dashboard <ArrowRight size={18} /></>
             )}
           </button>
        </form>

        <div className="login-footer">
           <p>Don't have an AI Health Twin? <a href="#" onClick={(e) => { e.preventDefault(); onNavigateRegister(); }}>Create Account</a></p>
        </div>
      </div>
    </div>
  );
}
