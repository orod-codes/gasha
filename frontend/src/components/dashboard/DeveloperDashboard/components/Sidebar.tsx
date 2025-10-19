import React from 'react';
import { FileText, GitBranch, Book, TestTube, Rocket, BarChart3, Terminal, Database, Shield, Settings, Code } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'content-management', label: 'Content Management', icon: FileText, color: 'blue' },
    { id: 'code-repository', label: 'Code Repository', icon: GitBranch, color: 'emerald' },
    { id: 'documentation', label: 'Documentation', icon: Book, color: 'purple' },
    { id: 'testing', label: 'Testing & QA', icon: TestTube, color: 'orange' },
    { id: 'deployment', label: 'Deployment', icon: Rocket, color: 'indigo' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, color: 'pink' },
    { id: 'terminal', label: 'Terminal', icon: Terminal, color: 'teal' },
    { id: 'database', label: 'Database', icon: Database, color: 'red' },
    { id: 'security', label: 'Security', icon: Shield, color: 'gray' },
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
    <div className="w-72 bg-gradient-to-b from-white to-slate-50 border-r border-slate-200 h-full shadow-xl flex flex-col">
      {/* Professional Header */}
      <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Code className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Developer Portal</h2>
            <p className="text-sm text-slate-600">Code & Operations</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="p-6 border-b border-slate-200">
        <h3 className="text-sm font-semibold text-slate-700 mb-3">Quick Stats</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm text-slate-600">
            <span>Active Projects:</span>
            <span className="font-medium text-blue-600">12</span>
          </div>
          <div className="flex justify-between items-center text-sm text-slate-600">
            <span>Commits Today:</span>
            <span className="font-medium text-emerald-600">8</span>
          </div>
          <div className="flex justify-between items-center text-sm text-slate-600">
            <span>Tests Passing:</span>
            <span className="font-medium text-green-600">98.5%</span>
          </div>
          <div className="flex justify-between items-center text-sm text-slate-600">
            <span>Deployments:</span>
            <span className="font-medium text-purple-600">3</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="p-4 flex-1 overflow-y-auto">
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
      <div className="p-4 border-t border-slate-200 bg-slate-50">
        <div className="text-center">
          <img src="/mian logo.png" alt="GASHA Logo" className="w-8 h-8 object-contain mx-auto mb-2" />
          <p className="text-xs text-slate-600 font-medium">Developer Operations</p>
          <p className="text-xs text-slate-500">Version 2.1.0</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;