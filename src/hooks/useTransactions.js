import { useState, useEffect } from 'react';
import transactionService from '../services/transaction.service';

export const useTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [shouldRefetch, setShouldRefetch] = useState(0);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await transactionService.getTransactions();
      setTransactions(response.data);
    } catch (err) {
      setError(err.response?.data?.errorMessage || 'Erro ao carregar transações');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [shouldRefetch]);

  const refetch = () => {
    setShouldRefetch(prev => prev + 1);
  };

  const createTransaction = async (transactionData) => {
    try {
      setLoading(true);
      const response = await transactionService.createTransaction(transactionData);
      refetch();
      return response.data;
    } catch (err) {
      setError(err.response?.data?.errorMessage || 'Erro ao criar transação');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateTransaction = async (id, transactionData) => {
    try {
      setLoading(true);
      const response = await transactionService.updateTransaction(id, transactionData);
      refetch();
      return response.data;
    } catch (err) {
      setError(err.response?.data?.errorMessage || 'Erro ao atualizar transação');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteTransaction = async (id) => {
    try {
      setLoading(true);
      await transactionService.deleteTransaction(id);
      refetch();
    } catch (err) {
      setError(err.response?.data?.errorMessage || 'Erro ao excluir transação');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    transactions,
    loading,
    error,
    refetch,
    createTransaction,
    updateTransaction,
    deleteTransaction
  };
};
