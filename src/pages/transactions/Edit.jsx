import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TransactionForm from '../../components/transactions/TransactionForm';
import { useTransactions } from '../../hooks/useTransactions';
import transactionService from '../../services/transaction.service';
import Loader from '../../components/common/Loader';
import Card from '../../components/common/Card';

const Edit = () => {
  const { id } = useParams();
  const { updateTransaction } = useTransactions();
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        setLoading(true);
        // Normalmente teríamos um endpoint para buscar uma transação específica
        // Aqui estamos simulando buscando todas e filtrando
        const response = await transactionService.getTransactions();
        const foundTransaction = response.data.find(t => t.id === id);
        
        if (!foundTransaction) {
          throw new Error('Transação não encontrada');
        }
        
        setTransaction(foundTransaction);
      } catch (err) {
        setError(err.message || 'Erro ao carregar transação');
      } finally {
        setLoading(false);
      }
    };
    
    fetchTransaction();
  }, [id]);

  const handleSubmit = async (transactionData) => {
    try {
      setLoading(true);
      setError(null);
      await updateTransaction(id, transactionData);
      navigate('/transactions');
    } catch (err) {
      setError(err.response?.data?.errorMessage || 'Erro ao atualizar transação');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !transaction) {
    return <Loader fullScreen />;
  }

  if (error && !transaction) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Erro</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <h2 style={{ marginBottom: '20px', fontSize: '24px', fontWeight: '600' }}>
        Editar Transação
      </h2>
      
      {error && (
        <Card variant="danger" style={{ marginBottom: '20px' }}>
          <p style={{ color: '#e74c3c' }}>{error}</p>
        </Card>
      )}
      
      {transaction && (
        <TransactionForm 
          onSubmit={handleSubmit} 
          initialValues={transaction}
          isEditing={true}
        />
      )}
      
      {loading && <Loader fullScreen />}
    </div>
  );
};

export default Edit;
