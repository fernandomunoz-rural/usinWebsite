import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Impact', href: '#impact' },
    { label: 'Programs', href: '#programs' },
    { label: 'Get Involved', href: '#get-involved' },
    { label: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-primary shadow-lg' : 'bg-primary/95 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="text-accent text-2xl font-bold">
              <span className="text-secondary">UI</span>
              <span className="text-primary-foreground">SN</span>
            </div>
            <div className="hidden sm:block text-primary-foreground text-sm font-medium">
              <div>Utah Intercollegiate</div>
              <div className="text-accent text-xs">Service Network</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                className="px-4 py-2 text-primary-foreground hover:text-accent transition-colors duration-200 font-medium"
              >
                {item.label}
              </button>
            ))}
            <Button
              onClick={() => scrollToSection('#get-involved')}
              className="ml-4 bg-secondary hover:bg-secondary/90 text-secondary-foreground"
            >
              Donate
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-primary-foreground p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-primary border-t border-primary-light">
          <div className="px-4 pt-2 pb-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                className="block w-full text-left px-4 py-3 text-primary-foreground hover:bg-primary-light rounded-lg transition-colors duration-200"
              >
                {item.label}
              </button>
            ))}
            <Button
              onClick={() => scrollToSection('#get-involved')}
              className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground mt-4"
            >
              Donate Now
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
