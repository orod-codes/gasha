import { useState } from 'react';
import { User } from './types';
import Header from './components/layout/Header';
import Hero from './components/layout/Hero';
import ProductsGrid from './components/products/ProductsGrid';
import ContactSection from './components/contact/ContactSection';
import Footer from './components/layout/Footer';
import LoginModal from './components/auth/LoginModal';
import SuperAdminDashboard from './components/dashboard';
import AdminDashboard from './components/dashboard/AdminDashboard';
import MarketingDashboard from './components/dashboard/MarketingDashboard';
import TechnicalDashboard from './components/dashboard/TechnicalDashboard';
import DeveloperDashboard from './components/dashboard/DeveloperDashboard';
import { ChatbotProvider } from './components/chatbot/ChatbotProvider';
import Chatbot from './components/chatbot/Chatbot';
import ChapaDebugPanel from './components/debug/ChapaDebugPanel';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState('landing');

  const handleLogin = (userData: User) => {
    setUser(userData);
    setIsLoginModalOpen(false);
    // Redirect to appropriate dashboard based on user role
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('landing');
  };

  const renderDashboard = () => {
    if (!user) return null;

    switch (user.role) {
      case 'super-admin':
        return <SuperAdminDashboard />;
      case 'admin':
        return <AdminDashboard user={user} />;
      case 'marketing':
        return <MarketingDashboard user={user} />;
      case 'technical':
        return <TechnicalDashboard user={user} />;
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
          onLogin={() => {
            if (user) {
              setCurrentView(currentView === 'landing' ? 'dashboard' : 'landing');
            } else {
              setIsLoginModalOpen(true);
            }
          }}
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
        
        {/* Debug Panel - Only in development */}
        {process.env.NODE_ENV === 'development' && <ChapaDebugPanel />}
      </div>
    </ChatbotProvider>
  );
}

export default App;