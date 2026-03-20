import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import AITwin from './components/AITwin';
import SymptomChecker from './components/SymptomChecker';
import DoctorAssist from './components/DoctorAssist';
import SmartEHR from './components/SmartEHR';
import Medications from './components/Medications';
import Nutrition from './components/Nutrition';
import RemoteVitals from './components/RemoteVitals';
import MentalHealth from './components/MentalHealth';
import Login from './components/Login';
import Register from './components/Register';
import { db } from './services/db';

function App() {
  const [user, setUser] = useState(db.getCurrentUser());
  const [showRegister, setShowRegister] = useState(false);

  const handleAuth = (userData) => {
    setUser(userData);
  };

  const handleLogout = async () => {
    await db.logout();
    setUser(null);
  };

  if (!user) {
    if (showRegister) {
      return <Register onRegister={handleAuth} onNavigateLogin={() => setShowRegister(false)} />;
    }
    return <Login onLogin={handleAuth} onNavigateRegister={() => setShowRegister(true)} />;
  }

  return (
    <Router>
      <div className="app-container">
        <Sidebar onLogout={handleLogout} />
        <div className="main-content">
          <Header user={user} />
          <div className="content-scroll">
            <Routes>
              <Route path="/" element={<Dashboard user={user} />} />
              <Route path="/ai-twin" element={<AITwin user={user} />} />
              <Route path="/symptom-checker" element={<SymptomChecker user={user} />} />
              <Route path="/doc-assist" element={<DoctorAssist user={user} />} />
              <Route path="/ehr" element={<SmartEHR user={user} />} />
              <Route path="/medications" element={<Medications user={user} />} />
              <Route path="/nutrition" element={<Nutrition user={user} />} />
              <Route path="/vitals" element={<RemoteVitals user={user} />} />
              <Route path="/mental-health" element={<MentalHealth user={user} />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
