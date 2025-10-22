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
import { getRequests } from '../../../services/requestService';
import { getUsersByModule } from '../../../services/userService';
import { getDashboardStats } from '../../../services/statsService';

interface AdminDashboardProps {
  user: User;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState('requests');

  // Data states
  const [moduleRequests, setModuleRequests] = useState<any[]>([]);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [dashboardStats, setDashboardStats] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch requests
        const requests = await getRequests();
        setModuleRequests(requests);

        // Fetch team members for the current user's module
        const userModule = user?.module || (user?.modules && user.modules[0]);
        if (userModule) {
          const teamResponse = await getUsersByModule(userModule);
          if (teamResponse.success && teamResponse.data) {
            setTeamMembers(teamResponse.data);
          }
        }

        // Fetch dashboard stats
        const statsResponse = await getDashboardStats();
        if (statsResponse.success && statsResponse.data) {
          setDashboardStats(statsResponse.data);
        }

        // TODO: Fetch blog posts when content API is available
        setBlogPosts([]);

      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user?.module, user?.modules, user?.modules?.[0]]);

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

  // Refresh data function
  const handleRefreshData = async () => {
    try {
      setLoading(true);
      setError(null);

      const requests = await getRequests();
      setModuleRequests(requests);

      const userModule = user?.module || user?.modules?.[0];
      if (userModule) {
        const teamResponse = await getUsersByModule(userModule);
        if (teamResponse.success && teamResponse.data) {
          setTeamMembers(teamResponse.data);
        }
      }

      const statsResponse = await getDashboardStats();
      if (statsResponse.success && statsResponse.data) {
        setDashboardStats(statsResponse.data);
      }

    } catch (err) {
      console.error('Error refreshing data:', err);
      setError('Failed to refresh data');
    } finally {
      setLoading(false);
    }
  };
  
  // Modal states
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [isViewRequestModalOpen, setIsViewRequestModalOpen] = useState(false);
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);



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

  const handleMarkAsRead = (notificationId: string) => {
    console.log('Marking notification as read:', notificationId);
    // Implementation for marking notification as read
  };

  const handleMarkAllAsRead = () => {
    console.log('Marking all notifications as read');
    // Implementation for marking all notifications as read
  };

  const handleDeleteNotification = (notificationId: string) => {
    console.log('Deleting notification:', notificationId);
    // Implementation for deleting notification
  };


  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-slate-50 flex">
        <Sidebar activeTab={activeTab} onTabChange={handleTabChange} user={user} />
        
        <div className="flex-1 overflow-auto">
          <div className="p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
              <p className="text-slate-600 mt-2">
                Managing {user?.module || (user?.modules && user.modules[0]) || 'GASHA'} module • {user?.name}
              </p>
              {loading && (
                <div className="mt-4 flex items-center space-x-2 text-blue-600">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  <span className="text-sm">Loading dashboard data...</span>
                </div>
              )}
              {error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 text-sm">{error}</p>
                  <button 
                    onClick={handleRefreshData}
                    className="mt-2 text-red-600 hover:text-red-800 text-sm underline"
                  >
                    Try again
                  </button>
                </div>
              )}
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
                totalRequests={dashboardStats.totalRequests || moduleRequests.length}
                completedRequests={dashboardStats.completedRequests || moduleRequests.filter(r => r.status === 'approved').length}
                inProgressRequests={dashboardStats.pendingRequests || moduleRequests.filter(r => r.status === 'pending').length}
                contentPosts={blogPosts.length}
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
