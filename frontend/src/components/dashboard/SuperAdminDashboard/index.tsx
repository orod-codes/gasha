import React, { useState, useEffect } from 'react';
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
import { getModules, createModule, updateModule, deleteModule } from '../../../services/moduleService';
import { createUser, getAllUsers, deleteUser, updateUser } from '../../../services/userService';
import { getDashboardStats, getModuleStats, getRequestStats } from '../../../services/statsService';
import { Module } from '../../../types';

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
  const [newAdminData, setNewAdminData] = useState({ name: '', email: '', password: '', role: '', module: '' });
  const [editAdminData, setEditAdminData] = useState({ name: '', email: '', password: '', role: '', module: '' });
  const [newModuleData, setNewModuleData] = useState({ name: '', description: '', type: '', logo: '' });
  const [editModuleData, setEditModuleData] = useState({ name: '', description: '', type: '', logo: '' });
  const [editProductData, setEditProductData] = useState({ name: '', description: '' });
  const [newBlogData, setNewBlogData] = useState({ title: '', content: '', category: '' });
  const [newNewsData, setNewNewsData] = useState({ title: '', content: '', priority: '' });
  
  // Admin list state
  const [adminList, setAdminList] = useState([]);

  const [stats, setStats] = useState({
    totalUsers: 0,
    activeModules: 0,
    totalRequests: 0,
    completedRequests: 0
  });

  const [moduleStats, setModuleStats] = useState([]);
  const [modules, setModules] = useState<Module[]>([]);
  const [modulesLoading, setModulesLoading] = useState(true);

  // Fetch modules from backend API
  useEffect(() => {
    const fetchModules = async () => {
      try {
        setModulesLoading(true);
        console.log('🔧 Fetching modules from backend...');
        console.log('🔧 Current token:', localStorage.getItem('token'));
        const response = await getModules();
        
        if (response.success && response.data) {
          console.log('✅ Modules fetched successfully:', response.data);
          setModules(response.data as Module[]);
          
          // Update module stats with real data
          const stats = (response.data as Module[]).map((module, index) => ({
            name: module.displayName,
            requests: 0, // Will be updated with real data
            downloads: 0, // Will be updated with real data
            color: `hsl(${(index * 60) % 360}, 70%, 50%)` // Consistent colors based on index
          }));
          setModuleStats(stats);
          
          // Fetch real statistics for each module
          fetchModuleStatistics(stats);
        } else {
          console.error('❌ Failed to fetch modules:', response.error);
          console.error('❌ Response details:', response);
        }
      } catch (error) {
        console.error('❌ Error fetching modules:', error);
      } finally {
        setModulesLoading(false);
      }
    };

    fetchModules();
  }, []);

  // Fetch admin list from backend API
  const fetchAdminList = async () => {
    try {
      console.log('🔧 Fetching admin list from backend...');
      const response = await getAllUsers();
      
      if (response.success && response.data) {
        console.log('✅ Admin list fetched successfully:', response.data);
        // Filter to show only admin users (not super-admin)
        const adminUsers = response.data.filter((user: any) => 
          user.role === 'admin' || user.role === 'marketing' || user.role === 'technical' || user.role === 'developer'
        );
        
        // Transform the data to match the expected format
        const transformedAdmins = adminUsers.map((user: any) => ({
          id: user.id || user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          module: user.modules && user.modules.length > 0 ? user.modules[0] : user.module,
          status: user.status === 'active' ? 'Active' : 'Inactive',
          employees: 0 // TODO: Implement real employee count if needed
        }));
        
        setAdminList(transformedAdmins);
      } else {
        console.error('❌ Failed to fetch admin list:', response.error);
      }
    } catch (error) {
      console.error('❌ Error fetching admin list:', error);
    }
  };

  // Fetch admin list on component mount
  useEffect(() => {
    fetchAdminList();
  }, []);

  // Fetch dashboard statistics
  const fetchDashboardStatistics = async () => {
    try {
      console.log('🔧 Fetching dashboard statistics...');
      
      // Fetch user count
      const usersResponse = await getAllUsers();
      if (usersResponse.success && usersResponse.data) {
        const totalUsers = usersResponse.data.length;
        const activeUsers = usersResponse.data.filter((user: any) => user.status === 'active').length;
        
        setStats(prevStats => ({
          ...prevStats,
          totalUsers,
          activeModules: modules.length
        }));
      }
      
      // Fetch request statistics
      const requestResponse = await getRequestStats();
      if (requestResponse.success && requestResponse.data) {
        const totalRequests = requestResponse.data.length;
        const completedRequests = requestResponse.data.filter((request: any) => 
          request.status === 'completed' || request.status === 'approved'
        ).length;
        
        setStats(prevStats => ({
          ...prevStats,
          totalRequests,
          completedRequests
        }));
      }
      
    } catch (error) {
      console.error('❌ Error fetching dashboard statistics:', error);
    }
  };

  // Fetch dashboard statistics on component mount
  useEffect(() => {
    fetchDashboardStatistics();
  }, [modules.length]);

  // Fetch real module statistics
  const fetchModuleStatistics = async (moduleStats: any[]) => {
    try {
      console.log('🔧 Fetching real module statistics...');
      
      // Fetch request statistics
      const requestResponse = await getRequestStats();
      if (requestResponse.success && requestResponse.data) {
        console.log('✅ Request stats fetched:', requestResponse.data);
        
        // Count requests by module
        const moduleRequestCounts: { [key: string]: number } = {};
        requestResponse.data.forEach((request: any) => {
          if (request.product && request.product.module) {
            const moduleName = request.product.module;
            moduleRequestCounts[moduleName] = (moduleRequestCounts[moduleName] || 0) + 1;
          }
        });
        
        // Update module stats with real request counts
        const updatedStats = moduleStats.map(stat => ({
          ...stat,
          requests: moduleRequestCounts[stat.name.toLowerCase()] || 0
        }));
        
        setModuleStats(updatedStats);
      }
      
      // Fetch analytics for downloads (if available)
      const analyticsResponse = await getModuleStats();
      if (analyticsResponse.success && analyticsResponse.data) {
        console.log('✅ Analytics fetched:', analyticsResponse.data);
        
        // Count downloads by module
        const moduleDownloadCounts: { [key: string]: number } = {};
        analyticsResponse.data.forEach((analytics: any) => {
          if (analytics.module && analytics.metricName === 'download') {
            moduleDownloadCounts[analytics.module] = (moduleDownloadCounts[analytics.module] || 0) + (analytics.metricValue || 1);
          }
        });
        
        // Update module stats with real download counts
        setModuleStats(prevStats => 
          prevStats.map(stat => ({
            ...stat,
            downloads: moduleDownloadCounts[stat.name.toLowerCase()] || 0
          }))
        );
      }
      
    } catch (error) {
      console.error('❌ Error fetching module statistics:', error);
    }
  };

  // Event handlers
  const handleDeleteAdmin = async (adminId: string) => {
    try {
      console.log('🔧 Deleting admin:', adminId);
      
      // Confirm deletion
      if (!confirm('Are you sure you want to delete this admin? This action cannot be undone.')) {
        return;
      }
      
      const response = await deleteUser(adminId);
      
      if (response.success) {
        console.log('✅ Admin deleted successfully');
        // Refresh the admin list
        await fetchAdminList();
        alert('Admin deleted successfully');
      } else {
        console.error('❌ Failed to delete admin:', response.error);
        alert(`Failed to delete admin: ${response.error}`);
      }
    } catch (error) {
      console.error('❌ Error deleting admin:', error);
      alert(`Error deleting admin: ${error}`);
    }
  };

  const handleCreateAdmin = async (data: { name: string; email: string; password: string; role: string; module: string }) => {
    console.log('🔧 Creating admin:', data);
    console.log('🔧 Available modules:', modules);
    console.log('🔧 Selected module ID:', data.module);
    
    try {
      // Find the module name from the selected module ID
      const selectedModule = modules.find(m => (m._id || m.id) === data.module);
      console.log('🔧 Found selected module:', selectedModule);
      
      // Validate that a module is selected for non-super-admin users
      if (!selectedModule && data.role !== 'super-admin') {
        console.log('❌ No module selected for non-super-admin user');
        alert('Please select a module for the admin user');
        return;
      }
      
      // Create user with modules array
      const userData = {
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
        modules: selectedModule ? [selectedModule.name] : []
      };
      
      console.log('🔧 Creating user with data:', userData);
      const response = await createUser(userData);
      
      if (response.success) {
        console.log('✅ Admin created successfully');
        // Refresh the admin list from the backend
        await fetchAdminList();
        setShowCreateAdminModal(false);
        setNewAdminData({ name: '', email: '', password: '', role: '', module: '' });
      } else {
        console.error('❌ Failed to create admin:', response.error);
        alert(`Failed to create admin: ${response.error}`);
      }
    } catch (error) {
      console.error('❌ Error creating admin:', error);
      alert(`Error creating admin: ${error}`);
    }
  };

  const handleEditModule = (moduleId: string, moduleData: any) => {
    setSelectedModule(moduleId);
    setEditModuleData(moduleData);
    setShowEditModuleModal(true);
  };

  const handleUpdateModule = async (moduleId: string, moduleData: any) => {
    console.log('🔧 Updating module:', moduleId, moduleData);
    try {
      const response = await updateModule(moduleId, moduleData);
      if (response.success) {
        console.log('✅ Module updated successfully');
        // Refresh modules list
        const modulesResponse = await getModules();
        if (modulesResponse.success && modulesResponse.data) {
          setModules(modulesResponse.data as Module[]);
        }
        setShowEditModuleModal(false);
        setEditModuleData({ name: '', description: '', type: '', logo: '' });
      } else {
        console.error('❌ Failed to update module:', response.error);
        alert(`Failed to update module: ${response.error}`);
      }
    } catch (error) {
      console.error('❌ Error updating module:', error);
      alert(`Error updating module: ${error}`);
    }
  };

  const handleDeleteModule = async (moduleId: string) => {
    console.log('🔧 Deleting module:', moduleId);
    try {
      const response = await deleteModule(moduleId);
      if (response.success) {
        console.log('✅ Module deleted successfully');
        // Refresh modules list
        const modulesResponse = await getModules();
        if (modulesResponse.success && modulesResponse.data) {
          setModules(modulesResponse.data as Module[]);
        }
      } else {
        console.error('❌ Failed to delete module:', response.error);
      }
    } catch (error) {
      console.error('❌ Error deleting module:', error);
    }
  };

  const handleAddModule = async (moduleData: { name: string; displayName: string; description: string; logo?: string }) => {
    console.log('🔧 Creating module:', moduleData);
    try {
      const response = await createModule(moduleData);
      console.log('📋 Create module response:', response);
      if (response.success) {
        console.log('✅ Module created successfully');
        // Refresh modules list
        const modulesResponse = await getModules();
        if (modulesResponse.success && modulesResponse.data) {
          setModules(modulesResponse.data as Module[]);
        }
        setShowAddModuleModal(false);
        setNewModuleData({ name: '', description: '', type: '', logo: '' });
      } else {
        console.error('❌ Failed to create module:', response.error);
        alert(`Failed to create module: ${response.error}`);
      }
    } catch (error) {
      console.error('❌ Error creating module:', error);
      alert(`Error creating module: ${error}`);
    }
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

  const handleToggleStatus = async (adminId: string) => {
    try {
      console.log('🔧 Toggling status for admin:', adminId);
      
      // Find the current admin to get their current status
      const currentAdmin = adminList.find(admin => admin.id === adminId);
      if (!currentAdmin) {
        console.error('❌ Admin not found:', adminId);
        alert('Admin not found');
        return;
      }
      
      // Determine new status
      const newStatus = currentAdmin.status === 'Active' ? 'inactive' : 'active';
      const newDisplayStatus = newStatus === 'active' ? 'Active' : 'Inactive';
      
      console.log('🔧 Updating status from', currentAdmin.status, 'to', newStatus);
      
      // Update user in database
      const response = await updateUser(adminId, { status: newStatus });
      
      if (response.success) {
        console.log('✅ Admin status updated successfully');
        
        // Update local state
        setAdminList(prev => prev.map(a => 
          a.id === adminId 
            ? { ...a, status: newDisplayStatus }
            : a
        ));
        
        alert(`Admin ${newDisplayStatus === 'Active' ? 'activated' : 'deactivated'} successfully`);
      } else {
        console.error('❌ Failed to update admin status:', response.error);
        alert(`Failed to update admin status: ${response.error}`);
      }
    } catch (error) {
      console.error('❌ Error updating admin status:', error);
      alert(`Error updating admin status: ${error}`);
    }
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
            modules={modules.map(module => ({
              id: module._id,
              name: module.displayName,
              logo: module.logo
            }))}
            moduleStats={moduleStats}
            onAddModule={() => setShowAddModuleModal(true)}
            onEditModule={handleEditModule}
            onDeleteModule={handleDeleteModule}
            onManageProducts={handleManageProducts}
            onViewAdmins={handleViewAdmins}
            loading={modulesLoading}
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
                    onDeleteAdmin={handleDeleteAdmin}
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
        modules={modules}
      />
      
      <AddModuleModal
        isOpen={showAddModuleModal}
        onClose={() => {
          setShowAddModuleModal(false);
          setSelectedModule('');
          setNewModuleData({ name: '', description: '', type: '', logo: '' });
        }}
        onSubmit={(data) => {
          handleAddModule({
            name: data.name.toLowerCase().replace(/\s+/g, '-'),
            displayName: data.name,
            description: data.description || '',
            logo: data.logo || ''
          });
        }}
        data={newModuleData}
        onChange={setNewModuleData}
        selectedModule={selectedModule}
      />
      
      <AddModuleModal
        isOpen={showEditModuleModal}
        onClose={() => {
          setShowEditModuleModal(false);
          setSelectedModule('');
          setEditModuleData({ name: '', description: '', type: '', logo: '' });
        }}
        onSubmit={(data) => {
          handleUpdateModule(selectedModule, {
            name: data.name.toLowerCase().replace(/\s+/g, '-'),
            displayName: data.name,
            description: data.description || '',
            logo: data.logo || ''
          });
        }}
        data={editModuleData}
        onChange={setEditModuleData}
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
