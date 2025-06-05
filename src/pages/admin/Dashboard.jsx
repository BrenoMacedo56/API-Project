import React, { useState, useEffect } from 'react';
import AdminDashboard from '../../components/admin/AdminDashboard';
import userService from '../../services/user.service';
import transactionService from '../../services/transaction.service';
import Loader from '../../components/common/Loader';

const Dashboard = () => {
  const [stats, setStats] = useState({
    userCount: 0,
    transactionCount: 0,
    totalBalance: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Em um cenário real, teríamos endpoints específicos para estatísticas
        // Aqui estamos simulando com os endpoints disponíveis
        const [usersResponse, transactionsResponse] = await Promise.all([
          userService.getAllUsers(),
          transactionService.getTransactions()
        ]);
        
        const users = usersResponse.data || [];
        const transactions = transactionsResponse.data || [];
        
        // Calcular saldo total (em um cenário real, isso viria da API)
        const totalBalance = transactions.reduce((sum, transaction) => {
          if (transaction.type === 'INCOME') {
            return sum + transaction.amount;
          } else {
            return sum - transaction.amount;
          }
        }, 0);
        
        setStats({
          userCount: users.length,
          transactionCount: transactions.length,
          totalBalance
        });
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

  return <AdminDashboard {...stats} />;
};

export default Dashboard;
