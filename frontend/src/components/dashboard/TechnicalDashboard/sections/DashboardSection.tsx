import React from 'react';
import { User } from '../../../types';
import Card from '../../../ui/Card';
import Button from '../../../ui/Button';
import { Wrench, CheckCircle, Clock, AlertTriangle, TrendingUp, Server } from 'lucide-react';

interface DashboardSectionProps {
  user: User;
  onRefreshData: () => void;
  onViewDetails: (type: string) => void;
}

const DashboardSection: React.FC<DashboardSectionProps> = ({ user, onRefreshData, onViewDetails }) => {
  const stats = [
    {
      title: 'Active Tasks',
      value: '12',
      change: '+3',
      changeType: 'increase',
      icon: Wrench,
      color: 'blue'
    },
    {
      title: 'Completed Today',
      value: '8',
      change: '+2',
      changeType: 'increase',
      icon: CheckCircle,
      color: 'green'
    },
    {
      title: 'Pending Reviews',
      value: '5',
      change: '-1',
      changeType: 'decrease',
      icon: Clock,
      color: 'orange'
    },
    {
      title: 'System Health',
      value: '98%',
      change: '+2%',
      changeType: 'increase',
      icon: Server,
      color: 'emerald'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      action: 'Deployed GASHA Anti-Virus',
      company: 'TechCorp Solutions',
      time: '2 hours ago',
      status: 'success'
    },
    {
      id: 2,
      action: 'Configured NISIR SIEM',
      company: 'DataFlow Inc',
      time: '4 hours ago',
      status: 'success'
    },
    {
      id: 3,
      action: 'WAF Installation Failed',
      company: 'WebSecure Ltd',
      time: '6 hours ago',
      status: 'error'
    },
    {
      id: 4,
      action: 'VPN Setup Completed',
      company: 'RemoteWork Corp',
      time: '1 day ago',
      status: 'success'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600 bg-green-100';
      case 'error': return 'text-red-600 bg-red-100';
      case 'warning': return 'text-orange-600 bg-orange-100';
      default: return 'text-slate-600 bg-slate-100';
    }
  };

  const getChangeColor = (changeType: string) => {
    return changeType === 'increase' ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Technical Dashboard</h2>
          <p className="text-slate-600">Welcome back, {user?.name}. Here's your technical overview.</p>
        </div>
        <Button onClick={onRefreshData}>
          <TrendingUp className="h-4 w-4 mr-2" />
          Refresh Data
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">{stat.title}</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
                <p className={`text-sm mt-1 ${getChangeColor(stat.changeType)}`}>
                  {stat.change} from yesterday
                </p>
              </div>
              <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Activities</h3>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className={`p-1 rounded-full ${getStatusColor(activity.status)}`}>
                  {activity.status === 'success' && <CheckCircle className="h-4 w-4" />}
                  {activity.status === 'error' && <AlertTriangle className="h-4 w-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900">{activity.action}</p>
                  <p className="text-sm text-slate-600">{activity.company}</p>
                  <p className="text-xs text-slate-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Button 
              className="w-full justify-start" 
              onClick={() => onViewDetails('tasks')}
            >
              <Wrench className="h-4 w-4 mr-2" />
              View Active Tasks
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => onViewDetails('deployments')}
            >
              <Server className="h-4 w-4 mr-2" />
              Check Deployments
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => onViewDetails('monitoring')}
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              System Monitoring
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardSection;

