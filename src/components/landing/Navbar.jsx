import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, Zap } from 'lucide-react';
import { smoothScrollTo } from '../../utils/animations';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId) => {
    setMobileMenuOpen(false);
    if (isHomePage) {
      smoothScrollTo(sectionId);
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-inner">
        {/* Brand Logo */}
        <Link to="/" className="nav-brand">
          <div className="brand-icon">
            <Zap size={22} color="#FFFFFF" />
          </div>
          <span className="brand-text">
            Campus<span>Flow</span>
            <span className="brand-badge">AI</span>
          </span>
        </Link>

        {/* Desktop Nav Items */}
        <ul className="nav-menu">
          <li className="nav-item">
            {isHomePage ? (
              <a href="#hero" onClick={(e) => { e.preventDefault(); handleNavClick('hero'); }}>
                Home
              </a>
            ) : (
              <Link to="/">Home</Link>
            )}
          </li>
          <li className="nav-item">
            {isHomePage ? (
              <a href="#features" onClick={(e) => { e.preventDefault(); handleNavClick('features'); }}>
                Features
              </a>
            ) : (
              <Link to="/features">Features</Link>
            )}
          </li>
          <li className="nav-item">
            {isHomePage ? (
              <a href="#how-it-works" onClick={(e) => { e.preventDefault(); handleNavClick('how-it-works'); }}>
                How It Works
              </a>
            ) : (
              <Link to="/#how-it-works">How It Works</Link>
            )}
          </li>
          <li className="nav-item">
            {isHomePage ? (
              <a href="#use-cases" onClick={(e) => { e.preventDefault(); handleNavClick('use-cases'); }}>
                Solutions
              </a>
            ) : (
              <Link to="/#use-cases">Solutions</Link>
            )}
          </li>
          <li className="nav-item">
            <Link to="/about">About</Link>
          </li>
          <li className="nav-item">
            <Link to="/contact">Contact</Link>
          </li>
        </ul>

        {/* Right CTA Actions */}
        <div className="nav-actions">
          <Link to="/login" className="btn btn-outline btn-sm">
            Login
          </Link>
          <Link to="/register" className="btn btn-primary btn-sm">
            Get Started <ArrowRight size={15} />
          </Link>
        </div>

        {/* Hamburger Toggle */}
        <button
          className="hamburger"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <div className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('hero');
          }}
        >
          Home
        </a>
        <a
          href="#features"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('features');
          }}
        >
          Features
        </a>
        <a
          href="#how-it-works"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('how-it-works');
          }}
        >
          How It Works
        </a>
        <a
          href="#use-cases"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('use-cases');
          }}
        >
          Solutions
        </a>
        <Link to="/about" onClick={() => setMobileMenuOpen(false)}>
          About
        </Link>
        <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
          Contact
        </Link>
        <div className="mobile-actions">
          <Link
            to="/login"
            className="btn btn-outline"
            onClick={() => setMobileMenuOpen(false)}
          >
            Login
          </Link>
          <Link
            to="/register"
            className="btn btn-primary"
            onClick={() => setMobileMenuOpen(false)}
          >
            Get Started Free
          </Link>
        </div>
      </div>
    </nav>
  );
}
