import { useState, useEffect, useMemo } from 'react';
import { User } from './types';
import Header from './components/layout/Header';
import Hero from './components/layout/Hero';
import ProductsGrid from './components/products/ProductsGrid';
import ContactSection from './components/contact/ContactSection';
import Footer from './components/layout/Footer';
import LoginModal from './components/auth/LoginModal';
import { SuperAdminDashboard, CombinedAdminTechnicalDashboard } from './components/dashboard';
import MarketingDashboard from './components/dashboard/MarketingDashboard';
import DeveloperDashboard from './components/dashboard/DeveloperDashboard';
import { ChatbotProvider } from './components/chatbot/ChatbotProvider';
import Chatbot from './components/chatbot/Chatbot';

function App() {
  // Initialize user state from localStorage if available
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? 'dashboard' : 'landing';
  });

  // Two-port setup: 5173 for landing, 5174 for login modal
  const loginPorts = useMemo(() => new Set(['5174']), []);
  const landingPorts = useMemo(() => new Set(['5173', '4173']), []);
  const isProd = import.meta.env.PROD;

  // If on a login-designated port, prompt login modal only when no user is logged in
  useEffect(() => {
    if (isProd) {
      // Production: path-based behavior
      const path = window.location.pathname || '/';
      const onLoginPath = path.startsWith('/5174');
      if (onLoginPath && !user && !isLoginModalOpen) {
        setIsLoginModalOpen(true);
      }
      return;
    }
    // Development: port-based behavior
    const port = window.location.port || '';
    const isLoginPort = loginPorts.has(port);
    if (isLoginPort && !user && !isLoginModalOpen) {
      setIsLoginModalOpen(true);
    }
  }, [loginPorts, isLoginModalOpen, user, isProd]);

  // If on a landing-designated port, always show landing even if a user exists
  useEffect(() => {
    if (isProd) {
      const path = window.location.pathname || '/';
      const onLandingPath = path === '/' || path === '';
      if (onLandingPath && currentView !== 'landing') {
        setCurrentView('landing');
        if (isLoginModalOpen) setIsLoginModalOpen(false);
      }
      return;
    }
    const port = window.location.port || '';
    const isLandingPort = landingPorts.has(port);
    if (isLandingPort && currentView !== 'landing') {
      setCurrentView('landing');
      if (isLoginModalOpen) setIsLoginModalOpen(false);
    }
  }, [landingPorts, currentView, isLoginModalOpen, isProd]);

  // Effect to handle authentication state changes
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser && !user) {
      // If there's a saved user but no current user state, restore it
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setCurrentView('dashboard');
      } catch (error) {
        // If parsing fails, clear the corrupted data
        localStorage.removeItem('user');
      }
    }
  }, [user]);

  const handleLogin = (userData: User) => {
    // Role is determined by login modal logic (email), not by port
    const finalUser: User = userData;
    setUser(finalUser);
    // Save user data to localStorage for persistence
    localStorage.setItem('user', JSON.stringify(finalUser));
    setIsLoginModalOpen(false);
    // Redirect to appropriate dashboard based on user role
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    // Remove user data from localStorage
    localStorage.removeItem('user');
    setCurrentView('landing');
  };

  const renderDashboard = () => {
    if (!user) return null;

    switch (user.role) {
      case 'super-admin':
        return <SuperAdminDashboard />;
      case 'admin':
        return <CombinedAdminTechnicalDashboard user={user} />;
      case 'marketing':
        return <MarketingDashboard user={user} />;
      case 'technical':
        return <CombinedAdminTechnicalDashboard user={user} />;
      case 'developer':
        return <DeveloperDashboard user={user} />;
      default:
        return <SuperAdminDashboard />;
    }
  };

  const renderLandingPage = () => (
    <>
      <Hero />
      <ProductsGrid />
      <ContactSection />
      <Footer />
    </>
  );

  return (
    <ChatbotProvider>
      <div className="min-h-screen bg-slate-950">
        {/* Ultra-Modern Global Background */}
        <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900"></div>
        
        {/* Modern Grid Pattern */}
        <div className="fixed inset-0 opacity-20 pointer-events-none">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M0 0h80v1H0zm0 8h80v1H0zm0 8h80v1H0zm0 8h80v1H0zm0 8h80v1H0zm0 8h80v1H0zm0 8h80v1H0zm0 8h80v1H0zm0 8h80v1H0zm0 8h80v1H0zM0 0v80h1V0zm8 0v80h1V0zm8 0v80h1V0zm8 0v80h1V0zm8 0v80h1V0zm8 0v80h1V0zm8 0v80h1V0zm8 0v80h1V0zm8 0v80h1V0zm8 0v80h1V0z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat'
          }}></div>
        </div>
        
        {/* Subtle Blue Accent */}
        <div className="fixed inset-0 opacity-10 pointer-events-none">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233b82f6' fill-opacity='0.05'%3E%3Cpath d='M0 0h40v1H0zm0 4h40v1H0zm0 4h40v1H0zm0 4h40v1H0zm0 4h40v1H0zm0 4h40v1H0zm0 4h40v1H0zm0 4h40v1H0zm0 4h40v1H0zm0 4h40v1H0zM0 0v40h1V0zm4 0v40h1V0zm4 0v40h1V0zm4 0v40h1V0zm4 0v40h1V0zm4 0v40h1V0zm4 0v40h1V0zm4 0v40h1V0zm4 0v40h1V0zm4 0v40h1V0z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat'
          }}></div>
        </div>
        
        <Header 
          user={user}
          onLogout={handleLogout}
        />
        
        <div className="pt-20 relative z-10">
          {currentView === 'landing' ? renderLandingPage() : renderDashboard()}
        </div>
        
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
          onLogin={handleLogin}
        />
        
        {/* Chatbot */}
        <Chatbot user={user} />
      </div>
    </ChatbotProvider>
  );
}

export default App;