import React, { useState, useEffect } from 'react';
import { 
  TrendingUp,
  Users,
  Megaphone,
  Calendar,
  Target,
  CheckCircle,
  BarChart3,
  FileText,
  Mail,
  Share2,
  Settings,
  Eye,
  Clock,
  DollarSign,
  Activity,
  PieChart,
  LineChart,
  ArrowUp,
  ArrowDown,
  Zap,
  Globe,
  Smartphone,
  Monitor
} from 'lucide-react';
import Card from '../../../ui/Card';
import Button from '../../../ui/Button';

const DashboardOverviewSection: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [stats, setStats] = useState({
    totalLeads: 0,
    activeCampaigns: 0,
    scheduledContent: 0,
    pendingApprovals: 0,
    conversionRate: 0,
    revenue: 0,
    emailOpenRate: 0,
    socialEngagement: 0,
    websiteVisitors: 0,
    bounceRate: 0,
    avgSessionDuration: 0,
    costPerLead: 0
  });

  const [revenueData, setRevenueData] = useState([]);

  const [channelData, setChannelData] = useState([]);

  const [deviceData, setDeviceData] = useState([]);

  const [funnelData, setFunnelData] = useState([]);

  const [recentActivities, setRecentActivities] = useState([]);

  const [upcomingTasks, setUpcomingTasks] = useState([]);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // TODO: Replace with real API calls
        // const statsResponse = await getMarketingStats();
        // const revenueResponse = await getRevenueData();
        // const channelResponse = await getChannelData();
        // const deviceResponse = await getDeviceData();
        // const funnelResponse = await getFunnelData();
        // const activitiesResponse = await getRecentActivities();
        // const tasksResponse = await getUpcomingTasks();
        
        // For now, set empty data
        setStats({
          totalLeads: 0,
          activeCampaigns: 0,
          scheduledContent: 0,
          pendingApprovals: 0,
          conversionRate: 0,
          revenue: 0,
          emailOpenRate: 0,
          socialEngagement: 0,
          websiteVisitors: 0,
          bounceRate: 0,
          avgSessionDuration: 0,
          costPerLead: 0
        });
        setRevenueData([]);
        setChannelData([]);
        setDeviceData([]);
        setFunnelData([]);
        setRecentActivities([]);
        setUpcomingTasks([]);
        
      } catch (err) {
        console.error('Error fetching marketing dashboard data:', err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedPeriod]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'campaign': return <Megaphone size={16} />;
      case 'lead': return <Users size={16} />;
      case 'approval': return <CheckCircle size={16} />;
      case 'content': return <Calendar size={16} />;
      case 'analytics': return <BarChart3 size={16} />;
      case 'segmentation': return <Target size={16} />;
      default: return <FileText size={16} />;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('et-ET', {
      style: 'currency',
      currency: 'ETB',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getDeviceIcon = (device: string) => {
    switch (device) {
      case 'Mobile': return <Smartphone size={16} />;
      case 'Desktop': return <Monitor size={16} />;
      case 'Tablet': return <Monitor size={16} />;
      default: return <Globe size={16} />;
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-slate-600">Loading dashboard data...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="text-center py-8">
          <div className="text-red-600 mb-4">⚠️</div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Error Loading Dashboard</h3>
          <p className="text-slate-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">Welcome to Marketing Command Center</h2>
            <p className="text-blue-100">Monitor your marketing performance and manage campaigns from one place</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-2 bg-white/20 rounded-lg">
              <TrendingUp size={16} />
              <span className="text-sm font-medium">+12.5% this month</span>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Conversion Rate</p>
              <p className="text-2xl font-bold text-green-600">{stats.conversionRate}%</p>
              <p className="text-sm text-green-600">+2.1% from last month</p>
            </div>
            <Target className="h-8 w-8 text-green-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Revenue</p>
              <p className="text-2xl font-bold text-orange-600">{formatCurrency(stats.revenue)}</p>
              <p className="text-sm text-green-600">+15.3% from last month</p>
            </div>
            <div className="h-8 w-8 bg-orange-100 rounded-full flex items-center justify-center">
              <span className="text-orange-600 font-bold text-sm">ETB</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend Chart */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-800">Revenue Trend</h3>
            <div className="flex items-center gap-2">
              <LineChart size={20} className="text-blue-600" />
              <span className="text-sm text-slate-600">Last 4 months</span>
            </div>
          </div>
          <div className="h-64 flex items-end justify-between gap-2">
            {revenueData.map((data, index) => {
              const maxRevenue = Math.max(...revenueData.map(d => d.revenue));
              const height = (data.revenue / maxRevenue) * 200;
              return (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div className="w-full bg-blue-100 rounded-t-lg relative group">
                    <div 
                      className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all duration-300 hover:from-blue-600 hover:to-blue-500"
                      style={{ height: `${height}px` }}
                    >
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        {formatCurrency(data.revenue)}
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 text-center">
                    <p className="text-sm font-medium text-slate-700">{data.month}</p>
                    <p className="text-xs text-slate-500">{data.leads} leads</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

      </div>


      {/* Recent Activities and Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-800">Recent Activities</h3>
            <Activity className="h-5 w-5 text-slate-500" />
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => {
              const IconComponent = activity.icon;
              return (
                <div key={activity.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <IconComponent size={16} className="text-slate-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm text-slate-800">{activity.title}</p>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span className={`px-2 py-1 rounded-full ${
                        activity.status === 'published' ? 'bg-green-100 text-green-700' :
                        activity.status === 'qualified' ? 'bg-blue-100 text-blue-700' :
                        activity.status === 'approved' ? 'bg-green-100 text-green-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {activity.status}
                      </span>
                      <span>{activity.time}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Upcoming Tasks */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-800">Upcoming Tasks</h3>
            <Calendar className="h-5 w-5 text-slate-500" />
          </div>
          <div className="space-y-4">
            {upcomingTasks.map((task) => (
              <div key={task.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  {getTypeIcon(task.type)}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm text-slate-800">{task.title}</p>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className={`px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                    <span>{task.dueDate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

    </div>
  );
};

export default DashboardOverviewSection;
