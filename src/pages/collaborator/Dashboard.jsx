import React, { useEffect, useState } from 'react';
import CollaboratorDashboard from '../../components/collaborator/CollaboratorDashboard';
import { useAuth } from '../../hooks/useAuth';
import authService from '../../services/auth.service';
import transactionService from '../../services/transaction.service';
import Loader from '../../components/common/Loader';

const Dashboard = () => {
  const { user } = useAuth();
  const [balance, setBalance] = useState(0);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Buscar saldo e transações recentes
        const [balanceResponse, transactionsResponse] = await Promise.all([
          authService.getBalance(),
          transactionService.getTransactions()
        ]);
        
        setBalance(balanceResponse.data?.balance || 0);
        
        // Ordenar transações por data (mais recentes primeiro) e pegar as 5 primeiras
        const sortedTransactions = (transactionsResponse.data || [])
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5);
        
        setRecentTransactions(sortedTransactions);
      } catch (err) {
        setError(err.message || 'Erro ao carregar dados do dashboard');
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);

  if (loading) {
    return <Loader fullScreen />;
  }

  if (error) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Erro ao carregar dashboard</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <CollaboratorDashboard 
      balance={balance}
      recentTransactions={recentTransactions}
    />
  );
};

export default Dashboard;
