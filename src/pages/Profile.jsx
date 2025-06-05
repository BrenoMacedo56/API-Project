import React, { useState, useEffect } from 'react';
import { User, Mail, Lock, Shield, Trash2, Save, Eye, EyeOff, CheckCircle, AlertCircle, Camera } from 'lucide-react';

const Profile = () => {
  // Simulando dados do usuário
  const user = {
    firstName: 'João',
    lastName: 'Silva',
    email: 'joao.silva@email.com',
    avatar: null
  };

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        password: '',
        confirmPassword: ''
      });
    }
  }, [user]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    if (success) setSuccess('');
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Nome é obrigatório';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Sobrenome é obrigatório';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (formData.password && formData.password.length < 6) {
      newErrors.password = 'A senha deve ter pelo menos 6 caracteres';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setSuccess('');
    
    // Simular chamada de API
    setTimeout(() => {
      setSuccess('Perfil atualizado com sucesso!');
      setFormData(prev => ({
        ...prev,
        password: '',
        confirmPassword: ''
      }));
      setLoading(false);
    }, 1500);
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.')) {
      setLoading(true);
      setTimeout(() => {
        alert('Conta excluída com sucesso!');
        setLoading(false);
      }, 2000);
    }
  };

  const Input = ({ label, icon: Icon, error, type = 'text', showToggle, onToggle, ...props }) => {
    const [isFocused, setIsFocused] = useState(false);
    
    return (
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{
          fontSize: '0.875rem',
          fontWeight: '600',
          color: '#fff',
          marginBottom: '0.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          {Icon && <Icon size={16} style={{ color: '#FFC107' }} />}
          {label}
        </label>
        <div style={{ position: 'relative' }}>
          <input
            type={type}
            style={{
              width: '100%',
              padding: '0.875rem 1rem',
              paddingRight: showToggle ? '3rem' : '1rem',
              backgroundColor: isFocused 
                ? 'rgba(255, 255, 255, 0.1)' 
                : 'rgba(255, 255, 255, 0.05)',
              border: error 
                ? '2px solid #ff4757' 
                : isFocused 
                  ? '2px solid #FFC107' 
                  : '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '0.75rem',
              fontSize: '1rem',
              color: '#fff',
              outline: 'none',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)',
              boxShadow: isFocused 
                ? '0 0 20px rgba(255, 193, 7, 0.2)' 
                : '0 4px 15px rgba(0, 0, 0, 0.1)'
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />
          {showToggle && (
            <button
              type="button"
              onClick={onToggle}
              style={{
                position: 'absolute',
                right: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: '#ccc',
                cursor: 'pointer',
                padding: '0.25rem',
                borderRadius: '0.25rem',
                transition: 'color 0.2s ease'
              }}
            >
              {type === 'password' ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
        </div>
        {error && (
          <p style={{
            color: '#ff4757',
            fontSize: '0.75rem',
            marginTop: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem'
          }}>
            <AlertCircle size={14} />
            {error}
          </p>
        )}
      </div>
    );
  };

  const Button = ({ children, variant = 'primary', disabled, icon: Icon, ...props }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    const variants = {
      primary: {
        background: disabled 
          ? 'rgba(255, 193, 7, 0.3)'
          : isHovered 
            ? 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FF8F00 100%)'
            : 'linear-gradient(135deg, #FFC107 0%, #FF8F00 50%, #FF6B35 100%)',
        color: disabled ? '#999' : '#000',
        boxShadow: disabled 
          ? 'none'
          : isHovered 
            ? '0 20px 40px rgba(255, 193, 7, 0.4)'
            : '0 10px 25px rgba(255, 193, 7, 0.3)',
      },
      danger: {
        background: disabled
          ? 'rgba(255, 71, 87, 0.3)'
          : isHovered
            ? 'linear-gradient(135deg, #ff4757 0%, #ff3742 100%)'
            : 'linear-gradient(135deg, #ff6b7a 0%, #ff4757 100%)',
        color: disabled ? '#999' : '#fff',
        boxShadow: disabled
          ? 'none'
          : isHovered
            ? '0 15px 30px rgba(255, 71, 87, 0.4)'
            : '0 8px 20px rgba(255, 71, 87, 0.3)',
      }
    };

    return (
      <button
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          padding: '0.875rem 1.5rem',
          borderRadius: '0.75rem',
          fontSize: '1rem',
          fontWeight: '600',
          border: 'none',
          cursor: disabled ? 'not-allowed' : 'pointer',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: isHovered && !disabled ? 'translateY(-2px)' : 'translateY(0)',
          width: '100%',
          ...variants[variant]
        }}
        onMouseEnter={() => !disabled && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        disabled={disabled}
        {...props}
      >
        {Icon && <Icon size={18} />}
        {children}
      </button>
    );
  };

  const Card = ({ children, style }) => (
    <div style={{
      background: 'rgba(15, 15, 15, 0.92)',
      backdropFilter: 'blur(25px)',
      borderRadius: '1.5rem',
      border: '1px solid rgba(212, 175, 55, 0.2)',
      boxShadow: '0 25px 50px rgba(0,0,0,0.5), 0 0 30px rgba(212,175,55,0.1)',
      overflow: 'hidden',
      ...style
    }}>
      {children}
    </div>
  );

  const Alert = ({ type, children }) => {
    const styles = {
      success: {
        background: 'rgba(34, 197, 94, 0.1)',
        border: '1px solid rgba(34, 197, 94, 0.3)',
        color: '#22c55e'
      },
      error: {
        background: 'rgba(255, 71, 87, 0.1)',
        border: '1px solid rgba(255, 71, 87, 0.3)',
        color: '#ff4757'
      }
    };

    return (
      <div style={{
        padding: '1rem 1.25rem',
        borderRadius: '0.75rem',
        marginBottom: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        ...styles[type]
      }}>
        {type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
        {children}
      </div>
    );
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: `
        radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%,
          rgba(212, 175, 55, 0.08) 0%,
          rgba(255, 107, 53, 0.05) 25%,
          rgba(10, 10, 10, 0.98) 60%),
        linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 40%, #000000 100%)
      `,
      padding: '2rem',
      fontFamily: "'Inter', sans-serif"
    }}>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
      `}</style>

      {/* Floating glows */}
      <div style={{
        position: 'fixed',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(212, 175, 55, 0.15), transparent)',
        filter: 'blur(80px)',
        top: '-200px',
        left: '-200px',
        animation: 'float 8s ease-in-out infinite',
        pointerEvents: 'none'
      }} />
      
      <div style={{
        position: 'fixed',
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255, 107, 53, 0.1), transparent)',
        filter: 'blur(60px)',
        bottom: '-150px',
        right: '-150px',
        animation: 'float 10s ease-in-out infinite reverse',
        pointerEvents: 'none'
      }} />

      <div style={{
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '3rem'
        }}>
          <div style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #FFC107, #FF8F00)',
            margin: '0 auto 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 20px 40px rgba(255, 193, 7, 0.3)',
            position: 'relative',
            cursor: 'pointer',
            transition: 'transform 0.3s ease'
          }}>
            <User size={48} color="#000" />
            <div style={{
              position: 'absolute',
              bottom: '10px',
              right: '10px',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'rgba(0, 0, 0, 0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(10px)'
            }}>
              <Camera size={16} color="#FFC107" />
            </div>
          </div>
          
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            background: 'linear-gradient(135deg, #FFD700 0%, #FFC107 50%, #FF8F00 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '0.5rem'
          }}>
            Meu Perfil
          </h1>
          
          <p style={{
            color: '#ccc',
            fontSize: '1.1rem'
          }}>
            Gerencie suas informações pessoais e configurações de conta
          </p>
        </div>

        {/* Alerts */}
        {success && (
          <Alert type="success">{success}</Alert>
        )}
        
        {errors.submit && (
          <Alert type="error">{errors.submit}</Alert>
        )}

        {/* Main Form */}
        <Card style={{ padding: '2.5rem', marginBottom: '2rem' }}>
          <div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.5rem',
              marginBottom: '2rem'
            }}>
              <Input
                label="Nome"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                error={errors.firstName}
                icon={User}
              />
              
              <Input
                label="Sobrenome"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                error={errors.lastName}
                icon={User}
              />
            </div>
            
            <Input
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              icon={Mail}
            />
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.5rem',
              marginBottom: '2rem'
            }}>
              <Input
                label="Nova Senha (deixe em branco para manter a atual)"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                icon={Lock}
                showToggle={true}
                onToggle={() => setShowPassword(!showPassword)}
              />
              
              {formData.password && (
                <Input
                  label="Confirmar Nova Senha"
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  error={errors.confirmPassword}
                  icon={Shield}
                  showToggle={true}
                  onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              )}
            </div>
            
            <Button
              onClick={handleSubmit}
              disabled={loading}
              icon={Save}
            >
              {loading ? 'Salvando...' : 'Salvar Alterações'}
            </Button>
          </div>
        </Card>

        {/* Danger Zone */}
        <Card style={{ 
          padding: '2.5rem',
          border: '1px solid rgba(255, 71, 87, 0.3)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '1.5rem'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'rgba(255, 71, 87, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Trash2 size={20} color="#ff4757" />
            </div>
            <h3 style={{
              color: '#ff4757',
              fontSize: '1.5rem',
              fontWeight: '700',
              margin: 0
            }}>
              Zona de Perigo
            </h3>
          </div>
          
          <p style={{
            color: '#ccc',
            marginBottom: '2rem',
            lineHeight: 1.6
          }}>
            Ao excluir sua conta, todos os seus dados serão permanentemente removidos.
            Esta ação não pode ser desfeita e você perderá acesso a todos os seus dados.
          </p>
          
          <Button
            variant="danger"
            onClick={handleDeleteAccount}
            disabled={loading}
            icon={Trash2}
          >
            {loading ? 'Excluindo...' : 'Excluir Minha Conta'}
          </Button>
        </Card>

        {/* Loading Overlay */}
        {loading && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            backdropFilter: 'blur(5px)'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              border: '4px solid rgba(255, 193, 7, 0.3)',
              borderTop: '4px solid #FFC107',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }} />
            <style>{`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;