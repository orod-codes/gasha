import React, { useState, useEffect } from 'react';
import { 
  Users, 
  FileText, 
  CheckCircle, 
  Coins,
  ArrowUpRight,
  RefreshCw,
  TrendingUp,
  Activity,
  Zap,
  Shield,
  Clock,
  AlertTriangle,
  XCircle
} from 'lucide-react';
import Button from '../../../ui/Button';
import OverviewStats from '../../shared/OverviewStats';
import { User } from '../../../../types';

interface DashboardSectionProps {
  user: User;
  onRefreshData: () => void;
}

const DashboardSection: React.FC<DashboardSectionProps> = ({
  user,
  onRefreshData
}) => {
  // Real-time state management
  const [isLive, setIsLive] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [systemAlerts] = useState([
    { id: 1, type: 'warning', message: 'High CPU usage detected', timestamp: new Date() },
    { id: 2, type: 'info', message: 'Scheduled maintenance in 2 hours', timestamp: new Date() }
  ]);

  // Enhanced metrics with real-time updates
  const [metrics, setMetrics] = useState({
    totalRequests: 156,
    completedRequests: 98,
    pendingRequests: 45,
    rejectedRequests: 13,
    activeUsers: 24,
    totalRevenue: 125000,
    monthlyGrowth: 12.5,
    systemUptime: 99.2,
    responseTime: 245,
    errorRate: 0.3,
    securityScore: 95
  });

  // Real-time data simulation
  useEffect(() => {
    const interval = setInterval(() => {
      if (isLive) {
        setMetrics(prev => ({
          ...prev,
          activeUsers: prev.activeUsers + Math.floor(Math.random() * 3) - 1,
          responseTime: prev.responseTime + Math.floor(Math.random() * 20) - 10,
          systemUptime: Math.max(95, prev.systemUptime + (Math.random() * 0.2) - 0.1)
        }));
        setLastUpdated(new Date());
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isLive]);

  // Performance trends data
  const performanceTrends = [
    { period: '00:00', requests: 45, users: 12 },
    { period: '04:00', requests: 32, users: 8 },
    { period: '08:00', requests: 89, users: 24 },
    { period: '12:00', requests: 156, users: 35 },
    { period: '16:00', requests: 134, users: 28 },
    { period: '20:00', requests: 98, users: 22 }
  ];

  // System health indicators
  const systemHealth = [
    { name: 'API Response', status: 'healthy', value: '245ms', color: 'green' },
    { name: 'Database', status: 'healthy', value: '12ms', color: 'green' },
    { name: 'Cache', status: 'warning', value: '89%', color: 'yellow' },
    { name: 'Storage', status: 'healthy', value: '67%', color: 'green' }
  ];

  return (
    <div className="space-y-8">
      {/* Overview Stats - Welcome Message and Key Metrics */}
      <OverviewStats user={user} />

      {/* Enhanced Header with Real-time Controls */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold text-slate-900">Dashboard Overview</h3>
          <p className="text-slate-600 mt-1">Real-time insights and key performance indicators</p>
          <div className="flex items-center space-x-4 mt-2">
            <div className="flex items-center space-x-2 text-sm text-slate-500">
              <Clock size={14} />
              <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsLive(!isLive)}
                className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium transition-all ${
                  isLive 
                    ? 'bg-green-100 text-green-700 border border-green-200' 
                    : 'bg-gray-100 text-gray-600 border border-gray-200'
                }`}
              >
                <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
                <span>{isLive ? 'Live' : 'Paused'}</span>
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-2 rounded-lg border border-green-200">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-green-700">Live Data</span>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onRefreshData}
            className="border-blue-300 text-blue-600 hover:bg-blue-50 transition-all duration-200"
          >
            <RefreshCw size={16} className="mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* System Alerts */}
 

      {/* Enhanced Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Requests */}
        <div className="bg-gradient-to-br from-white to-blue-50 rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-xl transition-all duration-300 group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-br from-white-100 to-blue-200 rounded-xl group-hover:scale-110 transition-transform duration-200">
              <FileText size={24} className="text-blue-600" />
            </div>
            <div className="flex items-center space-x-1 text-green-600">
              <ArrowUpRight size={16} />
              <span className="text-sm font-medium">+8.2%</span>
            </div>
          </div>
          <div className="text-3xl font-bold text-slate-900 mb-1">{metrics.totalRequests}</div>
          <p className="text-sm font-medium text-slate-600">Total Requests</p>
          <div className="mt-2 flex items-center space-x-2">
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{width: '75%'}}></div>
            </div>
            <span className="text-xs text-slate-500">75%</span>
          </div>
        </div>

        {/* Completed Requests */}
        <div className="bg-gradient-to-br from-white to-green-50 rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-xl transition-all duration-300 group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-br from-white-100 to-green-200 rounded-xl group-hover:scale-110 transition-transform duration-200">
              <CheckCircle size={24} className="text-green-600" />
            </div>
            <div className="flex items-center space-x-1 text-green-600">
              <ArrowUpRight size={16} />
              <span className="text-sm font-medium">+15.3%</span>
            </div>
          </div>
          <div className="text-3xl font-bold text-slate-900 mb-1">{metrics.completedRequests}</div>
          <p className="text-sm font-medium text-slate-600">Completed</p>
          <div className="mt-2 flex items-center space-x-2">
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{width: '63%'}}></div>
            </div>
            <span className="text-xs text-slate-500">63%</span>
          </div>
        </div>

        {/* Active Users */}
        <div className="bg-gradient-to-br from-white to-purple-50 rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-xl transition-all duration-300 group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-br from-white-100 to-purple-200 rounded-xl group-hover:scale-110 transition-transform duration-200">
              <Users size={24} className="text-purple-600" />
            </div>
            <div className="flex items-center space-x-1 text-green-600">
              <ArrowUpRight size={16} />
              <span className="text-sm font-medium">+3</span>
            </div>
          </div>
          <div className="text-3xl font-bold text-slate-900 mb-1">{metrics.activeUsers}</div>
          <p className="text-sm font-medium text-slate-600">Active Users</p>
          <div className="mt-2 flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-slate-500">Online now</span>
          </div>
        </div>

        {/* Revenue */}
        <div className="bg-gradient-to-br from-white to-emerald-50 rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-xl transition-all duration-300 group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-br from-white-100 to-emerald-200 rounded-xl group-hover:scale-110 transition-transform duration-200">
              <Coins size={24} className="text-emerald-600" />
            </div>
            <div className="flex items-center space-x-1 text-green-600">
              <ArrowUpRight size={16} />
              <span className="text-sm font-medium">+{metrics.monthlyGrowth}%</span>
            </div>
          </div>
          <div className="text-3xl font-bold text-slate-900 mb-1">${metrics.totalRevenue.toLocaleString()}</div>
          <p className="text-sm font-medium text-slate-600">Total Revenue</p>
          <div className="mt-2 flex items-center space-x-2">
            <TrendingUp size={14} className="text-emerald-600" />
            <span className="text-xs text-slate-500">This month</span>
          </div>
        </div>
      </div>

      {/* Additional Performance Metrics */}

      {/* Performance Trends Chart */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h4 className="text-lg font-semibold text-slate-900">Performance Trends</h4>
            <p className="text-sm text-slate-600">Real-time activity over the last 24 hours</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-slate-600">Requests</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="text-sm text-slate-600">Users</span>
            </div>
          </div>
        </div>
        <div className="h-64 flex items-end space-x-4">
          {performanceTrends.map((trend, index) => (
            <div key={index} className="flex-1 flex flex-col items-center space-y-2">
              <div className="w-full flex flex-col space-y-1">
                <div 
                  className="bg-blue-500 rounded-t"
                  style={{height: `${(trend.requests / 156) * 200}px`}}
                ></div>
                <div 
                  className="bg-purple-500 rounded-b"
                  style={{height: `${(trend.users / 35) * 100}px`}}
                ></div>
              </div>
              <span className="text-xs text-slate-500">{trend.period}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardSection;
