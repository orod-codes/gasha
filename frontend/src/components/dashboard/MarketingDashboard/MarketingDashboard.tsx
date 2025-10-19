import React, { useState } from 'react';
import { 
  TrendingUp,
  Settings
} from 'lucide-react';
import { User } from '../../../types';
import Sidebar from './components/Sidebar';
import LeadsSection from './sections/LeadsSection';
import CampaignsSection from './sections/CampaignsSection';
import AnalyticsSection from './sections/AnalyticsSection';
import ContentCalendarSection from './sections/ContentCalendarSection';
import CustomerSegmentationSection from './sections/CustomerSegmentationSection';
import DashboardOverviewSection from './sections/DashboardOverviewSection';
import ContentLibrarySection from './sections/ContentLibrarySection';
import ContentApprovalSection from './sections/ContentApprovalSection';

interface MarketingDashboardProps {
  user: User;
}

const MarketingDashboard: React.FC<MarketingDashboardProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverviewSection />;
      case 'leads':
        return <LeadsSection />;
      case 'campaigns':
        return <CampaignsSection />;
      case 'calendar':
        return <ContentCalendarSection />;
      case 'segmentation':
        return <CustomerSegmentationSection />;
      case 'approvals':
        return <ContentApprovalSection />;
      case 'analytics':
        return <AnalyticsSection />;
      case 'content':
        return <ContentLibrarySection />;
      case 'automation':
        return (
          <div className="space-y-6">
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Email Automation</h3>
              <p className="text-slate-600">Create and manage automated email sequences</p>
            </div>
          </div>
        );
      case 'social':
        return (
          <div className="space-y-6">
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Social Media Management</h3>
              <p className="text-slate-600">Schedule and manage your social media presence</p>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="space-y-6">
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Marketing Settings</h3>
              <p className="text-slate-600">Configure your marketing dashboard and preferences</p>
            </div>
          </div>
        );
      default:
        return <LeadsSection />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-slate-200 px-6 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Marketing Dashboard</h1>
              <p className="text-slate-600">
                Welcome back, {user?.name}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-2 bg-green-100 text-green-700 rounded-lg">
                <TrendingUp size={16} />
                <span className="text-sm font-medium">+12.5% this month</span>
              </div>
              <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <Settings size={20} className="text-slate-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto px-6 py-8">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketingDashboard;