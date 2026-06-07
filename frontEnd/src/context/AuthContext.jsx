/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';
import { api } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (token && savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    return null;
  });
  const [loading] = useState(false);

  const login = async (email, password) => {
    const res = await api.auth.login(email, password);
    localStorage.setItem('token', res.token);
    const userProfile = {
      fullName: res.fullName,
      email: res.email,
      role: res.role,
    };
    localStorage.setItem('user', JSON.stringify(userProfile));
    setUser(userProfile);
    return userProfile;
  };

  const register = async (fullName, email, password, role) => {
    return await api.auth.register(fullName, email, password, role);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const customSetUser = (newVal) => {
    if (newVal) {
      localStorage.setItem('user', JSON.stringify(newVal));
    } else {
      localStorage.removeItem('user');
    }
    setUser(newVal);
  };

  const val = {
    user,
    setUser: customSetUser,
    loading,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={val}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
}
