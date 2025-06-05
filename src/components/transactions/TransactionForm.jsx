import React, { useState } from 'react';
import Button from '../common/Button';
import Input from '../common/Input';
import Card from '../common/Card';

const TransactionForm = ({ onSubmit, initialValues = {}, isEditing = false }) => {
  const [description, setDescription] = useState(initialValues.description || '');
  const [amount, setAmount] = useState(initialValues.amount || '');
  const [type, setType] = useState(initialValues.type || 'EXPENSE');
  const [errors, setErrors] = useState({});
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validação
    const newErrors = {};
    if (!description.trim()) {
      newErrors.description = 'Descrição é obrigatória';
    }
    
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      newErrors.amount = 'Valor deve ser um número positivo';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Enviar dados
    onSubmit({
      description,
      amount: parseFloat(amount),
      type
    });
  };
  
  // Estilos
  const formStyle = {
    width: '100%',
  };
  
  const radioGroupStyle = {
    display: 'flex',
    marginBottom: '20px',
  };
  
  const radioLabelStyle = (selected) => ({
    flex: 1,
    padding: '10px',
    textAlign: 'center',
    cursor: 'pointer',
    backgroundColor: selected ? (type === 'INCOME' ? '#2ecc71' : '#e74c3c') : '#f1f1f1',
    color: selected ? 'white' : '#333',
    border: '1px solid #ddd',
    transition: 'all 0.2s ease',
  });
  
  return (
    <Card title={isEditing ? 'Editar Transação' : 'Nova Transação'}>
      <form style={formStyle} onSubmit={handleSubmit}>
        <div style={radioGroupStyle}>
          <label 
            style={radioLabelStyle(type === 'EXPENSE')}
            onClick={() => setType('EXPENSE')}
          >
            <input 
              type="radio" 
              name="type" 
              value="EXPENSE" 
              checked={type === 'EXPENSE'} 
              onChange={() => setType('EXPENSE')} 
              style={{ display: 'none' }}
            />
            Despesa
          </label>
          <label 
            style={radioLabelStyle(type === 'INCOME')}
            onClick={() => setType('INCOME')}
          >
            <input 
              type="radio" 
              name="type" 
              value="INCOME" 
              checked={type === 'INCOME'} 
              onChange={() => setType('INCOME')} 
              style={{ display: 'none' }}
            />
            Receita
          </label>
        </div>
        
        <Input 
          label="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Ex: Compra de supermercado"
          error={errors.description}
          required
        />
        
        <Input 
          label="Valor (R$)"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0,00"
          step="0.01"
          min="0.01"
          error={errors.amount}
          required
        />
        
        <Button 
          type="submit" 
          fullWidth
          variant={type === 'INCOME' ? 'success' : 'danger'}
        >
          {isEditing ? 'Atualizar' : 'Salvar'} Transação
        </Button>
      </form>
    </Card>
  );
};

export default TransactionForm;
