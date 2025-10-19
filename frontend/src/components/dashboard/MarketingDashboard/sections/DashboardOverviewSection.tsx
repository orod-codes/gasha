import React, { useState } from 'react';
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
  
  const stats = {
    totalLeads: 1247,
    activeCampaigns: 8,
    scheduledContent: 12,
    pendingApprovals: 5,
    conversionRate: 12.5,
    revenue: 125000, // This will be displayed in Birr
    emailOpenRate: 24.8,
    socialEngagement: 8.2,
    websiteVisitors: 15420,
    bounceRate: 35.2,
    avgSessionDuration: 3.5,
    costPerLead: 45.5
  };

  // Chart data for revenue trend
  const revenueData = [
    { month: 'Jan', revenue: 85000, leads: 890 },
    { month: 'Feb', revenue: 95000, leads: 1020 },
    { month: 'Mar', revenue: 110000, leads: 1150 },
    { month: 'Apr', revenue: 125000, leads: 1247 },
  ];

  // Channel performance data
  const channelData = [
    { channel: 'Social Media', leads: 450, revenue: 45000, color: 'bg-blue-500' },
    { channel: 'Email Marketing', leads: 380, revenue: 38000, color: 'bg-green-500' },
    { channel: 'Google Ads', leads: 280, revenue: 28000, color: 'bg-purple-500' },
    { channel: 'Content Marketing', leads: 137, revenue: 14000, color: 'bg-orange-500' },
  ];

  // Device analytics
  const deviceData = [
    { device: 'Mobile', percentage: 65, visitors: 10023 },
    { device: 'Desktop', percentage: 30, visitors: 4626 },
    { device: 'Tablet', percentage: 5, visitors: 771 },
  ];

  // Conversion funnel data
  const funnelData = [
    { stage: 'Visitors', count: 15420, percentage: 100 },
    { stage: 'Leads', count: 1247, percentage: 8.1 },
    { stage: 'Qualified', count: 498, percentage: 3.2 },
    { stage: 'Customers', count: 149, percentage: 1.0 },
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'campaign',
      title: 'Q1 Product Launch Campaign',
      status: 'published',
      time: '2 hours ago',
      icon: Megaphone
    },
    {
      id: 2,
      type: 'lead',
      title: 'New lead from LinkedIn',
      status: 'qualified',
      time: '4 hours ago',
      icon: Users
    },
    {
      id: 3,
      type: 'approval',
      title: 'Email template approved',
      status: 'approved',
      time: '6 hours ago',
      icon: CheckCircle
    },
    {
      id: 4,
      type: 'content',
      title: 'Blog post scheduled',
      status: 'scheduled',
      time: '1 day ago',
      icon: Calendar
    }
  ];

  const upcomingTasks = [
    {
      id: 1,
      title: 'Review Q1 campaign performance',
      dueDate: 'Today',
      priority: 'high',
      type: 'analytics'
    },
    {
      id: 2,
      title: 'Approve social media posts',
      dueDate: 'Tomorrow',
      priority: 'medium',
      type: 'approval'
    },
    {
      id: 3,
      title: 'Update customer segments',
      dueDate: 'This week',
      priority: 'low',
      type: 'segmentation'
    },
    {
      id: 4,
      title: 'Schedule February content',
      dueDate: 'Next week',
      priority: 'medium',
      type: 'calendar'
    }
  ];

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

        {/* Channel Performance Chart */}
        
      </div>

     
    </div>
  );
};

export default DashboardOverviewSection;
