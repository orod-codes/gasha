import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ErrorBoundary from './components/ErrorBoundary';
import OverviewSection from './sections/OverviewSection';
import ModuleManagementSection from './sections/ModuleManagementSection';
import AdminManagementSection from './sections/AdminManagementSection';
import BlogManagementSection from './sections/BlogManagementSection';
import ReportsSection from './sections/ReportsSection';
import CreateAdminModal from './modals/CreateAdminModal';
import AddModuleModal from './modals/AddModuleModal';
import ManageProductsModal from './modals/ManageProductsModal';
import ViewAdminsModal from './modals/ViewAdminsModal';
import ViewDetailsModal from './modals/ViewDetailsModal';
import EditAdminModal from './modals/EditAdminModal';

const SuperAdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Modal states
  const [showCreateAdminModal, setShowCreateAdminModal] = useState(false);
  const [showViewDetailsModal, setShowViewDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModuleModal, setShowAddModuleModal] = useState(false);
  const [showEditModuleModal, setShowEditModuleModal] = useState(false);
  const [showManageProductsModal, setShowManageProductsModal] = useState(false);
  const [showViewAdminsModal, setShowViewAdminsModal] = useState(false);
  const [showCreateBlogModal, setShowCreateBlogModal] = useState(false);
  const [showCreateNewsModal, setShowCreateNewsModal] = useState(false);
  const [showManageBlogsModal, setShowManageBlogsModal] = useState(false);
  const [showManageNewsModal, setShowManageNewsModal] = useState(false);
  const [showReviewDraftsModal, setShowReviewDraftsModal] = useState(false);
  
  // Selected items
  const [selectedAdmin, setSelectedAdmin] = useState<any>(null);
  const [selectedModule, setSelectedModule] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  
  // Data states
  const [newAdminData, setNewAdminData] = useState({ name: '', email: '', password: '', role: '' });
  const [editAdminData, setEditAdminData] = useState({ name: '', email: '', password: '', role: '' });
  const [newModuleData, setNewModuleData] = useState({ name: '', description: '', type: '', logo: '' });
  const [editModuleData, setEditModuleData] = useState({ name: '', description: '', type: '', logo: '' });
  const [editProductData, setEditProductData] = useState({ name: '', description: '' });
  const [newBlogData, setNewBlogData] = useState({ title: '', content: '', category: '' });
  const [newNewsData, setNewNewsData] = useState({ title: '', content: '', priority: '' });
  
  // Admin list state
  const [adminList, setAdminList] = useState([
    { id: 1, name: 'Sarah Johnson', email: 'sarah@gasha.com', role: 'GASHA Admin', status: 'Active', employees: 12 },
    { id: 2, name: 'Michael Chen', email: 'michael@nisir.com', role: 'NISIR Admin', status: 'Active', employees: 8 },
    { id: 3, name: 'Emily Rodriguez', email: 'emily@enyuma.com', role: 'ENYUMA Admin', status: 'Pending', employees: 6 },
    { id: 4, name: 'David Kim', email: 'david@codepro.com', role: 'CODEPRO Admin', status: 'Active', employees: 4 },
    { id: 5, name: 'Lisa Wang', email: 'lisa@biometrics.com', role: 'Biometrics Admin', status: 'Active', employees: 10 }
  ]);

  const stats = {
    totalUsers: 15420,
    activeModules: 5,
    totalRequests: 3456,
    completedRequests: 2891
  };

  const moduleStats = [
    { name: 'Security Service Anti-Virus', requests: 856, downloads: 1234, color: 'bg-blue-500' },
    { name: 'GASHA WAF', requests: 432, downloads: 0, color: 'bg-green-500' },
    { name: 'GASHA VPN', requests: 678, downloads: 892, color: 'bg-purple-500' },
    { name: 'NISIR SIEM', requests: 234, downloads: 0, color: 'bg-orange-500' },
    { name: 'ENYUMA IAM', requests: 0, downloads: 0, color: 'bg-red-500' },
    { name: 'CODEPRO', requests: 0, downloads: 0, color: 'bg-yellow-500' },
    { name: 'Biometrics', requests: 189, downloads: 0, color: 'bg-pink-500' }
  ];

  // Event handlers
  const handleCreateAdmin = (data: { name: string; email: string; password: string; role: string }) => {
    console.log('Creating admin:', data);
    setShowCreateAdminModal(false);
    setNewAdminData({ name: '', email: '', password: '', role: '' });
  };

  const handleEditModule = (moduleId: string, moduleData: any) => {
    setSelectedModule(moduleId);
    setEditModuleData(moduleData);
    setShowEditModuleModal(true);
  };

  const handleDeleteModule = (moduleId: string) => {
    console.log('Deleting module:', moduleId);
  };

  const handleManageProducts = (moduleId: string) => {
    setSelectedModule(moduleId);
    setShowManageProductsModal(true);
  };

  const handleViewAdmins = (moduleId: string) => {
    setSelectedModule(moduleId);
    setShowViewAdminsModal(true);
  };

  const handleViewDetails = (admin: any) => {
    setSelectedAdmin(admin);
    setShowViewDetailsModal(true);
  };

  const handleViewModuleDetails = () => {
    console.log('Viewing module details');
  };

  const handleViewCalendar = () => {
    console.log('Opening calendar view');
  };

  const handleViewAll = () => {
    console.log('Viewing all activities');
  };

  const handleEditAdmin = (admin: any) => {
    setSelectedAdmin(admin);
    setEditAdminData({ name: admin.name, email: admin.email, password: '', role: admin.role });
    setShowEditModal(true);
  };

  const handleToggleStatus = (adminId: number) => {
    setAdminList(prev => prev.map(a => 
      a.id === adminId 
        ? { ...a, status: a.status === 'Active' ? 'Disabled' : 'Active' }
        : a
    ));
  };

  const handleCreateBlog = () => {
    setShowCreateBlogModal(true);
  };

  const handleCreateNews = () => {
    setShowCreateNewsModal(true);
  };

  const handleManageBlogs = () => {
    setShowManageBlogsModal(true);
  };

  const handleManageNews = () => {
    setShowManageNewsModal(true);
  };

  const handleReviewDrafts = () => {
    setShowReviewDraftsModal(true);
  };

  const handleDateRangeChange = () => {
    console.log('Changing date range');
  };

  const handleExportReport = () => {
    console.log('Exporting report');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex">
      {/* Enhanced Sidebar */}
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
          <div className="p-8">
            {/* Enhanced Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 capitalize">{activeTab}</h2>
                  <p className="text-slate-600 mt-2">Enterprise-level control and management</p>
                  <div className="flex items-center space-x-4 mt-3">
                    <div className="flex items-center space-x-2 bg-gradient-to-r from-green-50 to-emerald-50 px-3 py-1 rounded-lg border border-green-200">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-green-700">All Systems Operational</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-indigo-50 px-3 py-1 rounded-lg border border-blue-200">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm font-medium text-blue-700">Enterprise Mode</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="text-sm font-medium text-slate-900">System Status</div>
                    <div className="text-xs text-slate-600">99.9% Uptime</div>
                  </div>
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Tab Content */}
            <div>
              {activeTab === 'overview' && (
                <ErrorBoundary sectionName="Overview">
                  <OverviewSection 
                    stats={stats} 
                    moduleStats={moduleStats}
                    onViewDetails={handleViewModuleDetails}
                    onViewCalendar={handleViewCalendar}
                    onViewAll={handleViewAll}
                  />
                </ErrorBoundary>
              )}
              {activeTab === 'modules' && (
                <ErrorBoundary sectionName="Module Management">
                  <ModuleManagementSection
                    moduleStats={moduleStats}
                    onAddModule={() => setShowAddModuleModal(true)}
                    onEditModule={handleEditModule}
                    onDeleteModule={handleDeleteModule}
                    onManageProducts={handleManageProducts}
                    onViewAdmins={handleViewAdmins}
                  />
                </ErrorBoundary>
              )}
              {activeTab === 'admin' && (
                <ErrorBoundary sectionName="Admin Management">
                  <AdminManagementSection
                    adminList={adminList}
                    onCreateAdmin={() => setShowCreateAdminModal(true)}
                    onViewDetails={handleViewDetails}
                    onEditAdmin={handleEditAdmin}
                    onToggleStatus={handleToggleStatus}
                  />
                </ErrorBoundary>
              )}
              {activeTab === 'blog' && (
                <ErrorBoundary sectionName="Blog Management">
                  <BlogManagementSection
                    onCreateBlog={handleCreateBlog}
                    onCreateNews={handleCreateNews}
                    onManageBlogs={handleManageBlogs}
                    onManageNews={handleManageNews}
                    onReviewDrafts={handleReviewDrafts}
                  />
                </ErrorBoundary>
              )}
              {activeTab === 'reports' && (
                <ErrorBoundary sectionName="Reports">
                  <ReportsSection
                    onDateRangeChange={handleDateRangeChange}
                    onExportReport={handleExportReport}
                  />
                </ErrorBoundary>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Modals */}
      <CreateAdminModal
        isOpen={showCreateAdminModal}
        onClose={() => setShowCreateAdminModal(false)}
        onSubmit={handleCreateAdmin}
        data={newAdminData}
        onChange={setNewAdminData}
      />
      
      <AddModuleModal
        isOpen={showAddModuleModal}
        onClose={() => {
          setShowAddModuleModal(false);
          setSelectedModule('');
          setNewModuleData({ name: '', description: '', type: '', logo: '' });
        }}
        onSubmit={(data) => {
          console.log('Adding/editing module:', data);
          setShowAddModuleModal(false);
          setNewModuleData({ name: '', description: '', type: '', logo: '' });
          setSelectedModule('');
        }}
        data={newModuleData}
        onChange={setNewModuleData}
        selectedModule={selectedModule}
      />
      
      <ManageProductsModal
        isOpen={showManageProductsModal}
        onClose={() => setShowManageProductsModal(false)}
        moduleId={selectedModule}
      />
      
      <ViewAdminsModal
        isOpen={showViewAdminsModal}
        onClose={() => setShowViewAdminsModal(false)}
        moduleId={selectedModule}
      />
      
      <ViewDetailsModal
        isOpen={showViewDetailsModal}
        onClose={() => setShowViewDetailsModal(false)}
        admin={selectedAdmin}
      />
      
      <EditAdminModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        admin={selectedAdmin}
        onSave={(adminData) => {
          setAdminList(prev => prev.map(a => 
            a.id === selectedAdmin?.id 
              ? { ...a, name: adminData.name, email: adminData.email, role: adminData.role }
              : a
          ));
          setShowEditModal(false);
        }}
      />
    </div>
  );
};

export default SuperAdminDashboard;
