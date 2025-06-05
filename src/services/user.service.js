import api from './api';

const userService = {
  getAllUsers: async () => {
    return api.get('/users');
  },
  
  getUserById: async (id) => {
    return api.get(`/users/${id}`);
  },
  
  createUser: async (userData) => {
    return api.post('/users', userData);
  },
  
  updateUser: async (id, userData) => {
    return api.patch(`/users/${id}`, userData);
  },
  
  deleteUser: async (id) => {
    return api.delete(`/users/${id}`);
  }
};

export default userService;
