import React, { useState } from 'react';
import { 
  Plus, 
  FileText, 
  Users, 
  BarChart3, 
  Download, 
  Upload, 
  Send, 
  RefreshCw, 
  Zap,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp
} from 'lucide-react';
import Button from '../../../ui/Button';

interface QuickActionsSectionProps {
  onCreateRequest: () => void;
  onAddTeamMember: () => void;
  onCreatePost: () => void;
  onExportData: () => void;
  onSendNotification: () => void;
  onRunBackup: () => void;
  onRefreshSystem: () => void;
  onGenerateReport: () => void;
}

const QuickActionsSection: React.FC<QuickActionsSectionProps> = ({
  onCreateRequest,
  onAddTeamMember,
  onCreatePost,
  onExportData,
  onSendNotification,
  onRunBackup,
  onRefreshSystem,
  onGenerateReport
}) => {
  const [recentActions] = useState<any[]>([]);

  const quickActions = [
    {
      id: 'create-request',
      title: 'Create Request',
      description: 'Add new product request',
      icon: Plus,
      color: 'blue',
      action: onCreateRequest
    },
    {
      id: 'add-member',
      title: 'Add Team Member',
      description: 'Invite new team member',
      icon: Users,
      color: 'green',
      action: onAddTeamMember
    },
    {
      id: 'create-post',
      title: 'Create Post',
      description: 'Publish new content',
      icon: FileText,
      color: 'purple',
      action: onCreatePost
    },
    {
      id: 'export-data',
      title: 'Export Data',
      description: 'Download reports',
      icon: Download,
      color: 'emerald',
      action: onExportData
    },
    {
      id: 'send-notification',
      title: 'Send Notification',
      description: 'Notify team members',
      icon: Send,
      color: 'orange',
      action: onSendNotification
    },
    {
      id: 'run-backup',
      title: 'Run Backup',
      description: 'System backup',
      icon: Upload,
      color: 'red',
      action: onRunBackup
    },
    {
      id: 'refresh-system',
      title: 'Refresh System',
      description: 'Update system data',
      icon: RefreshCw,
      color: 'teal',
      action: onRefreshSystem
    },
    {
      id: 'generate-report',
      title: 'Generate Report',
      description: 'Create analytics report',
      icon: TrendingUp,
      color: 'indigo',
      action: onGenerateReport
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'bg-blue-100 text-blue-600 hover:bg-blue-200',
      green: 'bg-green-100 text-green-600 hover:bg-green-200',
      purple: 'bg-purple-100 text-purple-600 hover:bg-purple-200',
      emerald: 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200',
      orange: 'bg-orange-100 text-orange-600 hover:bg-orange-200',
      red: 'bg-red-100 text-red-600 hover:bg-red-200',
      teal: 'bg-teal-100 text-teal-600 hover:bg-teal-200',
      indigo: 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold text-slate-900">Quick Actions</h3>
          <p className="text-slate-600 mt-1">Fast access to common tasks and operations</p>
        </div>
        <div className="flex items-center space-x-2 bg-gradient-to-r from-yellow-50 to-orange-50 px-4 py-2 rounded-lg border border-yellow-200">
          <Zap className="h-4 w-4 text-yellow-600" />
          <span className="text-sm font-medium text-yellow-700">Power Tools</span>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickActions.map((action) => (
          <button
            key={action.id}
            onClick={action.action}
            className={`p-6 rounded-xl border border-slate-200 hover:shadow-lg transition-all duration-200 group ${getColorClasses(action.color)}`}
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-white/50 group-hover:scale-110 transition-transform duration-200">
                <action.icon size={24} />
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-slate-900">{action.title}</h4>
                <p className="text-sm text-slate-600">{action.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h4 className="text-lg font-semibold text-slate-900">Recent Activity</h4>
            <p className="text-sm text-slate-600">Latest actions performed by team members</p>
          </div>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
        
        <div className="space-y-4">
          {recentActions.map((activity) => (
            <div key={activity.id} className="flex items-center space-x-4 p-4 rounded-lg hover:bg-slate-50 transition-colors">
              <div className={`p-2 rounded-lg ${getColorClasses(activity.color)}`}>
                <activity.icon size={16} />
              </div>
              <div className="flex-1">
                <p className="font-medium text-slate-900">{activity.action}</p>
                <p className="text-sm text-slate-600">by {activity.user}</p>
              </div>
              <div className="flex items-center space-x-2 text-slate-500">
                <Clock size={14} />
                <span className="text-sm">{activity.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* System Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* System Health */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h4 className="font-semibold text-green-800">System Health</h4>
              <p className="text-sm text-green-600">All systems operational</p>
            </div>
          </div>
          <div className="text-2xl font-bold text-green-800 mb-2">99.9%</div>
          <div className="w-full bg-green-200 rounded-full h-2">
            <div className="bg-green-500 h-2 rounded-full" style={{width: '99.9%'}}></div>
          </div>
        </div>

        {/* Active Users */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-blue-800">Active Users</h4>
              <p className="text-sm text-blue-600">Currently online</p>
            </div>
          </div>
          <div className="text-2xl font-bold text-blue-800 mb-2">24</div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-blue-600">+3 from yesterday</span>
          </div>
        </div>

        {/* Alerts */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-amber-100 rounded-lg">
              <AlertCircle className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <h4 className="font-semibold text-amber-800">Alerts</h4>
              <p className="text-sm text-amber-600">System notifications</p>
            </div>
          </div>
          <div className="text-2xl font-bold text-amber-800 mb-2">2</div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
            <span className="text-sm text-amber-600">Minor warnings</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActionsSection;