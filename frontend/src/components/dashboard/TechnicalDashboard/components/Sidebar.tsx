import React, { useState } from 'react';
import { 
  Wrench, 
  CheckCircle, 
  FileText, 
  Upload, 
  Settings, 
  BarChart3, 
  Shield, 
  LayoutDashboard, 
  Clock, 
  Server,
  Search,
  Menu,
  X,
  Database,
  Code,
  Terminal,
  Monitor,
  CheckCircle2
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
    { id: 'tasks', label: 'Task Management', icon: Wrench, color: 'emerald', badge: '5' },
    { id: 'deployments', label: 'Deployments', icon: Server, color: 'purple', badge: '2' },
    { id: 'completed', label: 'Completed Tasks', icon: CheckCircle, color: 'green', badge: null },
    { id: 'documentation', label: 'Documentation', icon: FileText, color: 'orange', badge: null },
    { id: 'uploads', label: 'File Uploads', icon: Upload, color: 'indigo', badge: '3' },
    { id: 'monitoring', label: 'System Monitoring', icon: BarChart3, color: 'teal', badge: null },
    { id: 'logs', label: 'Activity Logs', icon: Clock, color: 'pink', badge: '12' },
    { id: 'security', label: 'Security', icon: Shield, color: 'red', badge: null },
    { id: 'code', label: 'Code Repository', icon: Code, color: 'yellow', badge: 'New' },
    { id: 'terminal', label: 'Terminal Access', icon: Terminal, color: 'gray', badge: null },
    { id: 'database', label: 'Database Admin', icon: Database, color: 'cyan', badge: null },
    { id: 'settings', label: 'Settings', icon: Settings, color: 'slate', badge: null }
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
        green: 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg',
        orange: 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg',
        indigo: 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-lg',
        teal: 'bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg',
        pink: 'bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-lg',
        red: 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg',
        gray: 'bg-gradient-to-r from-gray-500 to-gray-600 text-white shadow-lg',
        yellow: 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-lg',
        cyan: 'bg-gradient-to-r from-cyan-500 to-cyan-600 text-white shadow-lg',
        slate: 'bg-gradient-to-r from-slate-500 to-slate-600 text-white shadow-lg'
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
                <div className="p-2 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-lg">
                  <Wrench className="h-6 w-6 text-blue-600" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">Technical Portal</h2>
                <p className="text-xs text-slate-500">Deployment & Operations</p>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-600 font-medium">Systems Active</span>
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
              placeholder="Search technical tools..."
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
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-700">All Services Running</span>
            </div>
            <div className="flex items-center space-x-2">
              <Monitor className="h-4 w-4 text-green-600" />
              <span className="text-xs text-green-600">99.8% Uptime</span>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Navigation */}
      <div className="p-4 flex-1 overflow-y-auto">
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
                        tab.badge === '5' ? 'bg-emerald-100 text-emerald-800' :
                        tab.badge === '2' ? 'bg-purple-100 text-purple-800' :
                        tab.badge === '3' ? 'bg-indigo-100 text-indigo-800' :
                        tab.badge === '12' ? 'bg-pink-100 text-pink-800' :
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



