import React, { useState, useEffect } from 'react';
import UserManagement from '../../components/admin/UserManagement';
import userService from '../../services/user.service';
import Loader from '../../components/common/Loader';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'collaborator'
  });

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await userService.getAllUsers();
      setUsers(response.data || []);
    } catch (err) {
      setError(err.message || 'Erro ao carregar usuários');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: '',
      role: user.role || 'collaborator'
    });
    setShowModal(true);
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      try {
        setLoading(true);
        await userService.deleteUser(userId);
        fetchUsers();
      } catch (err) {
        setError(err.message || 'Erro ao excluir usuário');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (editingUser) {
        await userService.updateUser(editingUser.id, formData);
      } else {
        await userService.createUser(formData);
      }
      setShowModal(false);
      fetchUsers();
    } catch (err) {
      setError(err.message || 'Erro ao salvar usuário');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Estilos para o modal
  const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: showModal ? 'flex' : 'none',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  };

  const modalContentStyle = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    width: '90%',
    maxWidth: '500px',
    maxHeight: '90vh',
    overflow: 'auto',
  };

  if (loading && !showModal) {
    return <Loader fullScreen />;
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '600' }}>Usuários</h2>
        <Button onClick={() => {
          setEditingUser(null);
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            role: 'collaborator'
          });
          setShowModal(true);
        }}>
          Novo Usuário
        </Button>
      </div>

      {error && (
        <Card variant="danger" style={{ marginBottom: '20px' }}>
          <p style={{ color: '#e74c3c' }}>{error}</p>
        </Card>
      )}

      <UserManagement 
        users={users} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
      />

      {/* Modal de edição/criação */}
      <div style={modalOverlayStyle}>
        <div style={modalContentStyle}>
          <h3 style={{ marginBottom: '20px' }}>
            {editingUser ? 'Editar Usuário' : 'Novo Usuário'}
          </h3>
          
          <form onSubmit={handleSubmit}>
            <Input
              label="Nome"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            
            <Input
              label="Sobrenome"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            
            <Input
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            
            <Input
              label={editingUser ? 'Nova Senha (deixe em branco para manter)' : 'Senha'}
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required={!editingUser}
            />
            
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px' }}>Perfil</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  fontSize: '16px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                }}
              >
                <option value="admin">Administrador</option>
                <option value="collaborator">Colaborador</option>
              </select>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
              <Button 
                variant="secondary" 
                onClick={() => setShowModal(false)}
              >
                Cancelar
              </Button>
              <Button type="submit">
                {editingUser ? 'Atualizar' : 'Criar'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Users;
