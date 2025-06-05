import api from './api';

const transactionService = {
  getTransactions: async () => {
    return api.get('/transactions');
  },
  
  createTransaction: async (transactionData) => {
    return api.post('/transactions', transactionData);
  },
  
  updateTransaction: async (id, transactionData) => {
    return api.patch(`/transactions/${id}`, transactionData);
  },
  
  deleteTransaction: async (id) => {
    return api.delete(`/transactions/${id}`);
  }
};

export default transactionService;
