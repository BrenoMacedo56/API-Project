import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ThemeContext } from '../../contexts/ThemeContext';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
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
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 6) {
      newErrors.password = 'A senha deve ter pelo menos 6 caracteres';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem';
    }

    if (!agreedToTerms) {
      newErrors.terms = 'Você deve concordar com os termos';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      const { confirmPassword, ...userData } = formData;
      // await authService.register(userData);
      await login(formData.email, formData.password);
      navigate('/');
    } catch (error) {
      setErrors({
        submit: error.response?.data?.errorMessage || 'Erro ao registrar. Tente novamente.'
      });
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrength = (password) => {
    if (password.length < 6) return 0;
    if (password.length < 8) return 1;
    if (password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)) return 3;
    return 2;
  };

  const passwordStrength = getPasswordStrength(formData.password);

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 25%, #2d2d2d 50%, #1a1a1a 75%, #0a0a0a 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    width: '100%',
    position: 'relative',
    overflow: 'hidden'
  };

  const backgroundPattern = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(circle at 20% 80%, rgba(255, 215, 0, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(255, 215, 0, 0.08) 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, rgba(255, 215, 0, 0.05) 0%, transparent 50%)
    `,
    pointerEvents: 'none'
  };

  const cardStyle = {
    background: 'linear-gradient(145deg, rgba(20, 20, 20, 0.95) 0%, rgba(30, 30, 30, 0.98) 100%)',
    backdropFilter: 'blur(20px)',
    borderRadius: '32px',
    padding: '3.5rem',
    maxWidth: '520px',
    width: '100%',
    boxShadow: `
      0 25px 50px rgba(0, 0, 0, 0.5),
      0 0 0 1px rgba(255, 215, 0, 0.1),
      inset 0 1px 0 rgba(255, 215, 0, 0.1)
    `,
    border: '1px solid rgba(255, 215, 0, 0.2)',
    position: 'relative',
    overflow: 'hidden',
    zIndex: 1
  };

  const cardGlow = {
    position: 'absolute',
    top: '-2px',
    left: '-2px',
    right: '-2px',
    bottom: '-2px',
    background: 'linear-gradient(45deg, rgba(255, 215, 0, 0.3), transparent, rgba(255, 215, 0, 0.3))',
    borderRadius: '34px',
    zIndex: -1,
    opacity: 0.5
  };

  const titleStyle = {
    fontSize: '3rem',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FFD700 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    textAlign: 'center',
    marginBottom: '0.5rem',
    letterSpacing: '-0.02em',
    textShadow: '0 0 30px rgba(255, 215, 0, 0.3)'
  };

  const subtitleStyle = {
    color: '#a0a0a0',
    textAlign: 'center',
    marginBottom: '3rem',
    fontSize: '1.2rem',
    fontWeight: '400',
    letterSpacing: '0.5px'
  };

  const formRowStyle = {
    display: 'flex',
    gap: '1.25rem',
    marginBottom: '1.75rem'
  };

  const inputGroupStyle = {
    marginBottom: '1.75rem',
    flex: 1
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '0.75rem',
    fontWeight: '600',
    color: '#FFD700',
    fontSize: '0.95rem',
    letterSpacing: '0.5px',
    textTransform: 'uppercase'
  };

  const inputStyle = {
    width: '100%',
    padding: '1.25rem',
    border: '2px solid rgba(255, 215, 0, 0.3)',
    borderRadius: '20px',
    fontSize: '1rem',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    color: '#ffffff',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    outline: 'none',
    fontWeight: '500',
    boxSizing: 'border-box',
    backdropFilter: 'blur(10px)'
  };

  const inputFocusStyle = {
    borderColor: '#FFD700',
    boxShadow: '0 0 0 4px rgba(255, 215, 0, 0.15), 0 0 20px rgba(255, 215, 0, 0.3)',
    transform: 'translateY(-2px)',
    backgroundColor: 'rgba(0, 0, 0, 0.6)'
  };

  const passwordContainerStyle = {
    position: 'relative'
  };

  const passwordToggleStyle = {
    position: 'absolute',
    right: '1.25rem',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#FFD700',
    fontSize: '1.25rem',
    padding: '0.5rem',
    borderRadius: '12px',
    transition: 'all 0.3s ease',
    opacity: 0.7
  };

  const strengthIndicatorStyle = {
    marginTop: '1rem',
    display: 'flex',
    gap: '0.75rem',
    alignItems: 'center'
  };

  const strengthBarStyle = (strength, index) => ({
    flex: 1,
    height: '6px',
    borderRadius: '3px',
    backgroundColor: strength > index
      ? (strength === 1 ? '#ff4444' :
        strength === 2 ? '#ff8800' :
          '#00ff88')
      : 'rgba(255, 215, 0, 0.2)',
    transition: 'all 0.4s ease',
    boxShadow: strength > index ? '0 0 12px rgba(255, 215, 0, 0.4)' : 'none'
  });

  const strengthTextStyle = {
    fontSize: '0.85rem',
    fontWeight: '700',
    color: passwordStrength === 0 ? '#ff4444' :
      passwordStrength === 1 ? '#ff8800' :
        passwordStrength === 2 ? '#ff8800' :
          '#00ff88',
    minWidth: '90px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  };

  const checkboxContainerStyle = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '1rem',
    marginBottom: '2.5rem',
    padding: '1.5rem',
    background: 'rgba(255, 215, 0, 0.05)',
    borderRadius: '20px',
    border: agreedToTerms ? '2px solid rgba(255, 215, 0, 0.4)' : '2px solid rgba(255, 215, 0, 0.2)',
    backdropFilter: 'blur(10px)',
    transition: 'all 0.3s ease'
  };

  const checkboxStyle = {
    width: '24px',
    height: '24px',
    accentColor: '#FFD700',
    marginTop: '2px',
    cursor: 'pointer'
  };

  const checkboxLabelStyle = {
    fontSize: '0.95rem',
    color: '#d0d0d0',
    lineHeight: '1.6',
    fontWeight: '500'
  };

  const linkStyle = {
    color: '#FFD700',
    textDecoration: 'none',
    fontWeight: '700',
    transition: 'all 0.3s ease',
    textShadow: '0 0 10px rgba(255, 215, 0, 0.3)'
  };

  const buttonStyle = {
    width: '100%',
    padding: '1.5rem 2rem',
    background: loading 
      ? 'rgba(100, 100, 100, 0.5)' 
      : 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FFD700 100%)',
    color: loading ? '#666' : '#000000',
    border: 'none',
    borderRadius: '20px',
    fontSize: '1.2rem',
    fontWeight: '800',
    cursor: loading ? 'not-allowed' : 'pointer',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    marginBottom: '2rem',
    boxShadow: loading 
      ? 'none' 
      : '0 15px 35px rgba(255, 215, 0, 0.4), 0 5px 15px rgba(0, 0, 0, 0.3)',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    position: 'relative',
    overflow: 'hidden'
  };

  const buttonHoverStyle = {
    transform: 'translateY(-3px)',
    boxShadow: '0 20px 45px rgba(255, 215, 0, 0.6), 0 8px 20px rgba(0, 0, 0, 0.4)',
    background: 'linear-gradient(135deg, #fff700 0%, #ffb500 50%, #fff700 100%)'
  };

  const errorStyle = {
    color: '#ff6b6b',
    fontSize: '0.85rem',
    marginTop: '0.75rem',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem',
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
    borderRadius: '12px',
    border: '1px solid rgba(255, 107, 107, 0.2)'
  };

  const submitErrorStyle = {
    color: '#ff6b6b',
    fontSize: '1rem',
    marginBottom: '2rem',
    padding: '1.5rem',
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
    border: '2px solid rgba(255, 107, 107, 0.3)',
    borderRadius: '20px',
    fontWeight: '600',
    textAlign: 'center',
    backdropFilter: 'blur(10px)'
  };

  const footerStyle = {
    textAlign: 'center',
    marginTop: '1.5rem'
  };

  const footerTextStyle = {
    color: '#a0a0a0',
    fontSize: '1rem',
    fontWeight: '500'
  };

  return (
    <div style={containerStyle}>
      <div style={backgroundPattern}></div>
      
      <div style={cardStyle}>
        <div style={cardGlow}></div>
        
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={titleStyle}>Criar Conta</h1>
          <p style={subtitleStyle}>Junte-se à elite e comece sua jornada</p>

          {errors.submit && (
            <div style={submitErrorStyle}>
              ⚠️ {errors.submit}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={formRowStyle}>
              <div style={inputGroupStyle}>
                <label style={labelStyle} htmlFor="firstName">
                  Nome
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  style={inputStyle}
                  placeholder="João"
                  required
                  onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255, 215, 0, 0.3)';
                    e.target.style.boxShadow = 'none';
                    e.target.style.transform = 'none';
                    e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
                  }}
                />
                {errors.firstName && (
                  <div style={errorStyle}>
                    ⚠️ {errors.firstName}
                  </div>
                )}
              </div>

              <div style={inputGroupStyle}>
                <label style={labelStyle} htmlFor="lastName">
                  Sobrenome
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  style={inputStyle}
                  placeholder="Silva"
                  required
                  onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255, 215, 0, 0.3)';
                    e.target.style.boxShadow = 'none';
                    e.target.style.transform = 'none';
                    e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
                  }}
                />
                {errors.lastName && (
                  <div style={errorStyle}>
                    ⚠️ {errors.lastName}
                  </div>
                )}
              </div>
            </div>

            <div style={inputGroupStyle}>
              <label style={labelStyle} htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                style={inputStyle}
                placeholder="joao@exemplo.com"
                required
                onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255, 215, 0, 0.3)';
                  e.target.style.boxShadow = 'none';
                  e.target.style.transform = 'none';
                  e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
                }}
              />
              {errors.email && (
                <div style={errorStyle}>
                  ⚠️ {errors.email}
                </div>
              )}
            </div>

            <div style={inputGroupStyle}>
              <label style={labelStyle} htmlFor="password">
                Senha
              </label>
              <div style={passwordContainerStyle}>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  style={inputStyle}
                  placeholder="••••••••"
                  required
                  onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255, 215, 0, 0.3)';
                    e.target.style.boxShadow = 'none';
                    e.target.style.transform = 'none';
                    e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
                  }}
                />
                <button
                  type="button"
                  style={passwordToggleStyle}
                  onClick={() => setShowPassword(!showPassword)}
                  onMouseEnter={(e) => {
                    e.target.style.opacity = '1';
                    e.target.style.transform = 'translateY(-50%) scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.opacity = '0.7';
                    e.target.style.transform = 'translateY(-50%) scale(1)';
                  }}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>

              {formData.password && (
                <div style={strengthIndicatorStyle}>
                  <div style={{ flex: 1, display: 'flex', gap: '0.5rem' }}>
                    {[0, 1, 2].map(index => (
                      <div key={index} style={strengthBarStyle(passwordStrength, index)} />
                    ))}
                  </div>
                  <div style={strengthTextStyle}>
                    {passwordStrength === 0 && 'Muito fraca'}
                    {passwordStrength === 1 && 'Fraca'}
                    {passwordStrength === 2 && 'Média'}
                    {passwordStrength === 3 && 'Forte'}
                  </div>
                </div>
              )}

              {errors.password && (
                <div style={errorStyle}>
                  ⚠️ {errors.password}
                </div>
              )}
            </div>

            <div style={inputGroupStyle}>
              <label style={labelStyle} htmlFor="confirmPassword">
                Confirmar Senha
              </label>
              <div style={passwordContainerStyle}>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  style={inputStyle}
                  placeholder="••••••••"
                  required
                  onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255, 215, 0, 0.3)';
                    e.target.style.boxShadow = 'none';
                    e.target.style.transform = 'none';
                    e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
                  }}
                />
                <button
                  type="button"
                  style={passwordToggleStyle}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  onMouseEnter={(e) => {
                    e.target.style.opacity = '1';
                    e.target.style.transform = 'translateY(-50%) scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.opacity = '0.7';
                    e.target.style.transform = 'translateY(-50%) scale(1)';
                  }}
                >
                  {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              {errors.confirmPassword && (
                <div style={errorStyle}>
                  ⚠️ {errors.confirmPassword}
                </div>
              )}
            </div>

            <div style={checkboxContainerStyle}>
              <input
                type="checkbox"
                style={checkboxStyle}
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                required
              />
              <label style={checkboxLabelStyle}>
                Eu concordo com os{' '}
                <Link 
                  to="/terms" 
                  style={linkStyle}
                  onMouseEnter={(e) => {
                    e.target.style.textDecoration = 'underline';
                    e.target.style.textShadow = '0 0 15px rgba(255, 215, 0, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.textDecoration = 'none';
                    e.target.style.textShadow = '0 0 10px rgba(255, 215, 0, 0.3)';
                  }}
                >
                  Termos de Uso
                </Link>
                {' '}e{' '}
                <Link 
                  to="/privacy" 
                  style={linkStyle}
                  onMouseEnter={(e) => {
                    e.target.style.textDecoration = 'underline';
                    e.target.style.textShadow = '0 0 15px rgba(255, 215, 0, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.textDecoration = 'none';
                    e.target.style.textShadow = '0 0 10px rgba(255, 215, 0, 0.3)';
                  }}
                >
                  Política de Privacidade
                </Link>
              </label>
            </div>

            {errors.terms && (
              <div style={errorStyle}>
                ⚠️ {errors.terms}
              </div>
            )}

            <button
              type="submit"
              style={buttonStyle}
              disabled={loading}
              onMouseEnter={(e) => {
                if (!loading) {
                  Object.assign(e.target.style, buttonHoverStyle);
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.target.style.transform = 'none';
                  e.target.style.boxShadow = '0 15px 35px rgba(255, 215, 0, 0.4), 0 5px 15px rgba(0, 0, 0, 0.3)';
                  e.target.style.background = 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FFD700 100%)';
                }
              }}
            >
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
                  <div style={{
                    width: '24px',
                    height: '24px',
                    border: '3px solid rgba(0,0,0,0.3)',
                    borderTop: '3px solid #000',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }}></div>
                  Criando conta...
                </span>
              ) : (
                'Criar Conta'
              )}
            </button>

            <div style={footerStyle}>
              <span style={footerTextStyle}>
                Já tem uma conta?{' '}
              </span>
              <Link
                to="/login"
                style={linkStyle}
                onMouseEnter={(e) => {
                  e.target.style.textDecoration = 'underline';
                  e.target.style.textShadow = '0 0 15px rgba(255, 215, 0, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.textDecoration = 'none';
                  e.target.style.textShadow = '0 0 10px rgba(255, 215, 0, 0.3)';
                }}
              >
                Faça login
              </Link>
            </div>
          </form>
        </div>
      </div>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
          
          /* Scrollbar customization */
          ::-webkit-scrollbar {
            width: 8px;
          }
          
          ::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.2);
            border-radius: 4px;
          }
          
          ::-webkit-scrollbar-thumb {
            background: rgba(255, 215, 0, 0.5);
            border-radius: 4px;
          }
          
          ::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 215, 0, 0.7);
          }
        `}
      </style>
    </div>
  );
};

export default Register;