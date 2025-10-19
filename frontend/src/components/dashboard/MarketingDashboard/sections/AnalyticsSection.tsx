import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Users,
  Mail,
  MousePointer,
  DollarSign,
  Calendar,
  Download,
  Filter,
  RefreshCw
} from 'lucide-react';
import Card from '../../../ui/Card';
import Button from '../../../ui/Button';

interface AnalyticsData {
  period: string;
  leads: number;
  conversions: number;
  revenue: number;
  emailSent: number;
  emailOpened: number;
  emailClicked: number;
  websiteVisits: number;
  costPerLead: number;
  costPerConversion: number;
}

const AnalyticsSection: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('leads');

  const analyticsData: AnalyticsData[] = [
    {
      period: '2024-01-16',
      leads: 45,
      conversions: 8,
      revenue: 12000,
      emailSent: 2500,
      emailOpened: 1875,
      emailClicked: 450,
      websiteVisits: 1250,
      costPerLead: 25.50,
      costPerConversion: 143.75
    },
    {
      period: '2024-01-15',
      leads: 38,
      conversions: 6,
      revenue: 9000,
      emailSent: 2200,
      emailOpened: 1650,
      emailClicked: 330,
      websiteVisits: 1100,
      costPerLead: 28.20,
      costPerConversion: 178.33
    },
    {
      period: '2024-01-14',
      leads: 52,
      conversions: 12,
      revenue: 18000,
      emailSent: 2800,
      emailOpened: 2100,
      emailClicked: 560,
      websiteVisits: 1400,
      costPerLead: 22.80,
      costPerConversion: 98.75
    },
    {
      period: '2024-01-13',
      leads: 41,
      conversions: 7,
      revenue: 10500,
      emailSent: 2400,
      emailOpened: 1800,
      emailClicked: 360,
      websiteVisits: 1200,
      costPerLead: 26.10,
      costPerConversion: 152.14
    },
    {
      period: '2024-01-12',
      leads: 48,
      conversions: 9,
      revenue: 13500,
      emailSent: 2600,
      emailOpened: 1950,
      emailClicked: 390,
      websiteVisits: 1300,
      costPerLead: 24.30,
      costPerConversion: 129.17
    }
  ];

  const calculateGrowth = (current: number, previous: number) => {
    if (previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  };

  const getTotalStats = () => {
    const totals = analyticsData.reduce((acc, data) => ({
      leads: acc.leads + data.leads,
      conversions: acc.conversions + data.conversions,
      revenue: acc.revenue + data.revenue,
      emailSent: acc.emailSent + data.emailSent,
      emailOpened: acc.emailOpened + data.emailOpened,
      emailClicked: acc.emailClicked + data.emailClicked,
      websiteVisits: acc.websiteVisits + data.websiteVisits,
      costPerLead: acc.costPerLead + data.costPerLead,
      costPerConversion: acc.costPerConversion + data.costPerConversion
    }), {
      leads: 0,
      conversions: 0,
      revenue: 0,
      emailSent: 0,
      emailOpened: 0,
      emailClicked: 0,
      websiteVisits: 0,
      costPerLead: 0,
      costPerConversion: 0
    });

    return {
      ...totals,
      costPerLead: totals.costPerLead / analyticsData.length,
      costPerConversion: totals.costPerConversion / analyticsData.length,
      conversionRate: (totals.conversions / totals.leads) * 100,
      emailOpenRate: (totals.emailOpened / totals.emailSent) * 100,
      emailClickRate: (totals.emailClicked / totals.emailSent) * 100
    };
  };

  const stats = getTotalStats();

  const getGrowthIcon = (growth: number) => {
    return growth >= 0 ? <TrendingUp size={16} className="text-green-600" /> : <TrendingDown size={16} className="text-red-600" />;
  };

  const getGrowthColor = (growth: number) => {
    return growth >= 0 ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-xl font-semibold text-slate-900">Marketing Analytics</h3>
          <p className="text-slate-600">Track your marketing performance and ROI</p>
        </div>
        <div className="flex gap-2">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <Button variant="outline">
            <Download size={16} className="mr-2" />
            Export
          </Button>
          <Button variant="outline">
            <RefreshCw size={16} className="mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Leads</p>
              <p className="text-2xl font-bold text-slate-900">{stats.leads}</p>
              <div className="flex items-center mt-1">
                {getGrowthIcon(12.5)}
                <span className={`text-sm ml-1 ${getGrowthColor(12.5)}`}>+12.5%</span>
              </div>
            </div>
            <Users className="h-8 w-8 text-blue-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Conversions</p>
              <p className="text-2xl font-bold text-slate-900">{stats.conversions}</p>
              <div className="flex items-center mt-1">
                {getGrowthIcon(8.3)}
                <span className={`text-sm ml-1 ${getGrowthColor(8.3)}`}>+8.3%</span>
              </div>
            </div>
            <TrendingUp className="h-8 w-8 text-green-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Revenue</p>
              <p className="text-2xl font-bold text-slate-900">{stats.revenue.toLocaleString()} birr</p>
              <div className="flex items-center mt-1">
                {getGrowthIcon(15.2)}
                <span className={`text-sm ml-1 ${getGrowthColor(15.2)}`}>+15.2%</span>
              </div>
            </div>
            <DollarSign className="h-8 w-8 text-green-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Conversion Rate</p>
              <p className="text-2xl font-bold text-slate-900">{stats.conversionRate.toFixed(1)}%</p>
              <div className="flex items-center mt-1">
                {getGrowthIcon(-2.1)}
                <span className={`text-sm ml-1 ${getGrowthColor(-2.1)}`}>-2.1%</span>
              </div>
            </div>
            <BarChart3 className="h-8 w-8 text-purple-600" />
          </div>
        </Card>
      </div>

      {/* Email Performance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Email Open Rate</p>
              <p className="text-2xl font-bold text-blue-600">{stats.emailOpenRate.toFixed(1)}%</p>
              <div className="flex items-center mt-1">
                {getGrowthIcon(3.2)}
                <span className={`text-sm ml-1 ${getGrowthColor(3.2)}`}>+3.2%</span>
              </div>
            </div>
            <Mail className="h-8 w-8 text-blue-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Email Click Rate</p>
              <p className="text-2xl font-bold text-green-600">{stats.emailClickRate.toFixed(1)}%</p>
              <div className="flex items-center mt-1">
                {getGrowthIcon(1.8)}
                <span className={`text-sm ml-1 ${getGrowthColor(1.8)}`}>+1.8%</span>
              </div>
            </div>
            <MousePointer className="h-8 w-8 text-green-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Website Visits</p>
              <p className="text-2xl font-bold text-purple-600">{stats.websiteVisits.toLocaleString()}</p>
              <div className="flex items-center mt-1">
                {getGrowthIcon(7.5)}
                <span className={`text-sm ml-1 ${getGrowthColor(7.5)}`}>+7.5%</span>
              </div>
            </div>
            <BarChart3 className="h-8 w-8 text-purple-600" />
          </div>
        </Card>
      </div>

      {/* Cost Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Cost Per Lead</p>
              <p className="text-2xl font-bold text-orange-600">{stats.costPerLead.toFixed(2)} birr</p>
              <div className="flex items-center mt-1">
                {getGrowthIcon(-5.2)}
                <span className={`text-sm ml-1 ${getGrowthColor(-5.2)}`}>-5.2%</span>
              </div>
            </div>
            <DollarSign className="h-8 w-8 text-orange-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Cost Per Conversion</p>
              <p className="text-2xl font-bold text-red-600">{stats.costPerConversion.toFixed(2)} birr</p>
              <div className="flex items-center mt-1">
                {getGrowthIcon(-8.7)}
                <span className={`text-sm ml-1 ${getGrowthColor(-8.7)}`}>-8.7%</span>
              </div>
            </div>
            <TrendingDown className="h-8 w-8 text-red-600" />
          </div>
        </Card>
      </div>

      {/* Recent Performance Table */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold text-slate-900">Daily Performance</h4>
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            className="px-3 py-1 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="leads">Leads</option>
            <option value="conversions">Conversions</option>
            <option value="revenue">Revenue</option>
            <option value="emailOpened">Email Opens</option>
          </select>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 font-medium text-slate-600">Date</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600">Leads</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600">Conversions</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600">Revenue</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600">Email Opens</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600">Website Visits</th>
                <th className="text-left py-3 px-4 font-medium text-slate-600">Cost/Lead</th>
              </tr>
            </thead>
            <tbody>
              {analyticsData.map((data, index) => (
                <tr key={index} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-3 px-4 text-sm text-slate-900">{data.period}</td>
                  <td className="py-3 px-4 text-sm text-slate-900">{data.leads}</td>
                  <td className="py-3 px-4 text-sm text-slate-900">{data.conversions}</td>
                  <td className="py-3 px-4 text-sm text-slate-900">{data.revenue.toLocaleString()} birr</td>
                  <td className="py-3 px-4 text-sm text-slate-900">{data.emailOpened}</td>
                  <td className="py-3 px-4 text-sm text-slate-900">{data.websiteVisits}</td>
                  <td className="py-3 px-4 text-sm text-slate-900">{data.costPerLead.toFixed(2)} birr</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* ROI Summary */}
      <Card className="p-6">
        <h4 className="text-lg font-semibold text-slate-900 mb-4">ROI Summary</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">4.2x</div>
            <p className="text-sm text-slate-600">Return on Investment</p>
            <p className="text-xs text-slate-500 mt-1">Revenue / Marketing Spend</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">18.4%</div>
            <p className="text-sm text-slate-600">Conversion Rate</p>
            <p className="text-xs text-slate-500 mt-1">Leads to Customers</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">1,250 birr</div>
            <p className="text-sm text-slate-600">Average Deal Size</p>
            <p className="text-xs text-slate-500 mt-1">Revenue per Conversion</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AnalyticsSection;





