import React from 'react';
import { 
  Users, 
  FileText, 
  CheckCircle, 
  DollarSign,
  ArrowUpRight,
  RefreshCw
} from 'lucide-react';
import Button from '../../../ui/Button';
import OverviewStats from '../../shared/OverviewStats';
import { User } from '../../../types';

interface DashboardSectionProps {
  user: User;
  onRefreshData: () => void;
  onViewDetails: (type: string) => void;
}

const DashboardSection: React.FC<DashboardSectionProps> = ({
  user,
  onRefreshData,
  onViewDetails
}) => {
  // Mock data - replace with real data from props or API
  const metrics = {
    totalRequests: 156,
    completedRequests: 98,
    pendingRequests: 45,
    rejectedRequests: 13,
    activeUsers: 24,
    totalRevenue: 125000,
    monthlyGrowth: 12.5,
    systemUptime: 99.2
  };

  // Removed: activities, system status, and top products data/logic

  return (
    <div className="space-y-8">
      {/* Overview Stats - Welcome Message and Key Metrics */}
      <OverviewStats user={user} />

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold text-slate-900">Dashboard Overview</h3>
          <p className="text-slate-600 mt-1">Real-time insights and key performance indicators</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 bg-green-50 px-4 py-2 rounded-lg border border-green-200">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-green-700">Live Data</span>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onRefreshData}
            className="border-blue-300 text-blue-600 hover:bg-blue-50"
          >
            <RefreshCw size={16} className="mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Requests */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-lg transition-all duration-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-xl">
              <FileText size={24} className="text-blue-600" />
            </div>
            <div className="flex items-center space-x-1 text-green-600">
              <ArrowUpRight size={16} />
              <span className="text-sm font-medium">+8.2%</span>
            </div>
          </div>
          <div className="text-3xl font-bold text-slate-900 mb-1">{metrics.totalRequests}</div>
          <p className="text-sm font-medium text-slate-600">Total Requests</p>
          <p className="text-xs text-slate-500 mt-1">+12 from last week</p>
        </div>

        {/* Completed Requests */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-lg transition-all duration-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-xl">
              <CheckCircle size={24} className="text-green-600" />
            </div>
            <div className="flex items-center space-x-1 text-green-600">
              <ArrowUpRight size={16} />
              <span className="text-sm font-medium">+15.3%</span>
            </div>
          </div>
          <div className="text-3xl font-bold text-slate-900 mb-1">{metrics.completedRequests}</div>
          <p className="text-sm font-medium text-slate-600">Completed</p>
          <p className="text-xs text-slate-500 mt-1">62.8% completion rate</p>
        </div>

        {/* Active Users */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-lg transition-all duration-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-100 rounded-xl">
              <Users size={24} className="text-purple-600" />
            </div>
            <div className="flex items-center space-x-1 text-green-600">
              <ArrowUpRight size={16} />
              <span className="text-sm font-medium">+3</span>
            </div>
          </div>
          <div className="text-3xl font-bold text-slate-900 mb-1">{metrics.activeUsers}</div>
          <p className="text-sm font-medium text-slate-600">Active Users</p>
          <p className="text-xs text-slate-500 mt-1">Online now</p>
        </div>

        {/* Revenue */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-lg transition-all duration-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-emerald-100 rounded-xl">
              <DollarSign size={24} className="text-emerald-600" />
            </div>
            <div className="flex items-center space-x-1 text-green-600">
              <ArrowUpRight size={16} />
              <span className="text-sm font-medium">+{metrics.monthlyGrowth}%</span>
            </div>
          </div>
          <div className="text-3xl font-bold text-slate-900 mb-1">${metrics.totalRevenue.toLocaleString()}</div>
          <p className="text-sm font-medium text-slate-600">Total Revenue</p>
          <p className="text-xs text-slate-500 mt-1">This month</p>
        </div>
      </div>

      {/* Removed: Recent Activities, System Status, Top Products Performance, and Quick Stats */}
    </div>
  );
};

export default DashboardSection;
