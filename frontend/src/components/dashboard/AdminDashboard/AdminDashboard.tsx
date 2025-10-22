import React, { useState, useEffect } from 'react';
import { User } from '../../../types';
// Removed unused icon imports
import ErrorBoundary from './components/ErrorBoundary';
import Sidebar from './components/Sidebar';
import AlertBanner from './components/AlertBanner';
import Header from "../../layout/Header";
import DashboardSection from './sections/DashboardSection';
import RequestManagementSection from './sections/RequestManagementSection';
import TeamManagementSection from './sections/TeamManagementSection';
import ContentManagementSection from './sections/ContentManagementSection';
import AnalyticsSection from './sections/AnalyticsSection';
import NotificationsSection from './sections/NotificationsSection';
import ActivityLogSection from './sections/ActivityLogSection';
import SystemHealthSection from './sections/SystemHealthSection';
import SettingsSection from './sections/SettingsSection';
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
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Data states
  const [moduleRequests, setModuleRequests] = useState<any[]>([]);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [dashboardStats, setDashboardStats] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Modal states
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [isViewRequestModalOpen, setIsViewRequestModalOpen] = useState(false);
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);

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

  // New handler functions for additional sections
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

  const handleExportLogs = () => {
    console.log('Exporting activity logs');
    // Implementation for exporting logs
  };

  const handleViewDetails = (logId: string) => {
    console.log('Viewing log details:', logId);
    // Implementation for viewing log details
  };

  const handleRefreshMetrics = () => {
    console.log('Refreshing system metrics');
    // Implementation for refreshing metrics
  };

  const handleRestartService = (serviceName: string) => {
    console.log('Restarting service:', serviceName);
    // Implementation for restarting service
  };

  const handleSaveSettings = (settings: any) => {
    console.log('Saving settings:', settings);
    // Implementation for saving settings
  };

  // Dashboard handlers
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

  // Removed unused dashboard details handler

  // Removed Quick Actions handlers (no longer used)

  // Alert management
  const handleAlertDismiss = (alertId: string) => {
    console.log('Alert dismissed:', alertId);
    // Implementation for dismissing alert
    // This could update state, send to backend, etc.
  };


  return (
    <>
      <Header user={user} onLogout={() => {}} />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex">
        <ErrorBoundary>
          <Sidebar activeTab={activeTab} onTabChange={setActiveTab} user={user} />
          <div className="flex-1 flex flex-col overflow-hidden">
          
          {/* Real-time Alert Banner */}
          <AlertBanner onDismiss={handleAlertDismiss} />
          
          {/* Main Content */}
          <div className="flex-1 overflow-auto">
            <div className="p-8">
              {/* Dashboard Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
                <p className="text-slate-600 mt-2">
                  Managing {user?.module || (user?.modules && user.modules[0]) || 'GASHA'} module • {user?.name}
                </p>
              </div>
              
              {loading && (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <span className="ml-2 text-slate-600">Loading dashboard data...</span>
                </div>
              )}
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-6">
                  <p className="text-red-700">{error}</p>
                  <button 
                    onClick={handleRefreshData}
                    className="mt-2 text-red-600 hover:text-red-800 text-sm underline"
                  >
                    Try again
                  </button>
                </div>
              )}
            {/* Tab Content */}
            {activeTab === 'dashboard' && (
              <DashboardSection
                user={user}
                onRefreshData={handleRefreshData}
              />
            )}
            {/* Quick Actions removed */}
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
            {activeTab === 'notifications' && (
              <NotificationsSection
                onMarkAsRead={handleMarkAsRead}
                onMarkAllAsRead={handleMarkAllAsRead}
                onDeleteNotification={handleDeleteNotification}
              />
            )}
            {activeTab === 'activity' && (
              <ActivityLogSection
                onExportLogs={handleExportLogs}
                onViewDetails={handleViewDetails}
              />
            )}
            {activeTab === 'system' && (
              <SystemHealthSection
                onRefreshMetrics={handleRefreshMetrics}
                onRestartService={handleRestartService}
              />
            )}
            {activeTab === 'settings' && (
              <SettingsSection
                onSaveSettings={handleSaveSettings}
              />
            )}
            
              </div>
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
        </ErrorBoundary>
      </div>
    </>
  );
};

export default AdminDashboard;
