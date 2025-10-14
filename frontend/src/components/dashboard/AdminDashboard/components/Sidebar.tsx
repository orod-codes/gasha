import React from 'react';
import { FileText, Users, CreditCard as Edit, Eye, BarChart3, Settings, Shield, LayoutDashboard } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, color: 'blue' },
    { id: 'requests', label: 'Request Management', icon: FileText, color: 'emerald' },
    { id: 'team', label: 'Team Management', icon: Users, color: 'purple' },
    { id: 'content', label: 'Content Management', icon: Edit, color: 'orange' },
    { id: 'analytics', label: 'Analytics & Reports', icon: BarChart3, color: 'indigo' },
    { id: 'notifications', label: 'Notifications', icon: Eye, color: 'pink' },
    { id: 'activity', label: 'Activity Log', icon: BarChart3, color: 'teal' },
    { id: 'system', label: 'System Health', icon: Shield, color: 'red' },
    { id: 'settings', label: 'Settings', icon: Settings, color: 'gray' }
  ];

  const getColorClasses = (color: string, isActive: boolean) => {
    if (isActive) {
      const colorMap = {
        blue: 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg',
        emerald: 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg',
        purple: 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg',
        orange: 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg',
        indigo: 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-lg',
        pink: 'bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-lg',
        teal: 'bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg',
        red: 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg',
        gray: 'bg-gradient-to-r from-gray-500 to-gray-600 text-white shadow-lg'
      };
      return colorMap[color as keyof typeof colorMap] || colorMap.blue;
    } else {
      return 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 hover:shadow-sm';
    }
  };

  return (
    <div className="w-72 bg-gradient-to-b from-white to-slate-50 border-r border-slate-200 h-full shadow-xl">
      {/* Professional Header */}
     

      {/* Navigation */}
      <div className="p-4">
        <nav className="space-y-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${getColorClasses(tab.color, isActive)}`}
              >
                <div className={`p-1 rounded-lg ${isActive ? 'bg-white/20' : 'bg-slate-100'}`}>
                  <tab.icon size={18} className={isActive ? 'text-white' : 'text-slate-600'} />
                </div>
                <span className="text-sm">{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-20 bg-slate-50">
        <div className="text-center">
          <img src="/mian logo.png" alt="GASHA Logo" className="w-8 h-8 object-contain mx-auto mb-2" />
          <p className="text-xs text-slate-600 font-medium">Secure Admin Portal</p>
          <p className="text-xs text-slate-500">Version 2.1.0</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
