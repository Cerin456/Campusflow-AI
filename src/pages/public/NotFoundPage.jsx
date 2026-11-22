import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home, Compass } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="notfound-container">
      <div style={{ maxWidth: 540 }}>
        <div className="notfound-code">404</div>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: '1rem 0 0.5rem 0' }}>
          Page Not Found
        </h2>
        <p style={{ color: '#64748B', fontSize: '1.05rem', marginBottom: '2rem' }}>
          The requested page could not be located in our automation directory. It may have moved or been decommissioned.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/" className="btn btn-primary">
            <Home size={18} /> Return Home
          </Link>
          <Link to="/app/dashboard" className="btn btn-outline-dark">
            <Compass size={18} /> Open Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
