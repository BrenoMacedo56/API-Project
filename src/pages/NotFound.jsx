import React, { useState, useEffect } from 'react';
import { Home, Search, ArrowLeft, Zap, TrendingUp } from 'lucide-react';

const NotFound = () => {
  const [glitchEffect, setGlitchEffect] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [particles, setParticles] = useState([]);
  const [ripples, setRipples] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchEffect(true);
      setTimeout(() => setGlitchEffect(false), 300);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

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

  useEffect(() => {
    // Generate floating particles
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      speed: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.3
    }));
    setParticles(newParticles);
  }, []);

  const handleCardClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newRipple = {
      id: Date.now(),
      x,
      y
    };
    
    setRipples(prev => [...prev, newRipple]);
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 800);
  };

  const Button = ({ children, onClick, variant = 'primary', icon: Icon }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    const baseStyles = {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.875rem 1.5rem',
      borderRadius: '0.75rem',
      fontSize: '1rem',
      fontWeight: '600',
      textDecoration: 'none',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative',
      overflow: 'hidden',
      transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
    };

    const variants = {
      primary: {
        background: isHovered 
          ? 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FF8F00 100%)'
          : 'linear-gradient(135deg, #FFC107 0%, #FF8F00 50%, #FF6B35 100%)',
        color: '#000',
        boxShadow: isHovered 
          ? '0 20px 40px rgba(255, 193, 7, 0.4), 0 0 30px rgba(255, 193, 7, 0.3)'
          : '0 10px 25px rgba(255, 193, 7, 0.3)',
      },
      secondary: {
        background: isHovered 
          ? 'rgba(255, 255, 255, 0.15)'
          : 'rgba(255, 255, 255, 0.1)',
        color: '#fff',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(10px)',
        boxShadow: isHovered 
          ? '0 15px 30px rgba(0, 0, 0, 0.3)'
          : '0 8px 20px rgba(0, 0, 0, 0.2)',
      }
    };

    return (
      <button
        style={{ ...baseStyles, ...variants[variant] }}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {Icon && <Icon size={18} />}
        {children}
      </button>
    );
  };

  const Card = ({ children, style, onClick }) => (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        ...style
      }}
      onClick={onClick}
    >
      {children}
      {ripples.map(ripple => (
        <div
          key={ripple.id}
          style={{
            position: 'absolute',
            left: ripple.x,
            top: ripple.y,
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            background: 'rgba(255, 193, 7, 0.6)',
            transform: 'translate(-50%, -50%)',
            animation: 'ripple 0.8s ease-out forwards'
          }}
        />
      ))}
    </div>
  );

  const styles = {
    container: {
      minHeight: '100vh',
      background: `
        radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%,
          rgba(212, 175, 55, 0.12) 0%,
          rgba(255, 107, 53, 0.08) 25%,
          rgba(10, 10, 10, 0.98) 60%),
        linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 40%, #000000 100%)
      `,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      fontFamily: "'Inter', sans-serif",
      position: 'relative',
      overflow: 'hidden'
    },
    title: {
      fontSize: 'clamp(100px, 18vw, 160px)',
      fontWeight: 900,
      background: glitchEffect
        ? 'linear-gradient(45deg, #FFD700, #FFA500, #FF6B35, #FFC107)'
        : 'linear-gradient(135deg, #FFD700 0%, #FFC107 30%, #FF8F00 70%, #FF6B35 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      textAlign: 'center',
      marginBottom: '1rem',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      transform: glitchEffect ? 'scale(1.08) skew(-1deg) rotateX(5deg)' : 'scale(1)',
      filter: glitchEffect ? 'blur(1px) hue-rotate(15deg)' : 'none',
      textShadow: glitchEffect 
        ? '3px 3px 0 #FFD700, -3px -3px 0 #FFA500, 0 0 50px rgba(255, 193, 7, 0.5)' 
        : '0 0 40px rgba(212, 175, 55, 0.4), 0 0 80px rgba(255, 193, 7, 0.2)',
      position: 'relative'
    },
    subtitle: {
      fontSize: '2rem',
      fontWeight: 700,
      background: 'linear-gradient(135deg, #fff 0%, #ccc 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      textAlign: 'center',
      marginBottom: '1.5rem',
      textShadow: '0 2px 10px rgba(255, 255, 255, 0.1)'
    },
    description: {
      fontSize: '1.1rem',
      color: '#bbb',
      textAlign: 'center',
      maxWidth: '520px',
      margin: '0 auto 3rem',
      lineHeight: 1.7,
      textShadow: '0 1px 3px rgba(0, 0, 0, 0.5)'
    },
    buttons: {
      display: 'flex',
      justifyContent: 'center',
      gap: '1rem',
      flexWrap: 'wrap',
      marginTop: '2rem'
    },
    glow: {
      position: 'absolute',
      borderRadius: '50%',
      filter: 'blur(80px)',
      animation: 'float 8s ease-in-out infinite',
      opacity: 0.6
    },
    glow1: {
      width: '400px',
      height: '400px',
      background: 'radial-gradient(circle, rgba(212, 175, 55, 0.3), rgba(255, 193, 7, 0.1), transparent)',
      top: '-200px',
      left: '-200px'
    },
    glow2: {
      width: '350px',
      height: '350px',
      background: 'radial-gradient(circle, rgba(255, 107, 53, 0.25), rgba(255, 140, 0, 0.1), transparent)',
      bottom: '-175px',
      right: '-175px',
      animationDelay: '4s'
    },
    glow3: {
      width: '300px',
      height: '300px',
      background: 'radial-gradient(circle, rgba(255, 193, 7, 0.2), transparent)',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      animationDelay: '2s'
    },
    particle: {
      position: 'absolute',
      borderRadius: '50%',
      background: 'rgba(255, 193, 7, 0.4)',
      pointerEvents: 'none',
      animation: 'particleFloat 10s linear infinite'
    }
  };

  return (
    <div style={styles.container}>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-15px) rotate(2deg); }
          66% { transform: translateY(-25px) rotate(-2deg); }
        }
        
        @keyframes particleFloat {
          0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
        }
        
        @keyframes ripple {
          0% { width: 4px; height: 4px; opacity: 1; }
          100% { width: 200px; height: 200px; opacity: 0; }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
      `}</style>

      {/* Animated glows */}
      <div style={{ ...styles.glow, ...styles.glow1 }} />
      <div style={{ ...styles.glow, ...styles.glow2 }} />
      <div style={{ ...styles.glow, ...styles.glow3 }} />

      {/* Floating particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          style={{
            ...styles.particle,
            left: `${particle.x}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            animationDelay: `${particle.id * 2}s`,
            animationDuration: `${8 + particle.speed * 2}s`
          }}
        />
      ))}

      <Card
        onClick={handleCardClick}
        style={{
          padding: '4rem 3rem',
          background: 'rgba(15, 15, 15, 0.92)',
          backdropFilter: 'blur(25px)',
          borderRadius: '2rem',
          border: '1px solid rgba(212, 175, 55, 0.25)',
          boxShadow: `
            0 40px 80px rgba(0,0,0,0.7),
            0 0 60px rgba(212,175,55,0.15),
            inset 0 1px 0 rgba(255,255,255,0.1)
          `,
          maxWidth: '600px',
          width: '100%',
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }}
      >
        <div style={styles.title}>
          404
          {glitchEffect && (
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(90deg, transparent, rgba(255,193,7,0.1), transparent)',
              animation: 'pulse 0.3s ease-in-out'
            }} />
          )}
        </div>
        
        <div style={styles.subtitle}>Página não encontrada</div>
        
        <p style={styles.description}>
          Ops! Parece que você se aventurou em território desconhecido. Esta página decidiu tirar umas férias ou talvez nunca tenha existido. Mas não se preocupe – grandes descobertas começam com caminhos inesperados!
        </p>

        <div style={styles.buttons}>
          <Button 
            variant="primary" 
            icon={Home}
            onClick={() => window.location.href = '/'}
          >
            Voltar ao Início
          </Button>
          
          <Button 
            variant="secondary" 
            icon={Search}
            onClick={() => window.location.href = '/search'}
          >
            Buscar
          </Button>
          
          <Button 
            variant="secondary" 
            icon={TrendingUp}
            onClick={() => window.location.href = '/dashboard'}
          >
            Dashboard
          </Button>
        </div>

        <div style={{
          marginTop: '3rem',
          padding: '1.5rem',
          background: 'rgba(255, 193, 7, 0.05)',
          borderRadius: '1rem',
          border: '1px solid rgba(255, 193, 7, 0.1)',
          textAlign: 'center'
        }}>
          <Zap style={{ color: '#FFC107', marginBottom: '0.5rem' }} size={24} />
          <p style={{ 
            color: '#FFC107', 
            fontSize: '0.9rem', 
            margin: 0,
            fontWeight: '500'
          }}>
            Dica: Use a navegação acima ou tente uma busca para encontrar o que procura!
          </p>
        </div>
      </Card>
    </div>
  );
};

export default NotFound;