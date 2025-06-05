import React, { useState } from 'react';
import Button from '../common/Button';
import Card from '../common/Card';
import Input from '../common/Input';

const UserManagement = ({ users, onDelete, onEdit }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Estilos
  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  };
  
  const searchContainerStyle = {
    maxWidth: '300px',
  };
  
  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
  };
  
  const thStyle = {
    textAlign: 'left',
    padding: '12px 15px',
    borderBottom: '1px solid #ddd',
    backgroundColor: '#f9f9f9',
  };
  
  const tdStyle = {
    padding: '12px 15px',
    borderBottom: '1px solid #ddd',
  };
  
  const actionButtonStyle = {
    marginRight: '8px',
  };
  
  // Filtrar usuários com base no termo de pesquisa
  const filteredUsers = users?.filter(user => 
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];
  
  return (
    <div>
      <div style={headerStyle}>
        <h2 style={{ fontSize: '24px', fontWeight: '600' }}>Gerenciamento de Usuários</h2>
        <div style={searchContainerStyle}>
          <Input 
            placeholder="Pesquisar usuários..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <Card>
        {filteredUsers.length > 0 ? (
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Nome</th>
                <th style={thStyle}>Email</th>
                <th style={thStyle}>Perfil</th>
                <th style={thStyle}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td style={tdStyle}>{`${user.firstName} ${user.lastName}`}</td>
                  <td style={tdStyle}>{user.email}</td>
                  <td style={tdStyle}>{user.role === 'admin' ? 'Administrador' : 'Colaborador'}</td>
                  <td style={tdStyle}>
                    <div style={{ display: 'flex' }}>
                      <div style={actionButtonStyle}>
                        <Button 
                          variant="secondary" 
                          onClick={() => onEdit(user)}
                        >
                          Editar
                        </Button>
                      </div>
                      <Button 
                        variant="danger" 
                        onClick={() => onDelete(user.id)}
                      >
                        Excluir
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <p>Nenhum usuário encontrado.</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default UserManagement;
