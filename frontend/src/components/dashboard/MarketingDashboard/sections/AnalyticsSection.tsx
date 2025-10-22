import React, { useState, useEffect } from 'react';
import { 
  Download,
  RefreshCw,
  BarChart3, 
  Users,
  DollarSign,
  Activity,
  Target,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import Card from '../../../ui/Card';
import Button from '../../../ui/Button';

interface AnalyticsData {
  period: string;
  leads: number;
  conversions: number;
  revenue: number;
  emailOpened: number;
  websiteVisits: number;
}

const AnalyticsSection: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('leads');
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch analytics data on component mount
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // TODO: Replace with real API call
        // const response = await getAnalyticsData(selectedPeriod);
        // setAnalyticsData(response.data);
        
        // For now, set empty array
        setAnalyticsData([]);
        
      } catch (err) {
        console.error('Error fetching analytics data:', err);
        setError('Failed to load analytics data');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [selectedPeriod]);

  const getTotalStats = () => {
    const totals = analyticsData.reduce((acc, data) => ({
      leads: acc.leads + data.leads,
      conversions: acc.conversions + data.conversions,
      revenue: acc.revenue + data.revenue,
      emailOpened: acc.emailOpened + data.emailOpened,
      websiteVisits: acc.websiteVisits + data.websiteVisits
    }), {
      leads: 0,
      conversions: 0,
      revenue: 0,
      emailOpened: 0,
      websiteVisits: 0
    });

    return {
      ...totals,
      conversionRate: (totals.conversions / totals.leads) * 100
    };
  };

  const stats = getTotalStats();

  const getGrowthIcon = (growth: number) => {
    return growth >= 0 ? <ArrowUp size={16} className="text-green-600" /> : <ArrowDown size={16} className="text-red-600" />;
  };

  const getGrowthColor = (growth: number) => {
    return growth >= 0 ? 'text-green-600' : 'text-red-600';
  };

  const handleExport = () => {
    // Create CSV data
    const csvData = analyticsData.map(data => ({
      Date: data.period,
      Leads: data.leads,
      Conversions: data.conversions,
      Revenue: data.revenue,
      'Email Opens': data.emailOpened,
      'Website Visits': data.websiteVisits
    }));

    // Convert to CSV string
    const headers = Object.keys(csvData[0]);
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => headers.map(header => row[header as keyof typeof row]).join(','))
    ].join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `marketing-analytics-${selectedPeriod}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleRefresh = () => {
    // Simulate data refresh
    window.location.reload();
  };

  const handlePeriodChange = (period: string) => {
    setSelectedPeriod(period);
    // Here you would typically fetch new data based on the selected period
    console.log(`Period changed to: ${period}`);
  };

  const handleMetricChange = (metric: string) => {
    setSelectedMetric(metric);
    console.log(`Metric changed to: ${metric}`);
  };

  const handleViewDetails = () => {
    // Here you would typically open a detailed view or modal
    console.log(`Viewing details for ${selectedMetric} in ${selectedPeriod}`);
    alert(`Viewing detailed analytics for ${selectedMetric} in ${selectedPeriod}`);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-slate-600">Loading analytics data...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="text-center py-8">
          <div className="text-red-600 mb-4">⚠️</div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Error Loading Analytics</h3>
          <p className="text-slate-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

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
            onChange={(e) => handlePeriodChange(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <Button variant="outline" onClick={handleExport}>
            <Download size={16} className="mr-2" />
            Export
          </Button>
          <Button variant="outline" onClick={handleRefresh}>
            <RefreshCw size={16} className="mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Leads</p>
              <p className="text-3xl font-bold text-slate-900">{stats.leads}</p>
              <div className="flex items-center mt-2">
                {getGrowthIcon(12.5)}
                <span className={`text-sm ml-1 ${getGrowthColor(12.5)}`}>+12.5%</span>
              </div>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Conversions</p>
              <p className="text-3xl font-bold text-slate-900">{stats.conversions}</p>
              <div className="flex items-center mt-2">
                {getGrowthIcon(8.3)}
                <span className={`text-sm ml-1 ${getGrowthColor(8.3)}`}>+8.3%</span>
              </div>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Target className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Revenue</p>
              <p className="text-3xl font-bold text-slate-900">ETB {stats.revenue.toLocaleString()}</p>
              <div className="flex items-center mt-2">
                {getGrowthIcon(15.2)}
                <span className={`text-sm ml-1 ${getGrowthColor(15.2)}`}>+15.2%</span>
              </div>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Conversion Rate</p>
              <p className="text-3xl font-bold text-slate-900">{stats.conversionRate.toFixed(1)}%</p>
              <div className="flex items-center mt-2">
                {getGrowthIcon(-2.1)}
                <span className={`text-sm ml-1 ${getGrowthColor(-2.1)}`}>-2.1%</span>
              </div>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <BarChart3 className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </Card>
      </div>


      {/* Recent Performance Table */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-lg font-semibold text-slate-900">Daily Performance</h4>
          <div className="flex items-center space-x-3">
          <select
            value={selectedMetric}
            onChange={(e) => handleMetricChange(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="leads">Leads</option>
            <option value="conversions">Conversions</option>
            <option value="revenue">Revenue</option>
            <option value="emailOpened">Email Opens</option>
          </select>
            <Button variant="outline" size="sm" onClick={handleViewDetails}>
              <Activity size={16} className="mr-2" />
              View Details
            </Button>
          </div>
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
              </tr>
            </thead>
            <tbody>
              {analyticsData.map((data, index) => (
                <tr key={index} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-3 px-4 text-sm text-slate-900">{data.period}</td>
                  <td className="py-3 px-4 text-sm text-slate-900">{data.leads}</td>
                  <td className="py-3 px-4 text-sm text-slate-900">{data.conversions}</td>
                  <td className="py-3 px-4 text-sm text-slate-900">ETB {data.revenue.toLocaleString()}</td>
                  <td className="py-3 px-4 text-sm text-slate-900">{data.emailOpened}</td>
                  <td className="py-3 px-4 text-sm text-slate-900">{data.websiteVisits}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Visual Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h4 className="text-lg font-semibold text-slate-900 mb-4">Revenue Trend</h4>
          <div className="space-y-4">
            {analyticsData.slice(0, 5).map((data, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-slate-600">{data.period}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-slate-900">ETB {data.revenue.toLocaleString()}</span>
                  <div className="w-20 bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${(data.revenue / Math.max(...analyticsData.map(d => d.revenue))) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h4 className="text-lg font-semibold text-slate-900 mb-4">Channel Performance</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-slate-600">Email Marketing</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-slate-900">{stats.emailOpened}</span>
                <div className="w-20 bg-slate-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-slate-600">Website Traffic</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-slate-900">{stats.websiteVisits}</span>
                <div className="w-20 bg-slate-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="text-sm text-slate-600">Social Media</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-slate-900">2,340</span>
                <div className="w-20 bg-slate-200 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className="text-sm text-slate-600">Direct Traffic</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-slate-900">1,890</span>
                <div className="w-20 bg-slate-200 rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full" style={{ width: '35%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Performance Summary */}
      <Card className="p-6">
        <h4 className="text-lg font-semibold text-slate-900 mb-6">Performance Summary</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-3xl font-bold text-blue-600 mb-2">4.2x</div>
            <p className="text-sm text-slate-600">Return on Investment</p>
            <p className="text-xs text-slate-500 mt-1">Revenue / Marketing Spend</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-3xl font-bold text-green-600 mb-2">18.4%</div>
            <p className="text-sm text-slate-600">Conversion Rate</p>
            <p className="text-xs text-slate-500 mt-1">Leads to Customers</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-3xl font-bold text-purple-600 mb-2">ETB 70,000</div>
            <p className="text-sm text-slate-600">Average Deal Size</p>
            <p className="text-xs text-slate-500 mt-1">Revenue per Conversion</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AnalyticsSection;





