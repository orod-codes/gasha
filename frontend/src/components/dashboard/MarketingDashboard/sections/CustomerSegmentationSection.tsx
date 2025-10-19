import React, { useState } from 'react';
import { 
  Target, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Users,
  TrendingUp,
  Filter,
  Search,
  BarChart3,
  PieChart,
  Mail,
  Megaphone,
  Calendar,
  Tag,
  Settings
} from 'lucide-react';
import Card from '../../../ui/Card';
import Button from '../../../ui/Button';

interface CustomerSegment {
  id: string;
  name: string;
  description: string;
  criteria: string[];
  customerCount: number;
  avgValue: number;
  lastActivity: string;
  tags: string[];
  campaigns: number;
  conversionRate: number;
  status: 'active' | 'inactive' | 'testing';
}

const CustomerSegmentationSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState<CustomerSegment | null>(null);

  const segments: CustomerSegment[] = [
    {
      id: 'SEG-001',
      name: 'Enterprise Security Teams',
      description: 'Large organizations with dedicated security teams looking for comprehensive solutions',
      criteria: ['Company Size: 500+ employees', 'Industry: Technology/Finance', 'Budget: $50K+'],
      customerCount: 124,
      avgValue: 75000,
      lastActivity: '2024-01-15',
      tags: ['enterprise', 'security', 'high-value'],
      campaigns: 8,
      conversionRate: 12.5,
      status: 'active'
    },
    {
      id: 'SEG-002',
      name: 'Small Business Owners',
      description: 'Small to medium businesses needing affordable security solutions',
      criteria: ['Company Size: 10-100 employees', 'Budget: $5K-20K', 'Industry: Various'],
      customerCount: 456,
      avgValue: 12000,
      lastActivity: '2024-01-14',
      tags: ['smb', 'affordable', 'growing'],
      campaigns: 12,
      conversionRate: 8.2,
      status: 'active'
    },
    {
      id: 'SEG-003',
      name: 'Tech-Savvy Individuals',
      description: 'Individual users and freelancers who prioritize privacy and security',
      criteria: ['Individual users', 'Tech industry professionals', 'Privacy-conscious'],
      customerCount: 892,
      avgValue: 2500,
      lastActivity: '2024-01-16',
      tags: ['individual', 'tech-savvy', 'privacy'],
      campaigns: 6,
      conversionRate: 15.8,
      status: 'active'
    },
    {
      id: 'SEG-004',
      name: 'Government & Public Sector',
      description: 'Government agencies and public sector organizations requiring compliance',
      criteria: ['Government sector', 'Compliance requirements', 'Security clearance'],
      customerCount: 67,
      avgValue: 95000,
      lastActivity: '2024-01-10',
      tags: ['government', 'compliance', 'high-security'],
      campaigns: 4,
      conversionRate: 6.7,
      status: 'testing'
    },
    {
      id: 'SEG-005',
      name: 'Educational Institutions',
      description: 'Schools and universities needing student and faculty protection',
      criteria: ['Educational sector', 'Student discounts', 'Bulk licensing'],
      customerCount: 234,
      avgValue: 18000,
      lastActivity: '2024-01-12',
      tags: ['education', 'students', 'bulk'],
      campaigns: 9,
      conversionRate: 11.3,
      status: 'active'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'inactive': return 'bg-red-100 text-red-700';
      case 'testing': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const filteredSegments = segments.filter(segment => {
    const matchesSearch = segment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         segment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         segment.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || segment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const stats = {
    totalSegments: segments.length,
    totalCustomers: segments.reduce((sum, s) => sum + s.customerCount, 0),
    avgConversionRate: segments.reduce((sum, s) => sum + s.conversionRate, 0) / segments.length,
    totalCampaigns: segments.reduce((sum, s) => sum + s.campaigns, 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-xl font-semibold text-slate-900">Customer Segmentation</h3>
          <p className="text-slate-600">Organize and target your customers effectively</p>
        </div>
        <Button onClick={() => setShowCreateModal(true)}>
          <Plus size={16} className="mr-2" />
          Create Segment
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Segments</p>
              <p className="text-2xl font-bold text-slate-900">{stats.totalSegments}</p>
            </div>
            <Target className="h-8 w-8 text-slate-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Customers</p>
              <p className="text-2xl font-bold text-blue-600">{stats.totalCustomers.toLocaleString()}</p>
            </div>
            <Users className="h-8 w-8 text-blue-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Avg Conversion</p>
              <p className="text-2xl font-bold text-green-600">{stats.avgConversionRate.toFixed(1)}%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Active Campaigns</p>
              <p className="text-2xl font-bold text-purple-600">{stats.totalCampaigns}</p>
            </div>
            <Megaphone className="h-8 w-8 text-purple-600" />
          </div>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search segments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="testing">Testing</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Segments List */}
      <div className="space-y-4">
        {filteredSegments.map((segment) => (
          <Card key={segment.id} className="p-6">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h4 className="text-lg font-semibold text-slate-900">{segment.name}</h4>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(segment.status)}`}>
                    {segment.status.charAt(0).toUpperCase() + segment.status.slice(1)}
                  </span>
                </div>
                
                <p className="text-slate-600 mb-4">{segment.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-slate-600">Customer Count</p>
                    <p className="text-xl font-bold text-blue-600">{segment.customerCount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Average Value</p>
                    <p className="text-xl font-bold text-green-600">${segment.avgValue.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Conversion Rate</p>
                    <p className="text-xl font-bold text-purple-600">{segment.conversionRate}%</p>
                  </div>
                </div>

                <div className="mb-4">
                  <h5 className="font-medium text-slate-900 mb-2">Segmentation Criteria:</h5>
                  <div className="flex flex-wrap gap-2">
                    {segment.criteria.map((criterion, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                        {criterion}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {segment.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full flex items-center gap-1">
                      <Tag size={12} />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2 min-w-[200px]">
                <Button size="sm" className="w-full">
                  <Eye size={16} className="mr-2" />
                  View Details
                </Button>
                
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="flex-1"
                  >
                    <Mail size={16} className="mr-1" />
                    Email
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="flex-1"
                  >
                    <Megaphone size={16} className="mr-1" />
                    Campaign
                  </Button>
                </div>

                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="flex-1"
                  >
                    <Edit size={16} className="mr-1" />
                    Edit
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="flex-1 text-red-600 hover:text-red-700"
                  >
                    <Trash2 size={16} className="mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Analytics Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h4 className="text-lg font-semibold text-slate-900 mb-4">Segment Performance</h4>
          <div className="space-y-4">
            {segments.slice(0, 3).map((segment) => (
              <div key={segment.id} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-900">{segment.name}</p>
                  <p className="text-sm text-slate-600">{segment.customerCount} customers</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-blue-600">{segment.conversionRate}%</p>
                  <p className="text-sm text-slate-600">conversion</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h4 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h4>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-16 flex flex-col items-center justify-center gap-2">
              <BarChart3 size={20} className="text-blue-600" />
              <span className="text-sm">Analytics</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col items-center justify-center gap-2">
              <PieChart size={20} className="text-green-600" />
              <span className="text-sm">Reports</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col items-center justify-center gap-2">
              <Calendar size={20} className="text-purple-600" />
              <span className="text-sm">Schedule</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col items-center justify-center gap-2">
              <Settings size={20} className="text-slate-600" />
              <span className="text-sm">Settings</span>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CustomerSegmentationSection;
