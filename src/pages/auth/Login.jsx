import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ThemeContext } from '../../contexts/ThemeContext';

const Login = () => {
  const { currentTheme } = useContext(ThemeContext);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const user = await login(formData.email, formData.password);
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.errorMessage || 'Falha ao fazer login. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`);
  };

  // Ícones SVG inline
  const MailIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );

  const LockIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <circle cx="12" cy="16" r="1" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );

  const EyeIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );

  const EyeOffIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );

  const LoaderIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="animate-spin">
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );

  const DiamondIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 3h12l4 6-10 12L2 9l4-6z" />
    </svg>
  );

  return (
    <div className="login-page">
      {/* Background with geometric patterns */}
      <div className="background-effects">
        <div className="geometric-pattern"></div>
        <div className="golden-orb orb-1"></div>
        <div className="golden-orb orb-2"></div>
        <div className="golden-orb orb-3"></div>
        <div className="grid-overlay"></div>
      </div>

      {/* Left Section - Branding */}
      <div className="branding-section">
        <div className="branding-content">
          <div className="logo-container">
            <div className="logo-icon">
              <DiamondIcon />
            </div>
            <h1 className="brand-title">LuxeFinance</h1>
          </div>

          <div className="brand-tagline">
            <p className="brand-description">
              Onde elegância encontra inovação financeira. Seu patrimônio merece o melhor.
            </p>
          </div>

          <div className="features-showcase">
            <div className="feature-highlight">
              <div className="feature-number">01</div>
              <div className="feature-info">
                <h3>Gestão Premium</h3>
                <p>Portfolio management de alta performance</p>
              </div>
            </div>

            <div className="feature-highlight">
              <div className="feature-number">02</div>
              <div className="feature-info">
                <h3>Segurança Militar</h3>
                <p>Criptografia quantum e proteção 24/7</p>
              </div>
            </div>

            <div className="feature-highlight">
              <div className="feature-number">03</div>
              <div className="feature-info">
                <h3>IA Avançada</h3>
                <p>Insights preditivos e automação inteligente</p>
              </div>
            </div>
          </div>

          <div className="luxury-stats">
            <div className="stat-item">
              <div className="stat-value">$2.5B+</div>
              <div className="stat-label">Ativos sob Gestão</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-value">99.99%</div>
              <div className="stat-label">Confiança</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-value">5★</div>
              <div className="stat-label">Avaliação dos Clientes</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="form-section">
        <div className="login-container">
          <div className="login-header">
            <h2 className="login-title">Bem-vindo de volta</h2>
            <p className="login-subtitle">Acesse sua conta premium</p>
            <div className="header-accent"></div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="error-message" role="alert">
              <div className="error-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
              </div>
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="login-form">
            {/* Email Field */}
            <div className="input-group">
              <label htmlFor="email" className="input-label">
                Email Address
              </label>
              <div className={`input-container ${focusedField === 'email' ? 'focused' : ''} ${formData.email ? 'filled' : ''}`}>
                <div className="input-icon">
                  <MailIcon />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField('')}
                  className="form-input"
                  placeholder="seu@email.com"
                  required
                  autoComplete="email"
                />
                <div className="input-glow"></div>
              </div>
            </div>

            {/* Password Field */}
            <div className="input-group">
              <label htmlFor="password" className="input-label">
                Senha
              </label>
              <div className={`input-container ${focusedField === 'password' ? 'focused' : ''} ${formData.password ? 'filled' : ''}`}>
                <div className="input-icon">
                  <LockIcon />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField('')}
                  className="form-input"
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
                <div className="input-glow"></div>
              </div>
            </div>

            {/* Form Options */}
            <div className="form-options">
              <label className="checkbox-wrapper">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="checkbox-input"
                />
                <span className="checkbox-custom">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20,6 9,17 4,12" />
                  </svg>
                </span>
                <span className="checkbox-label">Lembrar-me</span>
              </label>
              <Link to="/forgot-password" className="forgot-link">
                Esqueci minha senha
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`submit-button ${loading ? 'loading' : ''}`}
              disabled={loading}
            >
              <span className="button-content">
                {loading ? (
                  <>
                    <LoaderIcon />
                    Entrando...
                  </>
                ) : (
                  <>
                    Entrar
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14m-7-7 7 7-7 7" />
                    </svg>
                  </>
                )}
              </span>
              <div className="button-glow"></div>
            </button>
          </form>

          {/* Divider */}
          <div className="divider">
            <div className="divider-line"></div>
            <span className="divider-text">ou</span>
            <div className="divider-line"></div>
          </div>

          {/* Social Login */}
          <div className="social-buttons">
            <button
              type="button"
              className="social-button google"
              onClick={() => handleSocialLogin('google')}
              disabled={loading}
            >
              <svg className="social-icon" viewBox="0 0 24 24" width="20" height="20">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google
            </button>

            <button
              type="button"
              className="social-button apple"
              onClick={() => handleSocialLogin('apple')}
              disabled={loading}
            >
              <svg className="social-icon" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              Apple
            </button>
          </div>

          {/* Register Link */}
          <div className="register-section">
            <p className="register-text">
              Novo por aqui?
              <Link to="/register" className="register-link">
                Criar conta premium
              </Link>
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .register-section,
        .divider{
          display: flex;
          justify-content: center; 
        }

        .social-buttons{
         display: flex;
          gap: 1rem; 
          justify-content: center; 
          flex-wrap: wrap; 
        }

        .login-page {
          display: flex;
          min-height: 100vh;
          width: 100vw;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', 'Roboto', sans-serif;
          position: relative;
          overflow: hidden;
          background: #0a0a0a;
        }

        .background-effects {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
        }

        .geometric-pattern {
          position: absolute;
          width: 100%;
          height: 100%;
          background-image: 
            linear-gradient(45deg, rgba(212, 175, 55, 0.03) 25%, transparent 25%), 
            linear-gradient(-45deg, rgba(212, 175, 55, 0.03) 25%, transparent 25%), 
            linear-gradient(45deg, transparent 75%, rgba(212, 175, 55, 0.03) 75%), 
            linear-gradient(-45deg, transparent 75%, rgba(212, 175, 55, 0.03) 75%);
          background-size: 40px 40px;
          background-position: 0 0, 0 20px, 20px -20px, -20px 0px;
          animation: patternMove 20s linear infinite;
        }

        .golden-orb {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(212, 175, 55, 0.4) 0%, rgba(255, 215, 0, 0.2) 40%, transparent 70%);
          filter: blur(60px);
          animation: float 8s ease-in-out infinite;
        }

        .orb-1 {
          width: 400px;
          height: 400px;
          top: -200px;
          left: -200px;
          animation-delay: 0s;
        }

        .orb-2 {
          width: 300px;
          height: 300px;
          top: 50%;
          right: -150px;
          animation-delay: 3s;
        }

        .orb-3 {
          width: 250px;
          height: 250px;
          bottom: -125px;
          left: 40%;
          animation-delay: 6s;
        }

        .grid-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: 
            linear-gradient(rgba(212, 175, 55, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212, 175, 55, 0.1) 1px, transparent 1px);
          background-size: 100px 100px;
          opacity: 0.3;
        }

        @keyframes patternMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(40px, 40px); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-30px) scale(1.1); }
        }

        .branding-section {
          flex: 1;
          background: linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #2a2a2a 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4rem;
          color: #ffffff;
          position: relative;
          z-index: 1;
          border-right: 1px solid rgba(212, 175, 55, 0.2);
        }

        .branding-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, 
            rgba(212, 175, 55, 0.05) 0%, 
            transparent 50%, 
            rgba(255, 215, 0, 0.03) 100%);
          z-index: -1;
        }

        .branding-content {
          position: relative;
          z-index: 1;
          text-align: center;
          max-width: 500px;
          animation: fadeInLeft 1s ease-out;
        }

        .logo-container {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        .logo-icon {
          width: 70px;
          height: 70px;
          background: linear-gradient(45deg, #d4af37, #ffd700);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #000;
          box-shadow: 0 8px 32px rgba(212, 175, 55, 0.3);
          position: relative;
          overflow: hidden;
        }

        .logo-icon::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: conic-gradient(from 0deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          animation: rotate 3s linear infinite;
        }

        .brand-title {
          font-size: 3rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          background: linear-gradient(135deg, #ffffff 0%, #d4af37 50%, #ffd700 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 0 0 30px rgba(212, 175, 55, 0.3);
        }

        .brand-tagline {
          margin-bottom: 4rem;
        }

        .brand-description {
          font-size: 1.3rem;
          line-height: 1.6;
          color: #cccccc;
          font-weight: 300;
          letter-spacing: 0.5px;
        }

        .features-showcase {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          margin-bottom: 4rem;
        }

        .feature-highlight {
          display: flex;
          align-items: center;
          gap: 2rem;
          padding: 2rem;
          background: rgba(212, 175, 55, 0.05);
          border: 1px solid rgba(212, 175, 55, 0.2);
          border-radius: 20px;
          backdrop-filter: blur(10px);
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;
        }

        .feature-highlight:hover {
          transform: translateX(10px);
          background: rgba(212, 175, 55, 0.1);
          border-color: rgba(212, 175, 55, 0.4);
        }

        .feature-highlight::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          width: 4px;
          height: 100%;
          background: linear-gradient(to bottom, #d4af37, #ffd700);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .feature-highlight:hover::before {
          opacity: 1;
        }

        .feature-number {
          font-size: 2rem;
          font-weight: 800;
          color: #d4af37;
          min-width: 60px;
          text-align: center;
        }

        .feature-info h3 {
          font-size: 1.2rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 0.5rem;
          letter-spacing: 0.5px;
        }

        .feature-info p {
          font-size: 1rem;
          color: #aaaaaa;
          line-height: 1.4;
        }

        .luxury-stats {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 2rem;
          padding: 2rem 0;
          border-top: 1px solid rgba(212, 175, 55, 0.2);
        }

        .stat-item {
          text-align: center;
          flex: 1;
        }

        .stat-value {
          display: block;
          font-size: 1.8rem;
          font-weight: 800;
          color: #d4af37;
          margin-bottom: 0.5rem;
          text-shadow: 0 0 20px rgba(212, 175, 55, 0.3);
        }

        .stat-label {
          font-size: 0.9rem;
          color: #999999;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .stat-divider {
          width: 1px;
          height: 40px;
          background: linear-gradient(to bottom, transparent, rgba(212, 175, 55, 0.3), transparent);
        }

        .form-section {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 3rem;
          background: #000000;
          position: relative;
          z-index: 1;
        }

        .login-container {
          width: 100%;
          max-width: 480px;
          padding: 3rem;
          background: linear-gradient(45deg, rgba(255, 215, 0, 0.3), transparent, rgba(255, 215, 0, 0.3));
          border-radius: 34px;
          z-index: -1;
          border: 1px solid rgba(212, 175, 55, 0.2);
          border-radius: 32px;
          backdrop-filter: blur(20px);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
          animation: fadeInRight 1s ease-out 0.2s both;
          position: relative;
          overflow: hidden;
        }

        .login-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #d4af37, #ffd700, transparent);
          opacity: 0.6;
        }

        .login-header {
          text-align: center;
          margin-bottom: 3rem;
          position: relative;
        }

        .login-title {
          font-size: 2.5rem;
          font-weight: 800;
          color: #ffffff;
          margin: 0 0 1rem 0;
          line-height: 1.2;
          letter-spacing: -0.02em;
        }

        .login-subtitle {
          color: #aaaaaa;
          margin: 0 0 2rem 0;
          font-size: 1.1rem;
          font-weight: 400;
          letter-spacing: 0.5px;
        }

        .header-accent {
          width: 60px;
          height: 3px;
          background: linear-gradient(90deg, #d4af37, #ffd700);
          margin: 0 auto;
          border-radius: 2px;
        }

        .error-message {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #ef4444;
          padding: 1.25rem 1.5rem;
          border-radius: 20px;
          margin-bottom: 2rem;
          font-size: 0.95rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          font-weight: 500;
          animation: shake 0.5s ease-in-out;
        }

        .error-icon {
          flex-shrink: 0;
        }

        .login-form {
          margin-bottom: 2.5rem;
        }

        .input-group {
          margin-bottom: 2rem;
        }

        .input-label {
          display: block;
          margin-bottom: 1rem;
          font-weight: 600;
          color: #ffffff;
          font-size: 1rem;
          letter-spacing: 0.5px;
        }

        .input-container {
          position: relative;
          display: flex;
          align-items: center;
          transition: all 0.4s ease;
        }

        .input-icon {
          position: absolute;
          left: 1.5rem;
          color: #666666;
          z-index: 2;
          transition: all 0.4s ease;
        }

        .input-container.focused .input-icon,
        .input-container.filled .input-icon {
          color: #d4af37;
          transform: scale(1.1);
        }

        .form-input {
          width: 100%;
          padding: 1.25rem 1.5rem 1.25rem 4rem;
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          font-size: 1rem;
          background: rgba(0, 0, 0, 0.5);
          color: #ffffff;
          transition: all 0.4s ease;

      }

      .password-toggle {
        position: absolute;
        right: 1.5rem;
        background: none;
        border: none;
        color: #aaa;
        cursor: pointer;
        z-index: 2;
        transition: color 0.3s;
      }

      .password-toggle:hover {
        color: #d4af37;
      }
        .submit-button {
        width: 100%;
        padding: 1rem;
        background: linear-gradient(to right, #d4af37, #ffd700);
        border: none;
        border-radius: 20px;
        color: #000;
        font-weight: bold;
        font-size: 1rem;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;
        transition: background 0.3s ease;
      }

      .submit-button.loading {
        opacity: 0.7;
        cursor: not-allowed;
      }

      .submit-button:hover:not(.loading) {
        background: linear-gradient(to right, #ffd700, #d4af37);
      }
        .checkbox-wrapper {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
        color: #ccc;
        font-size: 0.95rem;
      }

      .checkbox-input {
        appearance: none;
        width: 1rem;
        height: 1rem;
        border: 2px solid #d4af37;
        border-radius: 4px;
        position: relative;
        cursor: pointer;
      }

      .checkbox-input:checked + .checkbox-custom svg {
        stroke: #d4af37;
      }

      .input-container:focus-within {
        border-color: #d4af37;
        box-shadow: 0 0 8px rgba(212, 175, 55, 0.5);
      }

      .input-container .form-input:focus {
        border-color: #ffd700;
        box-shadow: 0 0 10px rgba(255, 215, 0, 0.3);
      }
      .form-input,
      .input-container,
      .input-icon,
      .submit-button,
      .password-toggle,
      .checkbox-wrapper,
      .social-button {
        transition: all 0.3s ease;
      }

      .submit-button {
        position: relative;
        overflow: hidden;
      }

      .submit-button::before {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: radial-gradient(circle, rgba(255, 215, 0, 0.2), transparent 70%);
        animation: pulse-glow 3s ease-in-out infinite;
        z-index: 0;
      }

      @keyframes pulse-glow {
        0%, 100% {
          transform: scale(1);
          opacity: 0.6;
        }
        50% {
          transform: scale(1.2);
          opacity: 1;
        }
      }
        .input-container:hover .input-icon {
        color: #ffd700;
        transform: scale(1.15);
      }

      @keyframes shake {
        0% { transform: translateX(0); }
        25% { transform: translateX(-6px); }
        50% { transform: translateX(6px); }
        75% { transform: translateX(-4px); }
        100% { transform: translateX(0); }
      }
      `}</style>
    </div>
  );
};

export default Login;