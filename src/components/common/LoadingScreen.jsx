import React from 'react';

export default function LoadingScreen() {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        {/* Logo / Brand */}
        <div style={styles.logoWrapper}>
          <div style={styles.logoIcon}>
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="48" height="48" rx="12" fill="url(#gradient)" />
              <path
                d="M24 12L14 18V30L24 36L34 30V18L24 12Z"
                stroke="white"
                strokeWidth="2"
                strokeLinejoin="round"
                fill="none"
              />
              <path
                d="M24 12V24M24 24L34 18M24 24L14 18M24 24V36"
                stroke="white"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <circle cx="24" cy="24" r="3" fill="white" />
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="48" y2="48">
                  <stop stopColor="#6366F1" />
                  <stop offset="1" stopColor="#8B5CF6" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h1 style={styles.title}>
            Campus<span style={styles.titleAccent}>Flow</span>{' '}
            <span style={styles.titleAI}>AI</span>
          </h1>
        </div>

        {/* Spinner */}
        <div style={styles.spinnerWrapper}>
          <div className="cf-loading-spinner" />
        </div>

        <p style={styles.subtitle}>Loading your workspace…</p>
      </div>

      {/* Inline keyframe styles — no external CSS needed */}
      <style>{`
        .cf-loading-spinner {
          width: 40px;
          height: 40px;
          border: 3px solid rgba(99, 102, 241, 0.15);
          border-top-color: #6366F1;
          border-radius: 50%;
          animation: cf-spin 0.8s linear infinite;
        }

        @keyframes cf-spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

const styles = {
  container: {
    position: 'fixed',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#fafbfc',
    zIndex: 9999,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '24px',
  },
  logoWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
  },
  logoIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    margin: 0,
    fontSize: '1.5rem',
    fontWeight: 700,
    color: '#1e293b',
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  titleAccent: {
    color: '#6366F1',
  },
  titleAI: {
    fontSize: '0.875rem',
    fontWeight: 600,
    color: '#8B5CF6',
    verticalAlign: 'super',
  },
  spinnerWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subtitle: {
    margin: 0,
    fontSize: '0.875rem',
    color: '#94a3b8',
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
};
