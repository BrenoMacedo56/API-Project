import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TransactionList from '../../components/transactions/TransactionList';
import { useTransactions } from '../../hooks/useTransactions';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import Card from '../../components/common/Card';

const List = () => {
  const { transactions, loading, error, deleteTransaction, refetch } = useTransactions();
  const navigate = useNavigate();

  useEffect(() => {
    refetch();
  }, []);

  const handleEdit = (transaction) => {
    navigate(`/transactions/edit/${transaction.id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta transação?')) {
      try {
        await deleteTransaction(id);
      } catch (err) {
        console.error('Erro ao excluir transação:', err);
      }
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '600' }}>Transações</h2>
        <Button onClick={() => navigate('/transactions/create')}>
          Nova Transação
        </Button>
      </div>
      
      {error && (
        <Card variant="danger" style={{ marginBottom: '20px' }}>
          <p style={{ color: '#e74c3c' }}>{error}</p>
        </Card>
      )}
      
      <TransactionList 
        transactions={transactions} 
        onEdit={handleEdit} 
        onDelete={handleDelete}
        loading={loading}
      />
      
      {loading && <Loader />}
    </div>
  );
};

export default List;
