import api from './api';

const authService = {
  login: async (email, password) => {
    return api.post('/auth/login', { email, password });
  },
  
  register: async (userData) => {
    return api.post('/users', userData);
  },
  
  getProfile: async () => {
    return api.get('/me');
  },
  
  updateProfile: async (userData) => {
    return api.patch('/me', userData);
  },
  
  deleteAccount: async () => {
    return api.delete('/me');
  },
  
  getBalance: async () => {
    return api.get('/me/balance');
  },
  
  refreshToken: async (refreshToken) => {
    return api.post('/refresh-token', { refreshToken });
  }
};

export default authService;
