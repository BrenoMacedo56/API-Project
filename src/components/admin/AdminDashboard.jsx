import React from 'react';
import Card from '../common/Card';

const AdminDashboard = ({ userCount, transactionCount, totalBalance }) => {
  // Estilos
  const dashboardStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
    marginBottom: '30px',
  };
  
  const statCardStyle = {
    textAlign: 'center',
    padding: '20px',
  };
  
  const statValueStyle = {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#3498db',
    margin: '10px 0',
  };
  
  const statLabelStyle = {
    fontSize: '16px',
    color: '#7f8c8d',
  };
  
  return (
    <div>
      <h2 style={{ marginBottom: '20px', fontSize: '24px', fontWeight: '600' }}>
        Dashboard Administrativo
      </h2>
      
      <div style={dashboardStyle}>
        <Card>
          <div style={statCardStyle}>
            <div style={statValueStyle}>{userCount || 0}</div>
            <div style={statLabelStyle}>Usuários Cadastrados</div>
          </div>
        </Card>
        
        <Card>
          <div style={statCardStyle}>
            <div style={statValueStyle}>{transactionCount || 0}</div>
            <div style={statLabelStyle}>Transações Realizadas</div>
          </div>
        </Card>
        
        <Card>
          <div style={statCardStyle}>
            <div style={statValueStyle}>
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(totalBalance || 0)}
            </div>
            <div style={statLabelStyle}>Saldo Total</div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
