import React from 'react';
import Card from '../../../ui/Card';
import Button from '../../../ui/Button';
import { Clock, User, Activity, Filter } from 'lucide-react';

const ActivityLogsSection: React.FC = () => {
  const activityLogs = [
    {
      id: 1,
      action: 'Task TASK-001 started',
      user: 'John Smith',
      timestamp: '2024-01-15 14:30:25',
      type: 'task',
      details: 'GASHA Anti-Virus deployment initiated'
    },
    {
      id: 2,
      action: 'File uploaded: deployment-guide.pdf',
      user: 'Sarah Johnson',
      timestamp: '2024-01-15 13:45:12',
      type: 'file',
      details: 'Task TASK-002 documentation'
    },
    {
      id: 3,
      action: 'Deployment DEP-001 completed',
      user: 'Mike Chen',
      timestamp: '2024-01-15 12:15:08',
      type: 'deployment',
      details: 'GASHA WAF successfully deployed'
    },
    {
      id: 4,
      action: 'Configuration updated',
      user: 'Emma Wilson',
      timestamp: '2024-01-15 11:20:45',
      type: 'config',
      details: 'NISIR SIEM security rules modified'
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'task': return 'bg-blue-100 text-blue-700';
      case 'file': return 'bg-green-100 text-green-700';
      case 'deployment': return 'bg-purple-100 text-purple-700';
      case 'config': return 'bg-orange-100 text-orange-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Activity Logs</h2>
          <p className="text-slate-600">Detailed log of all technical activities</p>
        </div>
        <div className="flex space-x-3">
          <select className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="all">All Activities</option>
            <option value="task">Tasks</option>
            <option value="file">Files</option>
            <option value="deployment">Deployments</option>
            <option value="config">Configuration</option>
          </select>
          <Button>
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Activities</p>
              <p className="text-2xl font-bold text-blue-600">1,247</p>
            </div>
            <Activity className="h-8 w-8 text-blue-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Today</p>
              <p className="text-2xl font-bold text-green-600">23</p>
            </div>
            <Clock className="h-8 w-8 text-green-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">This Week</p>
              <p className="text-2xl font-bold text-orange-600">156</p>
            </div>
            <User className="h-8 w-8 text-orange-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Active Users</p>
              <p className="text-2xl font-bold text-purple-600">8</p>
            </div>
            <User className="h-8 w-8 text-purple-600" />
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Activities</h3>
        <div className="space-y-4">
          {activityLogs.map((log) => (
            <div key={log.id} className="flex items-start space-x-4 p-4 bg-slate-50 rounded-lg">
              <div className={`p-2 rounded-lg ${getTypeColor(log.type)}`}>
                <Activity className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-slate-900">{log.action}</p>
                  <span className="text-sm text-slate-500">{log.timestamp}</span>
                </div>
                <p className="text-sm text-slate-600 mt-1">{log.details}</p>
                <p className="text-xs text-slate-500 mt-1">by {log.user}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default ActivityLogsSection;

