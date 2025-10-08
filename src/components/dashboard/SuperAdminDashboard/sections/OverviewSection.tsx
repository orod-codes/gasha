import React from 'react';
import { Database, Server, Target, CheckCircle, TrendingUp, BarChart3, PieChart, Calendar, Download } from 'lucide-react';
import Card from '../../../ui/Card';
import Button from '../../../ui/Button';

interface OverviewSectionProps {
  stats: {
    totalUsers: number;
    activeModules: number;
    totalRequests: number;
    completedRequests: number;
  };
  moduleStats: Array<{
    name: string;
    requests: number;
    downloads: number;
    color: string;
  }>;
  onViewDetails?: () => void;
  onViewCalendar?: () => void;
  onViewAll?: () => void;
}

const OverviewSection: React.FC<OverviewSectionProps> = ({ 
  stats = { totalUsers: 0, activeModules: 0, totalRequests: 0, completedRequests: 0 }, 
  moduleStats = [], 
  onViewDetails, 
  onViewCalendar, 
  onViewAll 
}) => {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Total Users</p>
              <p className="text-3xl font-bold text-slate-900 mt-1">{stats.totalUsers.toLocaleString()}</p>
            </div>
            <div className="p-4">
              <Database className="h-7 w-7 text-black" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="h-4 w-4 text-green-600 mr-2" />
            <span className="text-green-600 font-semibold">+12%</span>
            <span className="text-slate-600 ml-2">from last month</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Active Modules</p>
              <p className="text-3xl font-bold text-slate-900 mt-1">{stats.activeModules}</p>
            </div>
            <div className="p-4">
              <Server className="h-7 w-7 text-black" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="h-4 w-4 text-green-600 mr-2" />
            <span className="text-green-600 font-semibold">+2</span>
            <span className="text-slate-600 ml-2">new this month</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Total Requests</p>
              <p className="text-3xl font-bold text-slate-900 mt-1">{stats.totalRequests.toLocaleString()}</p>
            </div>
            <div className="p-4">
              <Target className="h-7 w-7 text-black" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="h-4 w-4 text-green-600 mr-2" />
            <span className="text-green-600 font-semibold">+8%</span>
            <span className="text-slate-600 ml-2">from last month</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Completed</p>
              <p className="text-3xl font-bold text-slate-900 mt-1">{stats.completedRequests.toLocaleString()}</p>
            </div>
            <div className="p-4">
              <CheckCircle className="h-7 w-7 text-black" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-slate-600">83.6% completion rate</span>
          </div>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Module Performance Chart */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Module Performance</h3>
              <p className="text-sm text-slate-600">Requests vs Downloads</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={onViewDetails}>
                <BarChart3 size={16} className="mr-2" />
                View Details
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            {moduleStats.map((module, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${module.color}`}></div>
                  <span className="text-sm font-medium text-slate-700">{module.name}</span>
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <span className="text-slate-600">{module.requests} requests</span>
                  <span className="text-slate-600">{module.downloads} downloads</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Activity Overview */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Activity Overview</h3>
              <p className="text-sm text-slate-600">Last 30 days</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={onViewCalendar}>
                <Calendar size={16} className="mr-2" />
                View Calendar
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-slate-900">System Requests</p>
                  <p className="text-sm text-slate-600">Peak: 2,847 requests</p>
                </div>
              </div>
              <span className="text-sm font-semibold text-blue-600">+15%</span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <PieChart className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-slate-900">Module Usage</p>
                  <p className="text-sm text-slate-600">Avg: 78% utilization</p>
                </div>
              </div>
              <span className="text-sm font-semibold text-green-600">+8%</span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Download className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-slate-900">Downloads</p>
                  <p className="text-sm text-slate-600">Total: 2,126 downloads</p>
                </div>
              </div>
              <span className="text-sm font-semibold text-purple-600">+22%</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Recent Activity</h3>
            <p className="text-sm text-slate-600">Latest system events</p>
          </div>
          <Button variant="outline" size="sm" onClick={onViewAll}>
            View All
          </Button>
        </div>
        
        <div className="space-y-4">
          {[
            { action: 'New admin created', module: 'GASHA Admin', time: '2 minutes ago', status: 'success' },
            { action: 'Module updated', module: 'NISIR SIEM', time: '15 minutes ago', status: 'info' },
            { action: 'User request processed', module: 'Security Service', time: '1 hour ago', status: 'success' },
            { action: 'System backup completed', module: 'All Modules', time: '2 hours ago', status: 'success' },
            { action: 'New blog post published', module: 'Blog Management', time: '3 hours ago', status: 'info' }
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${
                  activity.status === 'success' ? 'bg-green-500' : 'bg-blue-500'
                }`}></div>
                <div>
                  <p className="font-medium text-slate-900">{activity.action}</p>
                  <p className="text-sm text-slate-600">{activity.module}</p>
                </div>
              </div>
              <span className="text-sm text-slate-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default OverviewSection;