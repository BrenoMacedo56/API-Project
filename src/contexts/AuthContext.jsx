import React, { createContext, useState, useEffect } from 'react';
import { getToken, setTokens, removeTokens } from '../utils/storage';
import authService from '../services/auth.service';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (token) {
      authService.getProfile()
        .then(response => {
          setUser(response.data);
        })
        .catch(() => {
          removeTokens();
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const response = await authService.login(email, password);
    setTokens(response.data.tokens.accessToken, response.data.tokens.refreshToken);
    setUser(response.data);
    return response.data;
  };

  const logout = () => {
    removeTokens();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
