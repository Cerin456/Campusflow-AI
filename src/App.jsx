import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import LoadingScreen from './components/common/LoadingScreen';

// Public Pages
const LandingPage = lazy(() => import('./pages/public/LandingPage'));
const FeaturesPage = lazy(() => import('./pages/public/FeaturesPage'));
const AboutPage = lazy(() => import('./pages/public/AboutPage'));
const ContactPage = lazy(() => import('./pages/public/ContactPage'));
const LoginPage = lazy(() => import('./pages/public/LoginPage'));
const RegisterPage = lazy(() => import('./pages/public/RegisterPage'));
const ForgotPasswordPage = lazy(() => import('./pages/public/ForgotPasswordPage'));
const PrivacyPage = lazy(() => import('./pages/public/PrivacyPage'));
const TermsPage = lazy(() => import('./pages/public/TermsPage'));
const NotFoundPage = lazy(() => import('./pages/public/NotFoundPage'));

// Onboarding
const OnboardingPage = lazy(() => import('./pages/public/OnboardingPage'));

// App Layout & Protected Pages
const AppLayout = lazy(() => import('./components/layout/AppLayout'));
const DashboardPage = lazy(() => import('./pages/app/DashboardPage'));
const AutomationsPage = lazy(() => import('./pages/app/AutomationsPage'));
const NoticesPage = lazy(() => import('./pages/app/NoticesPage'));
const RemindersPage = lazy(() => import('./pages/app/RemindersPage'));
const AttendancePage = lazy(() => import('./pages/app/AttendancePage'));
const DocumentsPage = lazy(() => import('./pages/app/DocumentsPage'));
const HistoryPage = lazy(() => import('./pages/app/HistoryPage'));
const SettingsPage = lazy(() => import('./pages/app/SettingsPage'));

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />

            {/* Guided Onboarding (Protected) */}
            <Route
              path="/onboarding"
              element={
                <ProtectedRoute>
                  <OnboardingPage />
                </ProtectedRoute>
              }
            />

            {/* Protected SaaS App Routes */}
            <Route
              path="/app"
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="automations" element={<AutomationsPage />} />
              <Route path="notices" element={<NoticesPage />} />
              <Route path="reminders" element={<RemindersPage />} />
              <Route path="attendance" element={<AttendancePage />} />
              <Route path="documents" element={<DocumentsPage />} />
              <Route path="history" element={<HistoryPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>

            {/* Catch-all 404 Route */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  );
}
