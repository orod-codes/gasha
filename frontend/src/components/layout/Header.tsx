import React, { useState, useEffect } from 'react';
import { Menu, X, User, LogOut, ChevronDown, Bell } from 'lucide-react';
import Button from '../ui/Button';
import { User as UserType } from '../../types';

interface HeaderProps {
  user?: UserType | null;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(null);

  // Function to handle logo download
  const handleLogoDownload = () => {
    const link = document.createElement('a');
    link.href = '/mian logo.png';
    link.download = 'Security-Service-Logo.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    // no-op placeholder for future header effects
  }, []);

  const handleMouseEnter = () => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
    setIsProductsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setIsProductsDropdownOpen(false);
    }, 150); // 150ms delay before closing
    setDropdownTimeout(timeout);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center space-x-4 group">
            <img src="/mian logo.png" alt="Security Service Logo" className="h-20 w-20 object-contain" />
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Security Service
              </h1>
              <p className="text-xs text-slate-400 font-medium tracking-wider uppercase">
                Security Solutions
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {!user && (
              <>
                {/* Products Dropdown */}
                <div className="relative group">
                  <button 
                    className="text-slate-300 hover:text-white transition-all duration-200 font-medium flex items-center space-x-1"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <span>Products</span>
                    <ChevronDown size={16} className={`transition-transform duration-200 ${isProductsDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {/* Dropdown Menu */}
                  {isProductsDropdownOpen && (
                    <div 
                      className="absolute top-full left-0 mt-2 w-64 bg-black border border-slate-300/20 rounded-xl py-2 z-50 shadow-xl"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <a href="#products" className="flex items-center space-x-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all duration-200">
                        <img src="/gasha antivirus.png" alt="GASHA Suite" className="w-8 h-8 object-contain" />
                        <div>
                          <div className="font-medium">GASHA Suite</div>
                          <div className="text-xs text-slate-400">Antivirus, WAF, VPN</div>
                        </div>
                      </a>
                      <a href="#products" className="flex items-center space-x-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all duration-200">
                        <img src="/Nisir.png" alt="NISIR SIEM" className="w-8 h-8 object-contain" />
                        <div>
                          <div className="font-medium">NISIR SIEM</div>
                          <div className="text-xs text-slate-400">Security Monitoring</div>
                        </div>
                      </a>
                      <a href="#products" className="flex items-center space-x-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all duration-200">
                        <img src="/Enyuma IAM.png" alt="ENYUMA IAM" className="w-8 h-8 object-contain" />
                        <div>
                          <div className="font-medium">ENYUMA IAM</div>
                          <div className="text-xs text-slate-400">Identity Management</div>
                        </div>
                      </a>
                      <a href="#products" className="flex items-center space-x-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all duration-200">
                        <img src="/Biometric.png" alt="Biometrics" className="w-8 h-8 object-contain" />
                        <div>
                          <div className="font-medium">Biometrics</div>
                          <div className="text-xs text-slate-400">Identity Verification</div>
                        </div>
                      </a>
                      <a href="#products" className="flex items-center space-x-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all duration-200">
                        <img src="/code protection .png" alt="Code Protection" className="w-8 h-8 object-contain" />
                        <div>
                          <div className="font-medium">Code Protection</div>
                          <div className="text-xs text-slate-400">Application Security</div>
                        </div>
                      </a>
                    </div>
                  )}
                </div>
                
                <a href="#contact" className="text-slate-300 hover:text-white transition-all duration-200 font-medium relative group">
                  Contact
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
                </a>
              </>
            )}
            
            {user ? (
              <div className="flex items-center space-x-6">
                {/* Role-specific nav */}
                {user.role === 'super-admin' && (
                  <>
                    <a href="#sa-overview" className="text-slate-300 hover:text-white font-medium">Overview</a>
                    <a href="#sa-users" className="text-slate-300 hover:text-white font-medium">Users</a>
                    <a href="#sa-settings" className="text-slate-300 hover:text-white font-medium">Settings</a>
                  </>
                )}
                
                {user.role === 'marketing' && (
                  <>
                    <a href="#mkt-campaigns" className="text-slate-300 hover:text-white font-medium">Campaigns</a>
                    <a href="#mkt-leads" className="text-slate-300 hover:text-white font-medium">Leads</a>
                  </>
                )}
                {user.role === 'technical' && (
                  <>
                    <a href="#tech-issues" className="text-slate-300 hover:text-white font-medium">Issues</a>
                    <a href="#tech-deploys" className="text-slate-300 hover:text-white font-medium">Deploys</a>
                  </>
                )}
                {user.role === 'developer' && (
                  <>
                    <a href="#dev-tasks" className="text-slate-300 hover:text-white font-medium">Tasks</a>
                    <a href="#dev-reviews" className="text-slate-300 hover:text-white font-medium">Reviews</a>
                  </>
                )}

                {/* Dashboard/Home button removed per port-login change */}
                {user.role === 'admin' && (
                  <>
                  
                    <a
                      href="#admin-notifications"
                      className="relative inline-flex items-center justify-center w-9 h-9 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/50"
                      aria-label="Notifications"
                      title="Notifications"
                    >
                      <Bell size={18} />
                    </a>
                  </>
                )}
                <div className="flex items-center space-x-3 px-4 py-2 bg-transparent rounded-xl border border-slate-300/20 backdrop-blur-none">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <User size={14} className="text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-white">{user.name}</span>
                    <span className="text-xs text-blue-400 capitalize font-medium">{user.role}</span>
                  </div>
                </div>
                
                <Button variant="ghost" size="sm" onClick={onLogout} className="text-slate-300 hover:text-red-400 hover:bg-red-500/10">
                  <LogOut size={16} />
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-slate-300 hover:text-white"
                  onClick={handleLogoDownload}
                >
                  Documentation
                </Button>
                {/* Login button removed per port-login change */}
              </div>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-300 hover:text-white p-2 rounded-lg hover:bg-slate-800/50 transition-all"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-6 bg-transparent backdrop-blur-none">
            <div className="flex flex-col space-y-4">
              {!user && (
                <>
                  <a href="#products" className="text-slate-300 hover:text-white transition-colors font-medium py-2 px-4 rounded-lg hover:bg-slate-800/50">
                    Products
                  </a>
                  <a href="#contact" className="text-slate-300 hover:text-white transition-colors font-medium py-2 px-4 rounded-lg hover:bg-slate-800/50">
                    Contact
                  </a>
                </>
              )}
              {user ? (
                <div className="pt-4 border-t border-slate-800/50">
                  <div className="flex flex-col space-y-2">
                    {/* Role-specific mobile nav */}
                    {user.role === 'super-admin' && (
                      <>
                        <a href="#sa-overview" className="py-2 px-4 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800/50">Overview</a>
                        <a href="#sa-users" className="py-2 px-4 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800/50">Users</a>
                        <a href="#sa-settings" className="py-2 px-4 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800/50">Settings</a>
                      </>
                    )}
                    {user.role === 'admin' && (
                      <>
                        <a href="#admin-requests" className="py-2 px-4 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800/50">Requests</a>
                        <a href="#admin-team" className="py-2 px-4 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800/50">Team</a>
                        <a href="#admin-content" className="py-2 px-4 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800/50">Content</a>
                        <a href="#admin-analytics" className="py-2 px-4 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800/50">Analytics</a>
                        <a
                          href="#admin-notifications"
                          className="inline-flex items-center gap-2 py-2 px-4 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800/50"
                          aria-label="Notifications"
                          title="Notifications"
                        >
                          <Bell size={16} />
                          <span>Alerts</span>
                        </a>
                      </>
                    )}
                    {user.role === 'marketing' && (
                      <>
                        <a href="#mkt-campaigns" className="py-2 px-4 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800/50">Campaigns</a>
                        <a href="#mkt-leads" className="py-2 px-4 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800/50">Leads</a>
                      </>
                    )}
                    {user.role === 'technical' && (
                      <>
                        <a href="#tech-issues" className="py-2 px-4 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800/50">Issues</a>
                        <a href="#tech-deploys" className="py-2 px-4 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800/50">Deploys</a>
                      </>
                    )}
                    {user.role === 'developer' && (
                      <>
                        <a href="#dev-tasks" className="py-2 px-4 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800/50">Tasks</a>
                        <a href="#dev-reviews" className="py-2 px-4 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800/50">Reviews</a>
                      </>
                    )}

                    {/* Dashboard button removed per port-login change */}
                    <div className="flex items-center justify-between p-4 bg-transparent rounded-xl border border-slate-300/20 backdrop-blur-none">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                          <User size={16} className="text-white" />
                        </div>
                        <div>
                          <span className="text-sm font-medium text-white">{user.name}</span>
                          <p className="text-xs text-blue-400 capitalize">{user.role}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" onClick={onLogout} className="text-slate-300 hover:text-red-400">
                        <LogOut size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="pt-4 border-t border-slate-800/50">
                  {/* Login button removed per port-login change */}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;