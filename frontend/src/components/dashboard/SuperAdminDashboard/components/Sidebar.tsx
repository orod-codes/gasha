import React from 'react';
import { BarChart3, Shield, Users, FileText, TrendingUp } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'modules', label: 'Security Modules', icon: Shield },
    { id: 'admin', label: 'Admin Management', icon: Users },
    { id: 'blog', label: 'Blog Management', icon: FileText },
    { id: 'reports', label: 'Reports', icon: TrendingUp }
  ];

  return (
    <div className="w-64 bg-white shadow-lg">
      {/* Header */}
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center space-x-3">
          <img src="/mian logo.png" alt="Super Admin Logo" className="w-10 h-10 object-contain" />
          <div>
            <h1 className="text-lg font-bold text-slate-900">Super Admin</h1>
            <p className="text-xs text-slate-500">Dashboard</p>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {navigationItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors ${
              activeTab === item.id
                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200">
        <div className="text-center">
          <p className="text-xs text-slate-500">Version 1.0.0</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

