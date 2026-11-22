import React, { useState, useContext, createContext, useEffect } from 'react';
import bcrypt from 'bcryptjs';

const AuthContext = createContext(null);

const STORAGE_KEYS = {
  SESSION: 'campusflow_session',
  USERS: 'campusflow_users',
  RESET_CODES: 'campusflow_reset_codes',
};

function getStoredUsers() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USERS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveStoredUsers(users) {
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
}

function getStoredResetCodes() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.RESET_CODES);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveStoredResetCodes(codes) {
  localStorage.setItem(STORAGE_KEYS.RESET_CODES, JSON.stringify(codes));
}

function sanitizeUserForSession(user) {
  const { hashedPassword, ...safeUser } = user;
  return safeUser;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // On mount: restore session from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.SESSION);
      if (raw) {
        const session = JSON.parse(raw);
        if (session && session.user) {
          setUser(session.user);
          setIsAuthenticated(true);
        }
      }
    } catch {
      localStorage.removeItem(STORAGE_KEYS.SESSION);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Register a new user.
   * @param {{ name: string, email: string, password: string, role: string, institution: string }} params
   * @returns {{ success: boolean, error?: string }}
   */
  const register = ({ name, email, password, role, institution }) => {
    try {
      if (!name || !email || !password || !role) {
        return { success: false, error: 'Name, email, password, and role are required.' };
      }

      const emailLower = email.toLowerCase().trim();
      const users = getStoredUsers();

      if (users.some((u) => u.email === emailLower)) {
        return { success: false, error: 'An account with this email already exists.' };
      }

      const hashedPassword = bcrypt.hashSync(password, 10);

      const newUser = {
        id: Date.now(),
        name: name.trim(),
        email: emailLower,
        hashedPassword,
        role,
        institution: institution || '',
        onboarded: false,
        createdAt: new Date().toISOString(),
      };

      users.push(newUser);
      saveStoredUsers(users);

      const sessionUser = sanitizeUserForSession(newUser);
      localStorage.setItem(
        STORAGE_KEYS.SESSION,
        JSON.stringify({ user: sessionUser })
      );

      setUser(sessionUser);
      setIsAuthenticated(true);

      return { success: true };
    } catch (err) {
      return { success: false, error: err.message || 'Registration failed. Please try again.' };
    }
  };

  /**
   * Log in an existing user.
   * @param {{ email: string, password: string, remember?: boolean }} params
   * @returns {{ success: boolean, error?: string }}
   */
  const login = ({ email, password, remember }) => {
    try {
      if (!email || !password) {
        return { success: false, error: 'Email and password are required.' };
      }

      const emailLower = email.toLowerCase().trim();
      const users = getStoredUsers();
      const foundUser = users.find((u) => u.email === emailLower);

      if (!foundUser) {
        return { success: false, error: 'No account found with this email.' };
      }

      const passwordMatch = bcrypt.compareSync(password, foundUser.hashedPassword);
      if (!passwordMatch) {
        return { success: false, error: 'Incorrect password. Please try again.' };
      }

      const sessionUser = sanitizeUserForSession(foundUser);
      const session = {
        user: sessionUser,
        remember: !!remember,
        expiresAt: remember
          ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days
          : new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),      // 1 day
      };

      localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(session));

      setUser(sessionUser);
      setIsAuthenticated(true);

      return { success: true };
    } catch (err) {
      return { success: false, error: err.message || 'Login failed. Please try again.' };
    }
  };

  /**
   * Log out the current user.
   */
  const logout = () => {
    localStorage.removeItem(STORAGE_KEYS.SESSION);
    setUser(null);
    setIsAuthenticated(false);
  };

  /**
   * Merge updates into the current user and persist to localStorage.
   * @param {object} updates - Fields to merge into the user object.
   */
  const updateUser = (updates) => {
    try {
      if (!user) {
        return { success: false, error: 'No user is currently logged in.' };
      }

      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);

      // Update session
      const rawSession = localStorage.getItem(STORAGE_KEYS.SESSION);
      const session = rawSession ? JSON.parse(rawSession) : {};
      session.user = updatedUser;
      localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(session));

      // Update users array
      const users = getStoredUsers();
      const idx = users.findIndex((u) => u.id === user.id);
      if (idx !== -1) {
        users[idx] = { ...users[idx], ...updates };
        saveStoredUsers(users);
      }

      return { success: true };
    } catch (err) {
      return { success: false, error: err.message || 'Failed to update user.' };
    }
  };

  /**
   * Simulate a forgot-password flow by generating a temporary reset code.
   * @param {string} email
   * @returns {{ success: boolean, error?: string, code?: string }}
   */
  const forgotPassword = (email) => {
    try {
      if (!email) {
        return { success: false, error: 'Email is required.' };
      }

      const emailLower = email.toLowerCase().trim();
      const users = getStoredUsers();
      const exists = users.some((u) => u.email === emailLower);

      if (!exists) {
        return { success: false, error: 'No account found with this email.' };
      }

      // Generate a 6-digit reset code
      const code = String(Math.floor(100000 + Math.random() * 900000));
      const codes = getStoredResetCodes();
      codes[emailLower] = {
        code,
        createdAt: Date.now(),
        expiresAt: Date.now() + 15 * 60 * 1000, // 15 minutes
      };
      saveStoredResetCodes(codes);

      // In a real app this would be sent via email; here we return it for demo purposes.
      return { success: true, code };
    } catch (err) {
      return { success: false, error: err.message || 'Failed to process reset request.' };
    }
  };

  /**
   * Reset a user's password after validating the reset code.
   * @param {string} email
   * @param {string} code
   * @param {string} newPassword
   * @returns {{ success: boolean, error?: string }}
   */
  const resetPassword = (email, code, newPassword) => {
    try {
      if (!email || !code || !newPassword) {
        return { success: false, error: 'Email, code, and new password are required.' };
      }

      const emailLower = email.toLowerCase().trim();
      const codes = getStoredResetCodes();
      const stored = codes[emailLower];

      if (!stored) {
        return { success: false, error: 'No reset code found. Please request a new one.' };
      }

      if (Date.now() > stored.expiresAt) {
        delete codes[emailLower];
        saveStoredResetCodes(codes);
        return { success: false, error: 'Reset code has expired. Please request a new one.' };
      }

      if (stored.code !== code) {
        return { success: false, error: 'Invalid reset code.' };
      }

      // Update the password in the users array
      const users = getStoredUsers();
      const idx = users.findIndex((u) => u.email === emailLower);
      if (idx === -1) {
        return { success: false, error: 'User not found.' };
      }

      users[idx].hashedPassword = bcrypt.hashSync(newPassword, 10);
      saveStoredUsers(users);

      // Clean up used code
      delete codes[emailLower];
      saveStoredResetCodes(codes);

      return { success: true };
    } catch (err) {
      return { success: false, error: err.message || 'Failed to reset password.' };
    }
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    register,
    login,
    logout,
    updateUser,
    forgotPassword,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
