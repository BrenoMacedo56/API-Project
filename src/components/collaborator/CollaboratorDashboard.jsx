import React from 'react';
import Card from '../common/Card';
import { formatCurrency } from '../../utils/formatters';

const CollaboratorDashboard = ({ balance, recentTransactions }) => {
  // Estilos
  const dashboardStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
    marginBottom: '30px',
  };
  
  const balanceCardStyle = {
    textAlign: 'center',
    padding: '20px',
  };
  
  const balanceValueStyle = {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#3498db',
    margin: '10px 0',
  };
  
  const balanceLabelStyle = {
    fontSize: '16px',
    color: '#7f8c8d',
  };
  
  const transactionListStyle = {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  };
  
  const transactionItemStyle = {
    padding: '12px 0',
    borderBottom: '1px solid #f1f1f1',
    display: 'flex',
    justifyContent: 'space-between',
  };
  
  const transactionTypeStyle = (type) => ({
    fontWeight: '500',
    color: type === 'INCOME' ? '#2ecc71' : '#e74c3c',
  });
  
  return (
    <div>
      <h2 style={{ marginBottom: '20px', fontSize: '24px', fontWeight: '600' }}>
        Dashboard
      </h2>
      
      <div style={dashboardStyle}>
        <Card>
          <div style={balanceCardStyle}>
            <div style={balanceValueStyle}>
              {formatCurrency(balance || 0)}
            </div>
            <div style={balanceLabelStyle}>Saldo Atual</div>
          </div>
        </Card>
      </div>
      
      <h3 style={{ marginBottom: '15px', fontSize: '18px', fontWeight: '600' }}>
        Transações Recentes
      </h3>
      
      <Card>
        {recentTransactions && recentTransactions.length > 0 ? (
          <ul style={transactionListStyle}>
            {recentTransactions.map((transaction) => (
              <li key={transaction.id} style={transactionItemStyle}>
                <div>
                  <div style={{ fontWeight: '500' }}>{transaction.description}</div>
                  <div style={{ fontSize: '14px', color: '#7f8c8d' }}>
                    {new Date(transaction.createdAt).toLocaleDateString('pt-BR')}
                  </div>
                </div>
                <div style={transactionTypeStyle(transaction.type)}>
                  {transaction.type === 'INCOME' ? '+' : '-'} {formatCurrency(transaction.amount)}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <p>Nenhuma transação recente.</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default CollaboratorDashboard;
