import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TransactionForm from '../../components/transactions/TransactionForm';
import { useTransactions } from '../../hooks/useTransactions';
import Loader from '../../components/common/Loader';
import Card from '../../components/common/Card';

const Create = () => {
  const { createTransaction } = useTransactions();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (transactionData) => {
    try {
      setLoading(true);
      setError(null);
      await createTransaction(transactionData);
      navigate('/transactions');
    } catch (err) {
      setError(err.response?.data?.errorMessage || 'Erro ao criar transação');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: '20px', fontSize: '24px', fontWeight: '600' }}>
        Nova Transação
      </h2>
      
      {error && (
        <Card variant="danger" style={{ marginBottom: '20px' }}>
          <p style={{ color: '#e74c3c' }}>{error}</p>
        </Card>
      )}
      
      <TransactionForm onSubmit={handleSubmit} />
      
      {loading && <Loader fullScreen />}
    </div>
  );
};

export default Create;
