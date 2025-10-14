import React, { useState, useEffect } from 'react';
import { User } from '../../../types';
import ErrorBoundary from './components/ErrorBoundary';
import Sidebar from './components/Sidebar';
import RequestManagementSection from './sections/RequestManagementSection';
import TeamManagementSection from './sections/TeamManagementSection';
import ContentManagementSection from './sections/ContentManagementSection';
import AnalyticsSection from './sections/AnalyticsSection';
import ViewRequestDetailsModal from './modals/ViewRequestDetailsModal';
import AddTeamMemberModal from './modals/AddTeamMemberModal';
import CreatePostModal from './modals/CreatePostModal';

interface AdminDashboardProps {
  user: User;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState('requests');

  const hashToTab: Record<string, string> = {
    '#admin-requests': 'requests',
    '#admin-team': 'team',
    '#admin-content': 'content',
    '#admin-analytics': 'analytics',
    '#admin-notifications': 'notifications'
  };

  const tabToHash: Record<string, string> = {
    'requests': '#admin-requests',
    'team': '#admin-team',
    'content': '#admin-content',
    'analytics': '#admin-analytics',
    'notifications': '#admin-notifications'
  };

  useEffect(() => {
    const applyHash = () => {
      const currentHash = window.location.hash;
      if (hashToTab[currentHash]) {
        setActiveTab(hashToTab[currentHash]);
      }
    };
    applyHash();
    window.addEventListener('hashchange', applyHash);
    return () => window.removeEventListener('hashchange', applyHash);
  }, []);

  const handleTabChange = (nextTab: string) => {
    setActiveTab(nextTab);
    const nextHash = tabToHash[nextTab];
    if (nextHash && window.location.hash !== nextHash) {
      window.location.hash = nextHash;
    }
  };
  
