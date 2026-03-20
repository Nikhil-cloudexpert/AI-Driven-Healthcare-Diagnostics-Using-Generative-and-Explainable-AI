import React, { useState } from 'react';
import { Activity, User, Mail, Lock, HeartPulse, ArrowRight } from 'lucide-react';
import { db } from '../services/db';
import '../components/Login.css'; // Reusing login styles

export default function Register({ onRegister, onNavigateLogin }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    gender: '',
    bloodGroup: '',
    knownConditions: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password || !formData.name) return;
    
    setLoading(true);
    setError('');
    try {
      const user = await db.register(formData);
      onRegister(user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container animate-fade-in">
      <div className="login-card card" style={{ maxWidth: '500px', padding: '2rem' }}>
        <div className="login-header mb-4">
           <div className="login-logo" style={{ marginBottom: '1rem', width: '48px', height: '48px' }}>
             <Activity size={24} color="white" />
           </div>
           <h2>Create AI Health Profile</h2>
           <p>Enter your details and medical history</p>
        </div>

        {error && <div className="error-banner">{error}</div>}

        <form className="login-form" onSubmit={handleSubmit}>
           <div className="grid-2">
              <div className="input-group">
                 <label>Full Name</label>
                 <div className="input-wrapper">
                    <User size={18} className="input-icon" />
                    <input type="text" name="name" className="input-base with-icon" value={formData.name} onChange={handleChange} required />
                 </div>
              </div>
              <div className="input-group">
                 <label>Email Address</label>
                 <div className="input-wrapper">
                    <Mail size={18} className="input-icon" />
                    <input type="email" name="email" className="input-base with-icon" value={formData.email} onChange={handleChange} required />
                 </div>
              </div>
           </div>

           <div className="grid-2">
              <div className="input-group">
                 <label>Password</label>
                 <div className="input-wrapper">
                    <Lock size={18} className="input-icon" />
                    <input type="password" name="password" className="input-base with-icon" value={formData.password} onChange={handleChange} required minLength="6" />
                 </div>
              </div>
              <div className="input-group">
                 <label>Age & Gender</label>
                 <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <input type="number" name="age" className="input-base" placeholder="Age" value={formData.age} onChange={handleChange} style={{ width: '40%' }} required />
                    <select name="gender" className="input-base" value={formData.gender} onChange={handleChange} style={{ width: '60%' }} required>
                       <option value="">Gender...</option>
                       <option value="Male">Male</option>
                       <option value="Female">Female</option>
                       <option value="Other">Other</option>
                    </select>
                 </div>
              </div>
           </div>

           <div className="input-group">
              <label>Medical History / Known Conditions (Optional)</label>
              <div className="input-wrapper">
                 <HeartPulse size={18} className="input-icon" style={{ top: '1rem' }} />
                 <textarea 
                   name="knownConditions" 
                   className="input-base with-icon" 
                   placeholder="e.g. Hypertension, Diabetes, Penicillin allergy..."
                   value={formData.knownConditions}
                   onChange={handleChange}
                   rows="3"
                   style={{ resize: 'none' }}
                 ></textarea>
              </div>
           </div>

           <button type="submit" className={`btn btn-primary login-btn ${loading ? 'loading' : ''}`} disabled={loading}>
             {loading ? 'Generating AI Twin...' : <>Complete Registration <ArrowRight size={18} /></>}
           </button>
        </form>

        <div className="login-footer">
           <p>Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); onNavigateLogin(); }}>Sign in here</a></p>
        </div>
      </div>
    </div>
  );
}
