import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';

export const Footer = () => {
  const footerLinks = {
    about: [
      { label: 'Our Mission', href: '#about' },
      { label: 'Impact', href: '#impact' },
      { label: 'Team', href: '#about' },
      { label: 'Annual Reports', href: '#' },
    ],
    programs: [
      { label: 'Education Initiative', href: '#programs' },
      { label: 'Environmental Action', href: '#programs' },
      { label: 'Housing for All', href: '#programs' },
      { label: 'Health & Wellness', href: '#programs' },
    ],
    getInvolved: [
      { label: 'Volunteer', href: '#get-involved' },
      { label: 'Partner', href: '#get-involved' },
      { label: 'Donate', href: '#get-involved' },
      { label: 'Events', href: '#' },
    ],
    resources: [
      { label: 'FAQ', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Contact', href: '#contact' },
      { label: 'Privacy Policy', href: '#' },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:info@uisn.org', label: 'Email' },
  ];

  const scrollToSection = (href) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* About Column */}
          <div>
            <h3 className="font-semibold text-accent mb-4">About</h3>
            <ul className="space-y-2">
              {footerLinks.about.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-primary-foreground/80 hover:text-accent transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs Column */}
          <div>
            <h3 className="font-semibold text-accent mb-4">Programs</h3>
            <ul className="space-y-2">
              {footerLinks.programs.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-primary-foreground/80 hover:text-accent transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Involved Column */}
          <div>
            <h3 className="font-semibold text-accent mb-4">Get Involved</h3>
            <ul className="space-y-2">
              {footerLinks.getInvolved.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-primary-foreground/80 hover:text-accent transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="font-semibold text-accent mb-4">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-primary-foreground/80 hover:text-accent transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-primary-foreground/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Logo and Copyright */}
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
                <div className="text-2xl font-bold">
                  <span className="text-secondary">UI</span>
                  <span className="text-primary-foreground">SN</span>
                </div>
              </div>
              <p className="text-sm text-primary-foreground/70">
                © {new Date().getFullYear()} Utah Intercollegiate Service Network. All rights reserved.
              </p>
              <p className="text-xs text-primary-foreground/60 mt-1">
                501(c)(3) Non-Profit Organization
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-primary-foreground/10 hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
