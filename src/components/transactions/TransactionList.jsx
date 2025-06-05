import React, { useState } from 'react';
import Card from '../common/Card';
import TransactionItem from './TransactionItem';
import Button from '../common/Button';
import Input from '../common/Input';

const TransactionList = ({ transactions, onEdit, onDelete, loading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('ALL');
  
  // Estilos
  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    flexWrap: 'wrap',
    gap: '15px',
  };
  
  const searchContainerStyle = {
    maxWidth: '300px',
    flex: 1,
  };
  
  const filterContainerStyle = {
    display: 'flex',
    gap: '10px',
  };
  
  const filterButtonStyle = (active) => ({
    backgroundColor: active ? '#3498db' : '#f1f1f1',
    color: active ? 'white' : '#333',
    padding: '8px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    border: 'none',
    fontSize: '14px',
    fontWeight: '500',
  });
  
  const emptyStateStyle = {
    textAlign: 'center',
    padding: '30px 20px',
    color: '#7f8c8d',
  };
  
  const loadingStateStyle = {
    textAlign: 'center',
    padding: '30px 20px',
  };
  
  // Filtrar transações
  const filteredTransactions = transactions?.filter(transaction => {
    // Filtro de pesquisa
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filtro de tipo
    const matchesType = filterType === 'ALL' || transaction.type === filterType;
    
    return matchesSearch && matchesType;
  }) || [];
  
  return (
    <div>
      <div style={headerStyle}>
        <div style={searchContainerStyle}>
          <Input 
            placeholder="Pesquisar transações..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div style={filterContainerStyle}>
          <button 
            style={filterButtonStyle(filterType === 'ALL')}
            onClick={() => setFilterType('ALL')}
          >
            Todas
          </button>
          <button 
            style={filterButtonStyle(filterType === 'INCOME')}
            onClick={() => setFilterType('INCOME')}
          >
            Receitas
          </button>
          <button 
            style={filterButtonStyle(filterType === 'EXPENSE')}
            onClick={() => setFilterType('EXPENSE')}
          >
            Despesas
          </button>
        </div>
      </div>
      
      <Card>
        {loading ? (
          <div style={loadingStateStyle}>
            <p>Carregando transações...</p>
          </div>
        ) : filteredTransactions.length > 0 ? (
          filteredTransactions.map(transaction => (
            <TransactionItem 
              key={transaction.id}
              transaction={transaction}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        ) : (
          <div style={emptyStateStyle}>
            <p>Nenhuma transação encontrada.</p>
            {searchTerm || filterType !== 'ALL' ? (
              <Button 
                variant="secondary"
                onClick={() => {
                  setSearchTerm('');
                  setFilterType('ALL');
                }}
              >
                Limpar filtros
              </Button>
            ) : null}
          </div>
        )}
      </Card>
    </div>
  );
};

export default TransactionList;
