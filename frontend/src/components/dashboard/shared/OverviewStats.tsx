import React from 'react';
import { Clock, TrendingUp, Users, DollarSign, Activity, Shield, Database, Server, Target, CheckCircle } from 'lucide-react';
import Card from '../../ui/Card';
import { User } from '../../../types';

interface OverviewStatsProps {
  user: User;
  stats?: {
    totalRequests: number;
    activeUsers: number;
    systemHealth: number;
    revenue: string;
  };
}

const OverviewStats: React.FC<OverviewStatsProps> = ({ 
  user, 
  stats = {
    totalRequests: 68,
    activeUsers: 24,
    systemHealth: 98,
    revenue: '$12.4K'
  }
}) => {
  return (
    <div className="mb-8">
      {/* Header removed as requested */}
      
      {/* Professional Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Requests Card */}
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-500 rounded-xl shadow-lg">
              <Target className="h-6 w-6 text-white" />
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-blue-700 uppercase tracking-wide">Total Requests</p>
              <p className="text-3xl font-bold text-slate-900 mt-1">{stats.totalRequests}</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="text-green-600 font-bold text-sm">+12%</span>
            </div>
            <span className="text-slate-600 text-sm">from last month</span>
          </div>
        </Card>

        {/* Active Users Card */}
        <Card className="p-6 bg-gradient-to-br from-emerald-50 to-emerald-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-emerald-500 rounded-xl shadow-lg">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-emerald-700 uppercase tracking-wide">Active Users</p>
              <p className="text-3xl font-bold text-slate-900 mt-1">{stats.activeUsers}</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="text-green-600 font-bold text-sm">+8%</span>
            </div>
            <span className="text-slate-600 text-sm">from last week</span>
          </div>
        </Card>

        {/* System Health Card */}
        <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-500 rounded-xl shadow-lg">
              <Activity className="h-6 w-6 text-white" />
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-purple-700 uppercase tracking-wide">System Health</p>
              <p className="text-3xl font-bold text-slate-900 mt-1">{stats.systemHealth}%</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-green-600 font-bold text-sm">Operational</span>
            </div>
            <span className="text-slate-600 text-sm">All systems</span>
          </div>
        </Card>

        {/* Revenue Card */}
        <Card className="p-6 bg-gradient-to-br from-amber-50 to-amber-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-amber-500 rounded-xl shadow-lg">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-amber-700 uppercase tracking-wide">Revenue</p>
              <p className="text-3xl font-bold text-slate-900 mt-1">{stats.revenue}</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="text-green-600 font-bold text-sm">+15%</span>
            </div>
            <span className="text-slate-600 text-sm">from last month</span>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default OverviewStats;
