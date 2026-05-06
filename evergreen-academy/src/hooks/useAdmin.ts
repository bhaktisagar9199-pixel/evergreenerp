import { useState, useEffect } from 'react';

const AUTH_KEY = 'school_auth';

interface AuthState {
  isAdmin: boolean;
  token: string | null;
}

export function useAdmin() {
  const [authState, setAuthState] = useState<AuthState>(() => {
    try {
      const stored = localStorage.getItem(AUTH_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Error reading auth state', e);
    }
    return { isAdmin: false, token: null };
  });

  const login = (username: string, pass: string) => {
    if (username === 'admin' && pass === 'school2024') {
      const newState = { isAdmin: true, token: 'school-admin-token' };
      localStorage.setItem(AUTH_KEY, JSON.stringify(newState));
      setAuthState(newState);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem(AUTH_KEY);
    setAuthState({ isAdmin: false, token: null });
  };

  return {
    isAdmin: authState.isAdmin,
    login,
    logout,
  };
}
