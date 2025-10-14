import React from 'react';
import { 
  Zap, 
  Plus, 
  FileText, 
  Users, 
  Download, 
  Mail, 
  Bell, 
  Shield, 
  RefreshCw,
  BarChart3,
  Database,
  Clock,
  CheckCircle
} from 'lucide-react';
import Button from '../../../ui/Button';

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  bgColor: string;
  action: () => void;
}

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
  const quickActions: QuickAction[] = [
    {
      id: 'create-request',
      title: 'Create Request',
      description: 'Create a new module request',
      icon: Plus,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      action: onCreateRequest
    },
    {
      id: 'add-member',
      title: 'Add Team Member',
      description: 'Add a new team member',
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      action: onAddTeamMember
    },
    {
      id: 'create-post',
      title: 'Create Post',
      description: 'Create new content post',
      icon: FileText,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      action: onCreatePost
    },
    {
      id: 'export-data',
      title: 'Export Data',
      description: 'Export system data',
      icon: Download,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      action: onExportData
    },
    {
      id: 'send-notification',
      title: 'Send Notification',
      description: 'Send system notification',
      icon: Mail,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100',
      action: onSendNotification
    },
    {
      id: 'run-backup',
      title: 'Run Backup',
      description: 'Execute system backup',
      icon: Database,
      color: 'text-teal-600',
      bgColor: 'bg-teal-100',
      action: onRunBackup
    },
    {
      id: 'refresh-system',
      title: 'Refresh System',
      description: 'Refresh system metrics',
      icon: RefreshCw,
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-100',
      action: onRefreshSystem
    },
    {
      id: 'generate-report',
      title: 'Generate Report',
      description: 'Generate analytics report',
      icon: BarChart3,
      color: 'text-pink-600',
      bgColor: 'bg-pink-100',
      action: onGenerateReport
    }
  ];

  const recentActivities = [
    { action: 'Request approved', time: '2 minutes ago', icon: CheckCircle, color: 'text-green-500' },
    { action: 'New team member added', time: '15 minutes ago', icon: Users, color: 'text-blue-500' },
    { action: 'Content published', time: '1 hour ago', icon: FileText, color: 'text-purple-500' },
    { action: 'System backup completed', time: '2 hours ago', icon: Database, color: 'text-teal-500' }
  ];

  const pendingTasks = [
    { task: 'Review 3 pending requests', priority: 'high', count: 3 },
    { task: 'Approve content posts', priority: 'medium', count: 2 },
    { task: 'Update team permissions', priority: 'low', count: 1 },
    { task: 'Generate monthly report', priority: 'medium', count: 1 }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-green-600 bg-green-100';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold text-slate-900">Quick Actions</h3>
          <p className="text-slate-600 mt-1">Streamline your workflow with powerful tools</p>
        </div>
        <div className="flex items-center space-x-2 bg-gradient-to-r from-yellow-50 to-orange-50 px-4 py-2 rounded-lg border border-yellow-200">
          <Zap size={20} className="text-yellow-600" />
          <span className="text-sm font-medium text-yellow-800">Power Tools</span>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickActions.map((action) => (
          <div key={action.id} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-lg hover:border-slate-300 transition-all duration-200 cursor-pointer group" onClick={action.action}>
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-xl ${action.bgColor} group-hover:scale-110 transition-transform duration-200`}>
                <action.icon size={24} className={action.color} />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-slate-900 text-base group-hover:text-blue-600 transition-colors">{action.title}</h4>
                <p className="text-sm text-slate-600 mt-1">{action.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activities */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h4 className="text-lg font-semibold text-slate-900">Recent Activities</h4>
              <p className="text-sm text-slate-600 mt-1">Latest system activities</p>
            </div>
            <div className="flex items-center space-x-2 bg-blue-50 px-3 py-1 rounded-lg">
              <Clock size={16} className="text-blue-600" />
              <span className="text-sm font-medium text-blue-600">Live</span>
            </div>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 hover:bg-slate-50 rounded-lg transition-colors">
                <div className={`p-2 rounded-lg ${activity.color.replace('text-', 'bg-').replace('-500', '-100')}`}>
                  <activity.icon size={16} className={activity.color} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900">{activity.action}</p>
                  <p className="text-xs text-slate-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Tasks */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h4 className="text-lg font-semibold text-slate-900">Pending Tasks</h4>
              <p className="text-sm text-slate-600 mt-1">Tasks requiring attention</p>
            </div>
            <div className="flex items-center space-x-2 bg-red-50 px-3 py-1 rounded-lg">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="text-sm font-medium text-red-600">Urgent</span>
            </div>
          </div>
          <div className="space-y-4">
            {pendingTasks.map((task, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-slate-100 rounded-lg border border-slate-200">
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900">{task.task}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                    <span className="text-xs text-slate-500">{task.count} items</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="border-blue-300 text-blue-600 hover:bg-blue-50">
                  View
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Status Overview */}
      <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h4 className="text-xl font-bold text-slate-900">System Status Overview</h4>
            <p className="text-slate-600 mt-1">Real-time system metrics and performance indicators</p>
          </div>
          <div className="flex items-center space-x-2 bg-green-50 px-4 py-2 rounded-lg border border-green-200">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-green-700">All Systems Operational</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={24} className="text-white" />
            </div>
            <div className="text-2xl font-bold text-green-700 mb-1">98%</div>
            <p className="text-sm font-medium text-green-600">System Uptime</p>
            <p className="text-xs text-green-500 mt-1">+0.2% from yesterday</p>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Users size={24} className="text-white" />
            </div>
            <div className="text-2xl font-bold text-blue-700 mb-1">24</div>
            <p className="text-sm font-medium text-blue-600">Active Users</p>
            <p className="text-xs text-blue-500 mt-1">+3 from last hour</p>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
            <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <FileText size={24} className="text-white" />
            </div>
            <div className="text-2xl font-bold text-purple-700 mb-1">45</div>
            <p className="text-sm font-medium text-purple-600">Pending Requests</p>
            <p className="text-xs text-purple-500 mt-1">-5 from yesterday</p>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200">
            <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Bell size={24} className="text-white" />
            </div>
            <div className="text-2xl font-bold text-orange-700 mb-1">3</div>
            <p className="text-sm font-medium text-orange-600">Unread Alerts</p>
            <p className="text-xs text-orange-500 mt-1">2 high priority</p>
          </div>
        </div>
      </div>

      {/* Emergency Actions */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6 border-l-4 border-red-500 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h4 className="text-lg font-bold text-slate-900">Emergency Actions</h4>
            <p className="text-sm text-slate-600 mt-1">Critical system controls for emergency situations</p>
          </div>
          <div className="flex items-center space-x-2 bg-red-100 px-3 py-1 rounded-lg">
            <Shield size={20} className="text-red-600" />
            <span className="text-sm font-medium text-red-700">Emergency Mode</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 transition-all">
            <RefreshCw size={16} className="mr-2" />
            Restart Services
          </Button>
          <Button variant="outline" className="border-orange-300 text-orange-600 hover:bg-orange-50 hover:border-orange-400 transition-all">
            <Database size={16} className="mr-2" />
            Emergency Backup
          </Button>
          <Button variant="outline" className="border-yellow-300 text-yellow-600 hover:bg-yellow-50 hover:border-yellow-400 transition-all">
            <Bell size={16} className="mr-2" />
            Send Alert
          </Button>
        </div>
        <div className="mt-4 p-3 bg-red-100 rounded-lg border border-red-200">
          <p className="text-xs text-red-700 font-medium">
            ⚠️ Use these actions only in emergency situations. All actions are logged and monitored.
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuickActionsSection;
