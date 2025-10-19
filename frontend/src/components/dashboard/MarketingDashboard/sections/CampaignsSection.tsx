import React, { useState } from 'react';
import { 
  Target, 
  Mail, 
  Calendar, 
  Users, 
  TrendingUp,
  Play,
  Pause,
  Edit,
  Eye,
  Plus,
  BarChart3,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import Card from '../../../ui/Card';
import Button from '../../../ui/Button';

interface Campaign {
  id: string;
  name: string;
  type: 'email' | 'social' | 'content' | 'paid';
  status: 'draft' | 'scheduled' | 'active' | 'paused' | 'completed';
  startDate: string;
  endDate: string;
  budget: number;
  targetAudience: string;
  metrics: {
    sent: number;
    opened: number;
    clicked: number;
    converted: number;
    cost: number;
  };
  description: string;
  createdBy: string;
}

const CampaignsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const campaigns: Campaign[] = [
    {
      id: 'CAMP-001',
      name: 'Q1 Product Launch Email',
      type: 'email',
      status: 'active',
      startDate: '2024-01-15',
      endDate: '2024-03-15',
      budget: 5000,
      targetAudience: 'Enterprise Customers',
      metrics: {
        sent: 2500,
        opened: 1875,
        clicked: 450,
        converted: 75,
        cost: 1250
      },
      description: 'Email campaign promoting new GASHA Anti-Virus features',
      createdBy: 'Marketing Team'
    },
    {
      id: 'CAMP-002',
      name: 'LinkedIn Security Awareness',
      type: 'social',
      status: 'scheduled',
      startDate: '2024-02-01',
      endDate: '2024-02-28',
      budget: 3000,
      targetAudience: 'IT Professionals',
      metrics: {
        sent: 0,
        opened: 0,
        clicked: 0,
        converted: 0,
        cost: 0
      },
      description: 'LinkedIn campaign targeting IT professionals with security content',
      createdBy: 'Marketing Team'
    },
    {
      id: 'CAMP-003',
      name: 'Google Ads WAF Campaign',
      type: 'paid',
      status: 'active',
      startDate: '2024-01-01',
      endDate: '2024-01-31',
      budget: 8000,
      targetAudience: 'Web Developers',
      metrics: {
        sent: 0,
        opened: 0,
        clicked: 1250,
        converted: 45,
        cost: 3200
      },
      description: 'Google Ads campaign for GASHA WAF targeting web developers',
      createdBy: 'Marketing Team'
    },
    {
      id: 'CAMP-004',
      name: 'Blog Content Series',
      type: 'content',
      status: 'completed',
      startDate: '2023-12-01',
      endDate: '2023-12-31',
      budget: 2000,
      targetAudience: 'Security Professionals',
      metrics: {
        sent: 0,
        opened: 0,
        clicked: 0,
        converted: 0,
        cost: 1800
      },
      description: 'Monthly blog series on cybersecurity best practices',
      createdBy: 'Content Team'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-slate-100 text-slate-700';
      case 'scheduled': return 'bg-blue-100 text-blue-700';
      case 'active': return 'bg-green-100 text-green-700';
      case 'paused': return 'bg-yellow-100 text-yellow-700';
      case 'completed': return 'bg-purple-100 text-purple-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft': return <Edit size={16} />;
      case 'scheduled': return <Clock size={16} />;
      case 'active': return <Play size={16} />;
      case 'paused': return <Pause size={16} />;
      case 'completed': return <CheckCircle size={16} />;
      default: return <Clock size={16} />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'email': return <Mail size={16} />;
      case 'social': return <Users size={16} />;
      case 'content': return <BarChart3 size={16} />;
      case 'paid': return <TrendingUp size={16} />;
      default: return <Target size={16} />;
    }
  };

  const calculateROI = (campaign: Campaign) => {
    if (campaign.metrics.cost === 0) return 0;
    const revenue = campaign.metrics.converted * 1000; // Assuming 1000 birr per conversion
    return ((revenue - campaign.metrics.cost) / campaign.metrics.cost) * 100;
  };

  const filteredCampaigns = campaigns.filter(campaign => {
    if (activeTab === 'all') return true;
    return campaign.status === activeTab;
  });

  const stats = {
    total: campaigns.length,
    active: campaigns.filter(c => c.status === 'active').length,
    scheduled: campaigns.filter(c => c.status === 'scheduled').length,
    completed: campaigns.filter(c => c.status === 'completed').length,
    totalBudget: campaigns.reduce((sum, c) => sum + c.budget, 0),
    totalSpent: campaigns.reduce((sum, c) => sum + c.metrics.cost, 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-xl font-semibold text-slate-900">Marketing Campaigns</h3>
          <p className="text-slate-600">Manage and track your marketing campaigns</p>
        </div>
        <Button onClick={() => setShowCreateModal(true)}>
          <Plus size={16} className="mr-2" />
          Create Campaign
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Campaigns</p>
              <p className="text-2xl font-bold text-slate-900">{stats.total}</p>
            </div>
            <Target className="h-8 w-8 text-slate-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Active</p>
              <p className="text-2xl font-bold text-green-600">{stats.active}</p>
            </div>
            <Play className="h-8 w-8 text-green-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Scheduled</p>
              <p className="text-2xl font-bold text-blue-600">{stats.scheduled}</p>
            </div>
            <Clock className="h-8 w-8 text-blue-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Completed</p>
              <p className="text-2xl font-bold text-purple-600">{stats.completed}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-purple-600" />
          </div>
        </Card>
      </div>

      {/* Budget Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Budget</p>
              <p className="text-2xl font-bold text-slate-900">{stats.totalBudget.toLocaleString()} birr</p>
            </div>
            <TrendingUp className="h-8 w-8 text-slate-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Spent</p>
              <p className="text-2xl font-bold text-blue-600">{stats.totalSpent.toLocaleString()} birr</p>
            </div>
            <BarChart3 className="h-8 w-8 text-blue-600" />
          </div>
        </Card>
      </div>

      {/* Campaign Tabs */}
      <div className="flex space-x-1 bg-slate-100 p-1 rounded-lg">
        {[
          { id: 'all', label: 'All Campaigns' },
          { id: 'active', label: 'Active' },
          { id: 'scheduled', label: 'Scheduled' },
          { id: 'completed', label: 'Completed' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 px-4 py-2 rounded-md font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Campaigns List */}
      <div className="space-y-4">
        {filteredCampaigns.map((campaign) => (
          <Card key={campaign.id} className="p-6">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h4 className="text-lg font-semibold text-slate-900">{campaign.name}</h4>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${getStatusColor(campaign.status)}`}>
                    {getStatusIcon(campaign.status)}
                    {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                  </span>
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-slate-100 text-slate-700 flex items-center gap-1">
                    {getTypeIcon(campaign.type)}
                    {campaign.type.charAt(0).toUpperCase() + campaign.type.slice(1)}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-slate-600">Target Audience</p>
                    <p className="font-medium text-slate-900">{campaign.targetAudience}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Budget</p>
                    <p className="font-medium text-slate-900">{campaign.budget.toLocaleString()} birr</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Duration</p>
                    <p className="font-medium text-slate-900">{campaign.startDate} - {campaign.endDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Created By</p>
                    <p className="font-medium text-slate-900">{campaign.createdBy}</p>
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-lg mb-4">
                  <h5 className="font-medium text-slate-900 mb-2">Description:</h5>
                  <p className="text-sm text-slate-600">{campaign.description}</p>
                </div>

                {/* Metrics */}
                {campaign.status !== 'draft' && campaign.status !== 'scheduled' && (
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div className="text-center">
                      <p className="text-sm text-slate-600">Sent</p>
                      <p className="text-lg font-bold text-slate-900">{campaign.metrics.sent.toLocaleString()}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-slate-600">Opened</p>
                      <p className="text-lg font-bold text-blue-600">{campaign.metrics.opened.toLocaleString()}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-slate-600">Clicked</p>
                      <p className="text-lg font-bold text-green-600">{campaign.metrics.clicked.toLocaleString()}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-slate-600">Converted</p>
                      <p className="text-lg font-bold text-purple-600">{campaign.metrics.converted.toLocaleString()}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-slate-600">ROI</p>
                      <p className={`text-lg font-bold ${calculateROI(campaign) > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {calculateROI(campaign).toFixed(1)}%
                      </p>
                    </div>
                  </div>
                )}
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
                    <Edit size={16} className="mr-1" />
                    Edit
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="flex-1"
                  >
                    <BarChart3 size={16} className="mr-1" />
                    Analytics
                  </Button>
                </div>

                {campaign.status === 'active' && (
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="w-full"
                  >
                    <Pause size={16} className="mr-2" />
                    Pause Campaign
                  </Button>
                )}
                {campaign.status === 'paused' && (
                  <Button 
                    size="sm" 
                    className="w-full"
                  >
                    <Play size={16} className="mr-2" />
                    Resume Campaign
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CampaignsSection;





