import React, { useState } from 'react';
import { 
  BarChart3, 
  Megaphone, 
  Users, 
  Search, 
  Menu, 
  X, 
  LayoutDashboard,
  Calendar,
  Target,
  CheckCircle,
  XCircle,
  Eye,
  FileText,
  Settings,
  TrendingUp,
  Mail,
  Share2
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, color: 'blue', badge: null },
    { id: 'approvals', label: 'Content Approval', icon: CheckCircle, color: 'pink', badge: '5' },
    // { id: 'leads', label: 'Lead Management', icon: Users, color: 'emerald', badge: '12' },
    { id: 'calendar', label: 'Content Calendar', icon: Calendar, color: 'orange', badge: '3' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, color: 'teal', badge: null },
  ];

  const filteredTabs = tabs.filter(tab => 
    tab.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getColorClasses = (color: string, isActive: boolean) => {
    if (isActive) {
      const colorMap = {
        blue: 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg',
        emerald: 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg',
        purple: 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg',
        indigo: 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-lg',
        orange: 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg',
        pink: 'bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-lg',
        teal: 'bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg',
        red: 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg',
        gray: 'bg-gradient-to-r from-gray-500 to-gray-600 text-white shadow-lg',
        yellow: 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-lg'
      };
      return colorMap[color as keyof typeof colorMap] || colorMap.blue;
    } else {
      return 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 hover:shadow-sm';
    }
  };

  return (
    <div className={`${isCollapsed ? 'w-16' : 'w-72'} bg-gradient-to-b from-white to-slate-50 border-r border-slate-200 h-full shadow-xl transition-all duration-300`}>
      {/* Enhanced Header */}
      <div className="p-4 border-b border-slate-200">
        <div className="flex items-center justify-between mb-4">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <img src="/mian logo.png" alt="GASHA Logo" className="w-8 h-8 object-contain" />
              <div>
                <h2 className="text-lg font-bold text-slate-900">Marketing Portal</h2>
                <p className="text-xs text-slate-500">Dashboard v2.1.0</p>
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
              placeholder="Search sections..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>
        )}
      </div>
      {/* Enhanced Navigation */}
      <div className="p-4">
        <nav className="space-y-2">
          {filteredTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} px-4 py-3 rounded-xl font-medium transition-all duration-200 ${getColorClasses(tab.color, isActive)} group`}
                title={isCollapsed ? tab.label : undefined}
              >
                <div className={`p-1 rounded-lg ${isActive ? 'bg-white/20' : 'bg-slate-100'} group-hover:scale-110 transition-transform duration-200`}>
                  <tab.icon size={18} className={isActive ? 'text-white' : 'text-slate-600'} />
                </div>
                {!isCollapsed && (
                  <>
                    <span className="text-sm flex-1 text-left">{tab.label}</span>
                    {tab.badge && (
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                        tab.badge === 'New' ? 'bg-yellow-100 text-yellow-800' :
                        tab.badge === '3' ? 'bg-red-100 text-red-800' :
                        tab.badge === '5' ? 'bg-pink-100 text-pink-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {tab.badge}
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
     
    </div>
  );
};

export default Sidebar;
