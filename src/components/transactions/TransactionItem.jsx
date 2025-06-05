import React from 'react';
import { formatCurrency, formatDate } from '../../utils/formatters';

const TransactionItem = ({ transaction, onEdit, onDelete }) => {
  // Estilos
  const itemStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px',
    borderBottom: '1px solid #f1f1f1',
    transition: 'background-color 0.2s ease',
    ':hover': {
      backgroundColor: '#f9f9f9',
    },
  };
  
  const contentStyle = {
    flex: 1,
  };
  
  const descriptionStyle = {
    fontSize: '16px',
    fontWeight: '500',
    marginBottom: '5px',
  };
  
  const dateStyle = {
    fontSize: '14px',
    color: '#7f8c8d',
  };
  
  const amountStyle = {
    fontSize: '18px',
    fontWeight: '600',
    color: transaction.type === 'INCOME' ? '#2ecc71' : '#e74c3c',
    marginLeft: '15px',
  };
  
  const actionsStyle = {
    display: 'flex',
    gap: '10px',
  };
  
  const buttonStyle = {
    padding: '8px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    border: 'none',
    fontSize: '14px',
    fontWeight: '500',
  };
  
  const editButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#f1f1f1',
    color: '#333',
  };
  
  const deleteButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#ffebee',
    color: '#e74c3c',
  };
  
  return (
    <div style={itemStyle}>
      <div style={contentStyle}>
        <div style={descriptionStyle}>{transaction.description}</div>
        <div style={dateStyle}>{formatDate(transaction.createdAt)}</div>
      </div>
      
      <div style={amountStyle}>
        {transaction.type === 'INCOME' ? '+' : '-'} {formatCurrency(transaction.amount)}
      </div>
      
      <div style={actionsStyle}>
        <button 
          style={editButtonStyle}
          onClick={() => onEdit(transaction)}
        >
          Editar
        </button>
        <button 
          style={deleteButtonStyle}
          onClick={() => onDelete(transaction.id)}
        >
          Excluir
        </button>
      </div>
    </div>
  );
};

export default TransactionItem;