  // Modal states
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [isViewRequestModalOpen, setIsViewRequestModalOpen] = useState(false);
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);

  const moduleRequests = [
    {
      id: 'REQ-001',
      productName: 'GASHA Anti-Virus',
      companyName: 'TechCorp Solutions',
      contactEmail: 'admin@techcorp.com',
      status: 'validated',
      submittedDate: '2024-01-15',
      marketingNotes: 'All information verified, company has 150 computers',
      formData: {
        totalComputers: 150,
        windowsOS: 120,
        linuxOS: 30,
        contactPerson1: 'John Smith',
        contactPerson2: 'Jane Doe'
      }
    },
    {
      id: 'REQ-002',
      productName: 'GASHA WAF',
      companyName: 'SecureBank Ltd',
      contactEmail: 'security@securebank.com',
      status: 'pending',
      submittedDate: '2024-01-14',
      marketingNotes: 'Waiting for additional server information',
      formData: {
        hasInternalWebsite: true,
        serverOS: 'Ubuntu 20.04',
        webServer: 'Nginx'
      }
    },
    {
      id: 'REQ-003',
      productName: 'NISIR SIEM',
      companyName: 'DataFlow Inc',
      contactEmail: 'it@dataflow.com',
      status: 'approved',
      submittedDate: '2024-01-13',
      adminNotes: 'Approved for enterprise deployment',
      assignedTo: 'Technical Team Alpha'
    }
  ];

  const teamMembers = [
    { id: 1, name: 'Sarah Johnson', role: 'Marketing Lead', status: 'active', requests: 23 },
    { id: 2, name: 'Mike Chen', role: 'Marketing Specialist', status: 'active', requests: 18 },
    { id: 3, name: 'Alex Rodriguez', role: 'Technical Lead', status: 'active', tasks: 12 },
    { id: 4, name: 'Emma Wilson', role: 'Developer', status: 'active', content: 8 }
  ];

  const blogPosts = [
    {
      id: 1,
      title: 'GASHA Anti-Virus Update 2024.1',
      author: 'Emma Wilson',
      status: 'pending',
      type: 'blog',
      createdDate: '2024-01-15',
      content: 'New features and security improvements...'
    },
    {
      id: 2,
      title: 'Security Best Practices Guide',
      author: 'Alex Rodriguez',
      status: 'published',
      type: 'news',
      createdDate: '2024-01-12',
      content: 'Essential security practices for enterprises...'
    }
  ];


  // Handler functions
  const handleApproveRequest = (requestId: string) => {
    console.log('Approving request:', requestId);
    // Implementation for approving request
  };

  const handleRejectRequest = (requestId: string) => {
    console.log('Rejecting request:', requestId);
    // Implementation for rejecting request
  };

  const handleViewRequest = (request: any) => {
    setSelectedRequest(request);
    setIsViewRequestModalOpen(true);
  };

  const handleAddMember = (memberData: any) => {
    console.log('Adding team member:', memberData);
    // Implementation for adding team member
  };

  const handleEditMember = (memberId: number) => {
    console.log('Editing team member:', memberId);
    // Implementation for editing team member
  };

  const handleViewMember = (memberId: number) => {
    console.log('Viewing team member:', memberId);
    // Implementation for viewing team member
  };

  const handleCreatePost = (postData: any) => {
    console.log('Creating post:', postData);
    // Implementation for creating post
  };

  const handleViewPost = (postId: number) => {
    console.log('Viewing post:', postId);
    // Implementation for viewing post
  };

  const handleEditPost = (postId: number) => {
    console.log('Editing post:', postId);
    // Implementation for editing post
  };

  const handleApprovePost = (postId: number) => {
    console.log('Approving post:', postId);
    // Implementation for approving post
  };

  const handleRejectPost = (postId: number) => {
    console.log('Rejecting post:', postId);
    // Implementation for rejecting post
  };

  const handleExportReport = () => {
    console.log('Exporting report');
    // Implementation for exporting report
  };


  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-slate-50 flex">
        <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />
        
        <div className="flex-1 overflow-auto">
          <div className="p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
              <p className="text-slate-600 mt-2">
                Managing {user?.module || 'GASHA'} module • {user?.name}
              </p>
            </div>

            {/* Tab Content */}
            {activeTab === 'requests' && (
              <RequestManagementSection
                requests={moduleRequests}
                onApproveRequest={handleApproveRequest}
                onRejectRequest={handleRejectRequest}
                onViewRequest={handleViewRequest}
              />
            )}
            {activeTab === 'team' && (
              <TeamManagementSection
                teamMembers={teamMembers}
                onAddMember={() => setIsAddMemberModalOpen(true)}
                onEditMember={handleEditMember}
                onViewMember={handleViewMember}
              />
            )}
            {activeTab === 'content' && (
              <ContentManagementSection
                blogPosts={blogPosts}
                onCreatePost={() => setIsCreatePostModalOpen(true)}
                onViewPost={handleViewPost}
                onEditPost={handleEditPost}
                onApprovePost={handleApprovePost}
                onRejectPost={handleRejectPost}
              />
            )}
            {activeTab === 'analytics' && (
              <AnalyticsSection
                totalRequests={68}
                completedRequests={45}
                inProgressRequests={20}
                contentPosts={15}
                onExportReport={handleExportReport}
              />
            )}
          </div>
        </div>

        {/* Modals */}
        <ViewRequestDetailsModal
          request={selectedRequest}
          isOpen={isViewRequestModalOpen}
          onClose={() => setIsViewRequestModalOpen(false)}
        />
        
        <AddTeamMemberModal
          isOpen={isAddMemberModalOpen}
          onClose={() => setIsAddMemberModalOpen(false)}
          onAddMember={handleAddMember}
        />
        
        <CreatePostModal
          isOpen={isCreatePostModalOpen}
          onClose={() => setIsCreatePostModalOpen(false)}
          onCreatePost={handleCreatePost}
        />
      </div>
    </ErrorBoundary>
  );
};

export default AdminDashboard;
