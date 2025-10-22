import React, { useState } from 'react';
import { 
  BarChart3, 
  Shield, 
  Users, 
  FileText, 
  TrendingUp, 
  Zap, 
  Bell, 
  Search, 
  Menu, 
  X, 
  Settings, 
  Activity, 
  Globe, 
  Database, 
  Lock, 
  Monitor,
  Clock,
  CheckCircle
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: BarChart3, color: 'blue', badge: null },
    { id: 'modules', label: 'Security Modules', icon: Shield, color: 'red', badge: '5' },
    { id: 'admin', label: 'Admin Management', icon: Users, color: 'purple', badge: '12' },
    { id: 'blog', label: 'Blog Management', icon: FileText, color: 'orange', badge: null },
    { id: 'reports', label: 'Reports', icon: TrendingUp, color: 'green', badge: null },
    { id: 'analytics', label: 'Advanced Analytics', icon: Activity, color: 'pink', badge: 'New' },
  
    { id: 'settings', label: 'Settings', icon: Settings, color: 'gray', badge: null }
  ];

  const filteredItems = navigationItems.filter(item => 
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getColorClasses = (color: string, isActive: boolean) => {
    if (isActive) {
      const colorMap = {
        blue: 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg',
        red: 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg',
        purple: 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg',
        orange: 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg',
        green: 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg',
        teal: 'bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg',
        indigo: 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-lg',
        pink: 'bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-lg',
        yellow: 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-lg',
        emerald: 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg',
        rose: 'bg-gradient-to-r from-rose-500 to-rose-600 text-white shadow-lg',
        gray: 'bg-gradient-to-r from-gray-500 to-gray-600 text-white shadow-lg'
      };
      return colorMap[color as keyof typeof colorMap] || colorMap.blue;
    } else {
      return 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 hover:shadow-sm';
    }
  };

  return (
    <div className={`${isCollapsed ? 'w-16' : 'w-80'} bg-gradient-to-b from-white to-slate-50 border-r border-slate-200 h-full shadow-xl transition-all duration-300`}>
      {/* Enhanced Header */}
      <div className="p-4 border-b border-slate-200">
        <div className="flex items-center justify-between mb-4">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img src="/mian logo.png" alt="Super Admin Logo" className="w-10 h-10 object-contain" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">Super Admin</h2>
                <p className="text-xs text-slate-500">Enterprise Control Center</p>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-600 font-medium">System Online</span>
                </div>
              </div>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            {isCollapsed ? <Menu size={20} /> : <X size={20} />}
          </button>
        </div>
        
        {/* Search Bar */}
        {!isCollapsed && (
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search modules..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>
        )}
      </div>

      {/* System Status Bar */}
      {!isCollapsed && (
        <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-700">All Systems Operational</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-green-600" />
              <span className="text-xs text-green-600">99.9% Uptime</span>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Navigation */}
      <div className="p-4 flex-1 overflow-y-auto">
        <nav className="space-y-2">
          {filteredItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} px-4 py-3 rounded-xl font-medium transition-all duration-200 ${getColorClasses(item.color, isActive)} group`}
                title={isCollapsed ? item.label : undefined}
              >
                <div className={`p-1 rounded-lg ${isActive ? 'bg-white/20' : 'bg-slate-100'} group-hover:scale-110 transition-transform duration-200`}>
                  <item.icon size={18} className={isActive ? 'text-white' : 'text-slate-600'} />
                </div>
                {!isCollapsed && (
                  <>
                    <span className="text-sm flex-1 text-left">{item.label}</span>
                    {item.badge && (
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                        item.badge === 'New' ? 'bg-yellow-100 text-yellow-800' :
                        item.badge === '5' ? 'bg-red-100 text-red-800' :
                        item.badge === '12' ? 'bg-purple-100 text-purple-800' :
                        item.badge === '3' ? 'bg-indigo-100 text-indigo-800' :
                        item.badge === '8' ? 'bg-rose-100 text-rose-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Enhanced Footer */}
      <div className="p-4 border-t border-slate-200 bg-gradient-to-r from-slate-50 to-white">
        {!isCollapsed ? (
          <div className="text-center">
            <img src="/mian logo.png" alt="Super Admin Logo" className="w-8 h-10 object-contain mx-auto mb-2" />
            <p className="text-xs text-slate-600 font-medium">Super Admin Portal</p>
            <p className="text-xs text-slate-500">Version 2.1.0 Enterprise</p>
            <div className="mt-2 flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-slate-500">All Systems Online</span>
            </div>
            <div className="mt-2 flex items-center justify-center space-x-4 text-xs text-slate-500">
              <span>• Secure</span>
              <span>• Monitored</span>
              <span>• Active</span>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="relative">
              <img src="/mian logo.png" alt="Super Admin Logo" className="w-6 h-6 object-contain" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;

