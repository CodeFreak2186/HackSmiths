import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

// Mock Link component since we don't have react-router-dom
const Link = ({ to, className, children }) => (
  <a href={to} className={className} onClick={(e) => e.preventDefault()}>
    {children}
  </a>
);

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsLoaded(true);

    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="home-container">
      {/* Animated Background Elements */}
      <div className="bg-elements">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
          <div className="shape shape-5"></div>
        </div>
        <div
          className="parallax-layer"
          style={{
            transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`
          }}
        ></div>
      </div>

      {/* Navigation Header */}
      <nav className="nav-header">
        <div className="nav-brand">
          <div className="brand-icon">🌍</div>
          <span>FRA Atlas</span>
        </div>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      {/* Main Hero Section */}
      <main className="hero-section">
        <div className={`hero-content ${isLoaded ? 'loaded' : ''}`}>
          {/* Badge/Tag */}
          <div className="hero-badge">
            <span className="badge-text">🌲 Advanced Forest Intelligence</span>
          </div>

          {/* Main Heading with Gradient Text */}
          <h1 className="hero-title">
            <span className="title-line-1">Smart FRA</span>
            <span className="title-line-2 gradient-text">Atlas</span>
          </h1>

          {/* Enhanced Subtitle */}
          <p className="hero-subtitle">
            Revolutionizing forest risk assessment with cutting-edge satellite imagery,
            <br />AI-powered threat detection, and comprehensive ecosystem monitoring
          </p>

          {/* Feature Pills */}
          <div className="feature-pills">
            <div className="pill">🌍 Satellite Monitoring</div>
            <div className="pill">🔥 Fire Risk Analysis</div>
            <div className="pill">📈 Deforestation Tracking</div>
          </div>

          {/* Call-to-Action Buttons */}
          <div className="cta-buttons">
            <button
              className="btn btn-primary"
              onClick={() => window.location.href = '/register'}
            >
              <span>Get Started</span>
              <div className="btn-arrow">→</div>
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => window.location.href = '/login'}
            >
              <span>Sign In</span>
            </button>
          </div>

          {/* Stats Section */}
          <div className="stats-section">
            <div className="stat-item">
              <div className="stat-number">250K+</div>
              <div className="stat-label">Forest Areas Mapped</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-number">95%</div>
              <div className="stat-label">Prediction Accuracy</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Monitoring</div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="hero-decoration">
          <div className="deco-grid"></div>
        </div>
      </main>

      {/* Scroll Indicator */}
      <div className="scroll-indicator">
        <div className="scroll-arrow"></div>
        <span>Explore Features</span>
      </div>

      {/* Styles */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .home-container {
          min-height: 100vh;
          width: 100%;
          position: relative;
          font-family: 'Inter', sans-serif;
          overflow-x: hidden;
          background: 
            linear-gradient(135deg, 
              rgba(5, 25, 15, 0.85) 0%, 
              rgba(15, 40, 25, 0.8) 25%, 
              rgba(25, 55, 35, 0.75) 50%, 
              rgba(35, 70, 45, 0.7) 75%, 
              rgba(45, 85, 55, 0.65) 100%),
            url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80') center/cover no-repeat;
          background-attachment: fixed;
        }

        /* Background Elements */
        .bg-elements {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
        }

        .floating-shapes {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .shape {
          position: absolute;
          border-radius: 50%;
          background: linear-gradient(45deg, rgba(76, 175, 80, 0.1), rgba(139, 195, 74, 0.05));
          backdrop-filter: blur(2px);
          border: 1px solid rgba(76, 175, 80, 0.1);
        }

        .shape-1 {
          width: 300px;
          height: 300px;
          top: 10%;
          left: 80%;
          animation: float1 20s ease-in-out infinite;
        }

        .shape-2 {
          width: 150px;
          height: 150px;
          top: 60%;
          left: 10%;
          animation: float2 25s ease-in-out infinite;
        }

        .shape-3 {
          width: 100px;
          height: 100px;
          top: 20%;
          left: 20%;
          animation: float3 30s ease-in-out infinite;
        }

        .shape-4 {
          width: 200px;
          height: 200px;
          top: 70%;
          right: 20%;
          animation: float1 35s ease-in-out infinite reverse;
        }

        .shape-5 {
          width: 80px;
          height: 80px;
          top: 40%;
          right: 40%;
          animation: float2 40s ease-in-out infinite;
        }

        @keyframes float1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-30px) rotate(120deg); }
          66% { transform: translateY(20px) rotate(240deg); }
        }

        @keyframes float2 {
          0%, 100% { transform: translateX(0px) rotate(0deg); }
          50% { transform: translateX(50px) rotate(180deg); }
        }

        @keyframes float3 {
          0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
          25% { transform: translate(30px, -30px) rotate(90deg); }
          50% { transform: translate(-20px, 20px) rotate(180deg); }
          75% { transform: translate(-30px, -10px) rotate(270deg); }
        }

        /* Navigation */
        .nav-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 40px;
          backdrop-filter: blur(20px);
          background: rgba(5, 25, 15, 0.9);
          border-bottom: 1px solid rgba(76, 175, 80, 0.2);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }

        .nav-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          font-weight: 700;
          font-size: 1.2rem;
          color: white;
        }

        .brand-icon {
          font-size: 1.5rem;
          background: linear-gradient(45deg, #4CAF50, #8BC34A);
          border-radius: 8px;
          padding: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
        }

        .nav-links {
          display: flex;
          gap: 32px;
        }

        .nav-links a {
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          font-weight: 500;
          transition: all 0.3s ease;
          position: relative;
        }

        .nav-links a:hover {
          color: white;
        }

        .nav-links a::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #4CAF50, #8BC34A);
          transition: width 0.3s ease;
        }

        .nav-links a:hover::after {
          width: 100%;
        }

        /* Hero Section */
        .hero-section {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          padding: 120px 40px 60px;
          position: relative;
          z-index: 10;
        }

        .hero-content {
          text-align: center;
          max-width: 900px;
          opacity: 0;
          transform: translateY(60px);
          transition: all 1.2s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        .hero-content.loaded {
          opacity: 1;
          transform: translateY(0);
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          background: rgba(76, 175, 80, 0.15);
          border: 1px solid rgba(76, 175, 80, 0.4);
          border-radius: 50px;
          padding: 12px 24px;
          margin-bottom: 32px;
          backdrop-filter: blur(15px);
          animation: fadeInUp 1s ease-out 0.2s both;
          box-shadow: 0 4px 20px rgba(76, 175, 80, 0.2);
        }

        .badge-text {
          color: #81C784;
          font-weight: 600;
          font-size: 0.9rem;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .hero-title {
          font-size: clamp(3.5rem, 8vw, 7rem);
          font-weight: 900;
          line-height: 0.95;
          margin-bottom: 24px;
          color: white;
          animation: fadeInUp 1s ease-out 0.4s both;
          text-shadow: 2px 4px 8px rgba(0, 0, 0, 0.5);
        }

        .title-line-1 {
          display: block;
          opacity: 0.9;
        }

        .title-line-2 {
          display: block;
        }

        .gradient-text {
          background: linear-gradient(135deg, #4CAF50, #8BC34A, #CDDC39);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradientShift 3s ease-in-out infinite;
          filter: drop-shadow(2px 4px 8px rgba(0, 0, 0, 0.3));
        }

        @keyframes gradientShift {
          0%, 100% { filter: hue-rotate(0deg); }
          50% { filter: hue-rotate(20deg); }
        }

        .hero-subtitle {
          font-size: 1.3rem;
          color: rgba(255, 255, 255, 0.95);
          font-weight: 400;
          line-height: 1.6;
          margin-bottom: 40px;
          animation: fadeInUp 1s ease-out 0.6s both;
          text-shadow: 1px 2px 4px rgba(0, 0, 0, 0.4);
          background: rgba(0, 0, 0, 0.2);
          padding: 16px 24px;
          border-radius: 12px;
          backdrop-filter: blur(10px);
        }

        .feature-pills {
          display: flex;
          justify-content: center;
          gap: 16px;
          margin-bottom: 48px;
          flex-wrap: wrap;
          animation: fadeInUp 1s ease-out 0.8s both;
        }

        .pill {
          background: rgba(76, 175, 80, 0.15);
          border: 1px solid rgba(76, 175, 80, 0.3);
          border-radius: 25px;
          padding: 12px 20px;
          color: rgba(255, 255, 255, 0.95);
          font-size: 0.9rem;
          font-weight: 500;
          backdrop-filter: blur(15px);
          transition: all 0.3s ease;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
          box-shadow: 0 4px 15px rgba(76, 175, 80, 0.1);
        }

        .pill:hover {
          background: rgba(76, 175, 80, 0.25);
          border-color: rgba(76, 175, 80, 0.5);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(76, 175, 80, 0.2);
        }

        .cta-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
          margin-bottom: 60px;
          animation: fadeInUp 1s ease-out 1s both;
          flex-wrap: wrap;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 16px 32px;
          border-radius: 50px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
          position: relative;
          overflow: hidden;
          font-size: 1.1rem;
          min-width: 160px;
          justify-content: center;
        }

        .btn-primary {
          background: linear-gradient(135deg, #4CAF50, #66BB6A);
          color: white;
          border: none;
          box-shadow: 0 8px 25px rgba(76, 175, 80, 0.4);
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
        }

        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 35px rgba(76, 175, 80, 0.5);
          background: linear-gradient(135deg, #66BB6A, #81C784);
        }

        .btn-secondary {
          background: rgba(255, 255, 255, 0.1);
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.4);
          backdrop-filter: blur(15px);
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.2);
          border-color: rgba(255, 255, 255, 0.6);
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(255, 255, 255, 0.1);
        }

        .btn-arrow {
          font-size: 1.2rem;
          transition: transform 0.3s ease;
        }

        .btn-primary:hover .btn-arrow {
          transform: translateX(4px);
        }

        .stats-section {
          display: flex;
          align-items: center;
          gap: 40px;
          animation: fadeInUp 1s ease-out 1.2s both;
          flex-wrap: wrap;
          justify-content: center;
        }

        .stat-item {
          text-align: center;
        }

        .stat-number {
          font-size: 2.2rem;
          font-weight: 800;
          color: #81C784;
          line-height: 1;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
        }

        .stat-label {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.9);
          margin-top: 4px;
          font-weight: 500;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
        }

        .stat-divider {
          width: 1px;
          height: 40px;
          background: rgba(255, 255, 255, 0.2);
        }

        .scroll-indicator {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.8rem;
          animation: bounce 2s infinite;
        }

        .scroll-arrow {
          width: 20px;
          height: 20px;
          border-right: 2px solid rgba(255, 255, 255, 0.6);
          border-bottom: 2px solid rgba(255, 255, 255, 0.6);
          transform: rotate(45deg);
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateX(-50%) translateY(0); }
          40% { transform: translateX(-50%) translateY(-10px); }
          60% { transform: translateX(-50%) translateY(-5px); }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .nav-header {
            padding: 16px 20px;
          }
          
          .nav-links {
            display: none;
          }
          
          .hero-section {
            padding: 100px 20px 40px;
          }
          
          .hero-title {
            font-size: clamp(2.5rem, 12vw, 4rem);
          }
          
          .hero-subtitle {
            font-size: 1.1rem;
          }
          
          .cta-buttons {
            flex-direction: column;
            align-items: center;
          }
          
          .btn {
            width: 100%;
            max-width: 280px;
          }
          
          .stats-section {
            gap: 20px;
          }
          
          .stat-divider {
            display: none;
          }
          
          .feature-pills {
            flex-direction: column;
            align-items: center;
          }
          
          .pill {
            width: fit-content;
          }
        }

        @media (max-width: 480px) {
          .hero-badge {
            padding: 10px 20px;
            font-size: 0.8rem;
          }
          
          .stats-section {
            flex-direction: column;
            gap: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
