import React from 'react';
import { Toaster } from './components/ui/sonner';
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
import './App.css';

export default function App() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Impact />
        <Programs />
        <GetInvolved />
        <Testimonials />
        <Newsletter />
        <Contact />
      </main>
      <Footer />
      <Toaster position="top-center" />
    </div>
  );
}
