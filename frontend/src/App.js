import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from './components/ui/sonner';
import { CMSProvider } from './context/CMSContext';

// Public Pages
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Programs from './components/Programs';
import Impact from './components/Impact';
import GetInvolved from './components/GetInvolved';
import Testimonials from './components/Testimonials';
import Newsletter from './components/Newsletter';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import Events from './components/Events';

// Admin Pages
import AdminLogin from './pages/AdminLogin';
import ProgramDetail from './pages/ProgramDetail';
import EventDetail from './pages/EventDetail';

import './App.css';

function LandingPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const auth = sessionStorage.getItem('uisn_admin_auth');
      setIsAuthenticated(auth === 'true');
    };
    checkAuth();
    
    // Check auth status periodically
    const interval = setInterval(checkAuth, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('uisn_admin_auth');
    setIsAuthenticated(false);
    window.location.reload();
  };

  return (
    <CMSProvider>
      <div className="min-h-screen">
        <Navigation />
      <main>
        <Hero />
        <About />
        <Impact />
        <Programs />
        <Events />
        <GetInvolved />
        <Testimonials />
        <Newsletter />
        <Contact />
      </main>
      <Footer />
      
      {/* Admin Panel - Only shows when logged in */}
      {isAuthenticated && <AdminPanel onLogout={handleLogout} />}
    </div>
    </CMSProvider>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/program/:slug" element={<ProgramDetail />} />
        <Route path="/event/:id" element={<EventDetail />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster position="top-center" />
    </Router>
  );
}
